import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { getAllCategories } from '@/lib/actions/product.actions';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

const CategoryDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild>
        <Button variant='outline' size='icon' className='rounded-full p-2'>
          <MenuIcon className='w-5 h-5' />
        </Button>
      </DrawerTrigger>

      <DrawerContent className='h-full max-w-sm border-l border-border bg-background'>
        <DrawerHeader>
          <DrawerTitle className='text-lg font-semibold'>
            Browse Categories
          </DrawerTitle>
          <div className='space-y-2 mt-4'>
            {categories.map((x) => (
              <DrawerClose asChild key={x.category}>
                <Button
                  variant='ghost'
                  className='w-full justify-start rounded-md text-sm font-medium hover:bg-muted transition'
                  asChild
                >
                  <Link href={`/search?category=${x.category}`}>
                    {x.category}{' '}
                    <span className='text-muted-foreground'>({x._count})</span>
                  </Link>
                </Button>
              </DrawerClose>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
