import { Button } from './ui/button';
import Link from 'next/link';

const ViewAllProductsButton = () => {
  return (
    <div className='flex justify-center my-12'>
      <Button
        asChild
        className='px-8 h-12 text-base font-semibold rounded-xl shadow-sm'
        variant='outline'
      >
        <Link href='/search'>View All Products</Link>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
