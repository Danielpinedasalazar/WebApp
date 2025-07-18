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

      <DrawerContent
        className='h-full max-w-sm border-l border-border 
        bg-gradient-to-br from-background via-muted/30 to-background 
        backdrop-blur-sm shadow-xl'
      >
        <DrawerHeader>
          <DrawerTitle className='text-lg font-semibold mb-4 text-foreground'>
            Browse Categories
          </DrawerTitle>

          <div className='space-y-2 divide-y divide-border'>
            {categories.map((x) => (
              <DrawerClose asChild key={x.category}>
                <Button
                  variant='ghost'
                  className='w-full justify-between items-center px-4 py-3 rounded-md 
                  text-sm font-medium hover:bg-muted transition-all duration-200'
                  asChild
                >
                  <Link href={`/search?category=${x.category}`}>
                    <span className='text-foreground'>{x.category}</span>
                    <span className='text-muted-foreground text-xs font-normal'>
                      ({x._count})
                    </span>
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
