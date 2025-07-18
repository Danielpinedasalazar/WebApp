'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader } from 'lucide-react';
import { Cart, CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { useTransition } from 'react';

/*DEfinimos el tipo de dos variables, cart y item. cart lleva un signo ? ya que puede que este vacio osea
null y le pasamos el carrito, y item lo definimos de tipo CartItem*/
const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  //Definimos un arreglo con isPending para que cuando usemos useTransition, nos devuelva el valor y start transition lo actualice
  const [isPending, startTransition] = useTransition();

  //Manejamos añadir al carrito
  const handleAddToCart = async () => {
    //Aqui vamos a activar la trancision
    startTransition(async () => {
      //Definimos la respuesta dependiendo del valor obtenido en la db
      const res = await addItemToCart(item);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
        return;
      }

      toast({
        description: res.message,
        action: (
          <ToastAction
            className='bg-primary text-white hover:bg-primary/90'
            altText='Go To Cart'
            onClick={() => router.push('/cart')}
          >
            Go To Cart
          </ToastAction>
        ),
      });
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast({
        variant: res.success ? 'default' : 'destructive',
        description: res.message,
      });
    });
  };

  const existItem = cart?.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div className='flex items-center gap-2'>
      <Button
        type='button'
        variant='outline'
        size='icon'
        onClick={handleRemoveFromCart}
        className='w-10 h-10'
        disabled={isPending}
      >
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Minus className='w-4 h-4' />
        )}
      </Button>

      <span className='text-sm font-medium px-2'>{existItem.qty}</span>

      <Button
        type='button'
        variant='outline'
        size='icon'
        onClick={handleAddToCart}
        className='w-10 h-10'
        disabled={isPending}
      >
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='w-4 h-4' />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className='w-full flex gap-2'
      type='button'
      onClick={handleAddToCart}
      disabled={isPending}
    >
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
