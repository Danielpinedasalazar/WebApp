import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';
import { Product } from '@/types';
import Rating from './rating';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full max-w-sm border border-border shadow-sm rounded-xl hover:shadow-md transition'>
      <CardHeader className='p-0'>
        <Link href={`/product/${product.slug}`}>
          <div className='relative w-full h-[250px] rounded-t-xl overflow-hidden'>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes='(max-width: 768px) 100vw, 33vw'
              className='object-cover hover:scale-105 transition-transform duration-300 ease-in-out'
              priority
            />
          </div>
        </Link>
      </CardHeader>

      <CardContent className='p-4 grid gap-2'>
        <p className='text-xs text-muted-foreground'>{product.brand}</p>

        <Link href={`/product/${product.slug}`}>
          <h2 className='text-sm font-semibold text-foreground hover:underline line-clamp-2'>
            {product.name}
          </h2>
        </Link>

        <div className='flex items-center justify-between mt-2'>
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <span className='text-sm text-destructive font-medium'>
              Out of Stock
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
