import { Button } from './ui/button';
import Link from 'next/link';

const ViewAllProductsButton = () => {
  return (
    <div className='flex justify-center my-12'>
      <Button
        asChild
        className='
          px-8 h-12 text-base font-semibold rounded-xl
          text-white
          bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300
          hover:from-yellow-300 hover:via-pink-500 hover:to-purple-500
          transition-all duration-300 ease-in-out
          shadow-lg hover:scale-105
          backdrop-blur-md
        '
      >
        <Link href='/search'>View All Products</Link>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
