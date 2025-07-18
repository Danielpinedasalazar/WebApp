'use server';

import { cookies } from 'next/headers';
import { CartItem } from '@/types';
import { convertToPlainObject, formatError, round2 } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { cartItemSchema, insertCartSchema } from '../validators';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

//Aqui vamos a calcular los precios del carrito
// le pasamos un item con un arreglo de CartItem[]
const calcPrice = (items: CartItem[]) => {
  //Definimos itemsPrice
  const itemsPrice = round2(
      //.reduce: es una funcion de los array que acumula un valor a partir de todos los elementos
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    //Si los items valen mas de 100, no se cobra, de lo contrario 10
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    //El tax va a ser el valor de los item por el 0.15
    taxPrice = round2(0.15 * itemsPrice),
    //El precio total es la suma de todos
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

//Funcion para añadir productos al carrito
export async function addItemToCart(data: CartItem) {
  try {
    /*Definimos sessionCartId la cual nos va a traer la sesion */
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    //Si la sesion no existe devolvemos un error
    if (!sessionCartId) throw new Error('Cart session not found');

    //Obtenemos la sesion desde auth
    const session = await auth();
    /*definimos userId. Si existe la sesion nos pasa user, si existe user nos pasa el id
    si eso es verdadero nos devuelve la sesion como un string, si es falso como undefined*/
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    //Obtenemos el carrito
    const cart = await getMyCart();

    /*Aqui vamos a hacer una validacion
    cartItemSchema: es un esquema que define como debe verse un item del carrito
    .parse(data): toma los datos y los valida contra ese esquema, y si todo funciona lo guarda*/
    const item = cartItemSchema.parse(data);

    //Vamos e encontrar un producto en la db con ayuda de prisma
    //prisma: accedemos a la db, product: nos vamos a la tabla de producto, findFirst: cogemos el primero
    const product = await prisma.product.findFirst({
      //lo buscamos donde el id sea igual al id del producto
      where: { id: item.productId },
    });
    //si no existe el producto lanzamos errror
    if (!product) throw new Error('Product not found');

    //Si no existe el carrito
    if (!cart) {
      //Creamos uno nuevo
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      //Añadimos el nuevo carrito a la db
      await prisma.cart.create({
        data: newCart,
      });

      //Ahora revalidamos la pagina para que se actualice el contenido
      revalidatePath(`/product/${product.slug}`);

      //Si todo fue bien devolvemos un mensaje
      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      /*si no salioo bien buscamos */
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      //Si existe el item procedemos a chequear el stock
      if (existItem) {
        //si ya no hay stock devolvemos error
        if (product.stock < existItem.qty + 1) {
          throw new Error('Not enough stock');
        }

        //
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        // If item does not exist in cart
        // Check stock
        if (product.stock < 1) throw new Error('Not enough stock');

        // Add item to the cart.items
        cart.items.push(item);
      }

      // Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${
          existItem ? 'updated in' : 'added to'
        } cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

//Vamos a obtener el carrito
export async function getMyCart() {
  //chequeamos la cookie del carrito y si no existe devolvemos error
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) throw new Error('Cart session not found');

  //Tomamos la sesion y el userId
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  //definimos cart el cual va a encontrar donde si el userId existe, use ese de lo contrario use el sessionCartId
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  //si no existe cart devolvemos undefined
  if (!cart) return undefined;

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

//Funcion para quitar un item del carrito
export async function removeItemFromCart(productId: string) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart session not found');

    //Vamos a buscar el producto donde el id sea igual al productId
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    //si no existe el producto devolvemos error
    if (!product) throw new Error('Product not found');

    //traemos el carrito, y si no existe pum! error
    const cart = await getMyCart();
    if (!cart) throw new Error('Cart not found');

    //si existe lo bamos a buscar por el productId
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error('Item not found');

    //Si el producto el igual a 1
    if (exist.qty === 1) {
      //
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      // Decrease qty
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
