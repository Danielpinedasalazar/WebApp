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
    <section className='my-16 px-4 md:px-0'>
      {title && (
        <h2 className='text-3xl font-extrabold text-center mb-10 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight'>
          {title}
        </h2>
      )}

      {limitedData.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in'>
          {limitedData.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className='text-center py-20'>
          <p className='text-muted-foreground text-sm italic'>
            No products found. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductList;
