'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { convertToPlainObject, formatError } from '../utils';
import { auth } from '@/auth';
import { getMyCart } from './cart.actions';
import { getUserById } from './user.actions';
import { insertOrderSchema } from '../validators';
import { prisma } from '@/db/prisma';
import { CartItem, PaymentResult, ShippingAddress } from '@/types';
import { paypal } from '../paypal';
import { revalidatePath } from 'next/cache';
import { PAGE_SIZE } from '../constants';
import { Prisma } from '@prisma/client';
import { sendPurchaseReceipt } from '@/email';

//Crear las ordenes
export async function createOrder() {
  //Hallamos la sesion de usuario
  try {
    const session = await auth();
    //Si no hay session lanzamos error
    if (!session) throw new Error('User is not authenticated');

    //obtenemos el carrito
    const cart = await getMyCart();
    //si user existe, tomamos el id
    const userId = session?.user?.id;
    if (!userId) throw new Error('User not found');

    //Obtenemos el usuario por id
    const user = await getUserById(userId);

    //Si el carrito no existe o es igual a cero
    if (!cart || cart.items.length === 0) {
      //Mostramos un mensaje indicando
      return {
        success: false,
        message: 'Your cart is empty',
        redirectTo: '/cart',
      };
    }

    //Si no hay una direccion, mostramos un mensaje
    if (!user.address) {
      return {
        success: false,
        message: 'No shipping address',
        redirectTo: '/shipping-address',
      };
    }

    if (!user.paymentMethod) {
      return {
        success: false,
        message: 'No payment method',
        redirectTo: '/payment-method',
      };
    }

    //Creamos la orden, la vamos a insertar en el schema y parse va a validar cada uno de los datos
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    /*Esta linea inicia una transaccion de la base de datos, lo que indica que o funcionan todos 
    los datos o que no funcione nad. El parametro tx es como un "trabajdor especial", que va a manejar
    todas las operaciones dentro de la transaccion*/
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      //Aca vamos a acceder a la tabla order y vamos a crear una orden.
      const insertedOrder = await tx.order.create({ data: order });

      //inicaos un ciclo para recorrer todos los item del carrito (cart.items) y miramos que cada elemento es de CartItem[]
      for (const item of cart.items as CartItem[]) {
        //Aqui es donde cada producto del carrito, se convierte en un item del pedido
        await tx.orderItem.create({
          data: {
            //...item, copia toda la info del producto (nombre, marca, ...)
            ...item,
            //se asegura que el precio es el mismo de el de la db
            price: item.price,
            //insertOrder.id es el id de la orden recien creada
            orderId: insertedOrder.id,
          },
        });
      }
      //Luego de que se haya pagado limpiamos el carrito y lo dejamos listo para una nueva orden
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });

      //Queremos saber el id de la orden que acabamos de crear
      //insertedOrderId = insertedorder.id
      return insertedOrder.id;
    });

    //Si no existe la orden devolvemos error
    if (!insertedOrderId) throw new Error('Order not created');

    //Si todo salio bien devolvemos un mesaje true y redireccionamos
    return {
      success: true,
      message: 'Order created',
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatError(error) };
  }
}

//Obtenemos la orden por el id que le pasamos en otro codigo
export async function getOrderById(orderId: string) {
  //Vamos a buscar la orden en donde el id sea igual a el orderId
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    //Incdicamos que valores queremos devolver
    include: {
      //devolvemos los items de la orden y el nombre y email del usuario
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });

  //pasamos a un objeto plano los datos obtenidos
  return convertToPlainObject(data);
}

//Creamos la orden para pagar con paypal, entonces le pasamos un id
export async function createPayPalOrder(orderId: string) {
  try {
    //Obtenemos la orden desde la db
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    //Si la orden existe ...
    if (order) {
      //Ahora le pasamos la orden a paypal, y lo convertimos a numero debido a que puede llegar como un string
      const paypalOrder = await paypal.createOrder(Number(order.totalPrice));

      //Busca la orden por su id
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentResult: {
            id: paypalOrder.id,
            email_address: '',
            status: '',
            pricePaid: 0,
          },
        },
      });

      //Devolvemos que fue exitoso
      return {
        success: true,
        message: 'Item order created successfully',
        data: paypalOrder.id,
      };
    } else {
      throw new Error('Order not found');
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

//Orden aprovada
export async function approvePayPalOrder(
  orderId: string,
  data: { orderID: string }
) {
  try {
    // Get order from database
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error('Order not found');

    const captureData = await paypal.capturePayment(data.orderID);

    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult)?.id ||
      captureData.status !== 'COMPLETED'
    ) {
      throw new Error('Error in PayPal payment');
    }

    // Update order to paid
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    });

    revalidatePath(`/order/${orderId}`);

    return {
      success: true,
      message: 'Your order has been paid',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update order to paid
export async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: PaymentResult;
}) {
  // Get order from database
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
    },
  });

  if (!order) throw new Error('Order not found');

  if (order.isPaid) throw new Error('Order is already paid');

  // Transaction to update order and account for product stock
  await prisma.$transaction(async (tx) => {
    // Iterate over products and update stock
    for (const item of order.orderitems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } },
      });
    }

    // Set the order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    });
  });

  // Get updated order after transaction
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!updatedOrder) throw new Error('Order not found');

  sendPurchaseReceipt({
    order: {
      ...updatedOrder,
      shippingAddress: updatedOrder.shippingAddress as ShippingAddress,
      paymentResult: updatedOrder.paymentResult as PaymentResult,
    },
  });
}

// Get user's orders
export async function getMyOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const session = await auth();
  if (!session) throw new Error('User is not authorized');

  const data = await prisma.order.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.order.count({
    where: { userId: session?.user?.id },
  });

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

type SalesDataType = {
  month: string;
  totalSales: number;
}[];

// Get sales data and order summary
export async function getOrderSummary() {
  // Get counts for each resource
  const ordersCount = await prisma.order.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();

  // Calculate the total sales
  const totalSales = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });

  // Get monthly sales
  const salesDataRaw = await prisma.$queryRaw<
    Array<{ month: string; totalSales: Prisma.Decimal }>
  >`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`;

  const salesData: SalesDataType = salesDataRaw.map((entry) => ({
    month: entry.month,
    totalSales: Number(entry.totalSales),
  }));

  // Get latest sales
  const latestSales = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true } },
    },
    take: 6,
  });

  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    latestSales,
    salesData,
  };
}

// Get all orders
export async function getAllOrders({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.OrderWhereInput =
    query && query !== 'all'
      ? {
          user: {
            name: {
              contains: query,
              mode: 'insensitive',
            } as Prisma.StringFilter,
          },
        }
      : {};

  const data = await prisma.order.findMany({
    where: {
      ...queryFilter,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
    include: { user: { select: { name: true } } },
  });

  const dataCount = await prisma.order.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete an order
export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({ where: { id } });

    revalidatePath('/admin/orders');

    return {
      success: true,
      message: 'Order deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update COD order to paid
export async function updateOrderToPaidCOD(orderId: string) {
  try {
    await updateOrderToPaid({ orderId });

    revalidatePath(`/order/${orderId}`);

    return { success: true, message: 'Order marked as paid' };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update COD order to delivered
export async function deliverOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error('Order not found');
    if (!order.isPaid) throw new Error('Order is not paid');

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    });

    revalidatePath(`/order/${orderId}`);

    return {
      success: true,
      message: 'Order has been marked delivered',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
