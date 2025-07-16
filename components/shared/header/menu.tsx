import { Button } from '@/components/ui/button';
import ModeToggle from './mode-toggle';
import Link from 'next/link';
import { EllipsisVertical, ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserButton from './user-button';

const Menu = () => {
  return (
    <div className='flex justify-end items-center gap-3'>
      {/* Menú Desktop */}
      <nav className='hidden md:flex items-center gap-2'>
        <ModeToggle />

        <Button
          asChild
          variant='ghost'
          className='flex items-center gap-1 text-sm'
        >
          <Link href='/cart'>
            <ShoppingCart className='w-4 h-4' />
            Cart
          </Link>
        </Button>

        <UserButton />
      </nav>

      {/* Menú Móvil */}
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='text-muted-foreground'>
            <EllipsisVertical className='w-6 h-6' />
          </SheetTrigger>

          <SheetContent className='pt-8 space-y-4'>
            <SheetTitle className='text-lg font-semibold'>Menu</SheetTitle>
            <SheetDescription className='text-sm text-muted-foreground'>
              Quick access
            </SheetDescription>

            <div className='flex flex-col gap-2'>
              <ModeToggle />

              <Button
                asChild
                variant='ghost'
                className='justify-start gap-2 w-full'
              >
                <Link href='/cart'>
                  <ShoppingCart className='w-4 h-4' />
                  Cart
                </Link>
              </Button>

              <UserButton />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
