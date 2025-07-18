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
      <nav className='hidden md:flex items-center gap-3'>
        <ModeToggle />

        <Button
          asChild
          variant='ghost'
          className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:text-white transition duration-200 rounded-xl shadow-sm'
        >
          <Link href='/cart'>
            <ShoppingCart className='w-4 h-4' />
            <span>Cart</span>
          </Link>
        </Button>

        <UserButton />
      </nav>

      {/* Menú Móvil */}
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='text-muted-foreground hover:text-foreground transition duration-200'>
            <EllipsisVertical className='w-6 h-6' />
          </SheetTrigger>

          <SheetContent className='pt-8 space-y-6 bg-gradient-to-b from-background via-muted/30 to-background'>
            <SheetTitle className='text-lg font-bold text-foreground'>
              Menu
            </SheetTitle>
            <SheetDescription className='text-sm text-muted-foreground'>
              Quick access
            </SheetDescription>

            <div className='flex flex-col gap-4'>
              <ModeToggle />

              <Button
                asChild
                variant='ghost'
                className='justify-start gap-2 w-full px-4 py-2 text-muted-foreground hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:text-white rounded-lg transition-all'
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
