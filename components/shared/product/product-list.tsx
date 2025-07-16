import ProductCard from './product-card';
import { Product } from '@/types';

type ProductListProps = {
  data: Product[];
  title?: string;
  limit?: number;
};

const ProductList = ({ data, title, limit }: ProductListProps) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <section className='my-12'>
      {title && (
        <h2 className='text-2xl font-semibold tracking-tight mb-6 text-foreground'>
          {title}
        </h2>
      )}

      {limitedData.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {limitedData.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className='text-center text-sm text-muted-foreground py-10'>
          No products found.
        </div>
      )}
    </section>
  );
};

export default ProductList;
