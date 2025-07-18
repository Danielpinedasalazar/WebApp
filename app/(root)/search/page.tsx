import ProductCard from '@/components/shared/product/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  getAllProducts,
  getAllCategories,
} from '@/lib/actions/product.actions';
import Link from 'next/link';

const prices = [
  { name: '$400 to $499', value: '400-500' },
  { name: '$500 to $699', value: '500-699' },
  { name: '$700 to $899', value: '700-899' },
  { name: '$900 to $1999', value: '900-1999' },
  { name: '$2000 to $2999', value: '2000-2999' },
];

const ratings = [4, 3, 2, 1];

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
  } = await props.searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet = category && category !== 'all';
  const isPriceSet = price && price !== 'all';
  const isRatingSet = rating && rating !== 'all';

  return {
    title:
      isQuerySet || isCategorySet || isPriceSet || isRatingSet
        ? `Search ${isQuerySet ? q : ''} 
        ${isCategorySet ? `: Category ${category}` : ''}
        ${isPriceSet ? `: Price ${price}` : ''}
        ${isRatingSet ? `: Rating ${rating}` : ''}`
        : 'Search Products',
  };
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  };
}) => {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = searchParams;

  const getFilterUrl = ({
    c,
    p,
    s,
    r,
    pg,
  }: {
    c?: string;
    p?: string;
    s?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <section className='container py-10 space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Aside Filtros */}
        <aside className='space-y-6'>
          <Card>
            <CardHeader className='text-lg font-semibold'>Category</CardHeader>
            <CardContent className='space-y-2'>
              <ul className='text-sm space-y-1'>
                <li>
                  <Link
                    href={getFilterUrl({ c: 'all' })}
                    className={category === 'all' ? 'font-bold' : ''}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.category}>
                    <Link
                      href={getFilterUrl({ c: cat.category })}
                      className={category === cat.category ? 'font-bold' : ''}
                    >
                      {cat.category}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='text-lg font-semibold'>Price</CardHeader>
            <CardContent className='space-y-2'>
              <ul className='text-sm space-y-1'>
                <li>
                  <Link
                    href={getFilterUrl({ p: 'all' })}
                    className={price === 'all' ? 'font-bold' : ''}
                  >
                    Any
                  </Link>
                </li>
                {prices.map((p) => (
                  <li key={p.value}>
                    <Link
                      href={getFilterUrl({ p: p.value })}
                      className={price === p.value ? 'font-bold' : ''}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='text-lg font-semibold'>
              Customer Ratings
            </CardHeader>
            <CardContent className='space-y-2'>
              <ul className='text-sm space-y-1'>
                <li>
                  <Link
                    href={getFilterUrl({ r: 'all' })}
                    className={rating === 'all' ? 'font-bold' : ''}
                  >
                    Any
                  </Link>
                </li>
                {ratings.map((r) => (
                  <li key={r}>
                    <Link
                      href={getFilterUrl({ r: `${r}` })}
                      className={rating === `${r}` ? 'font-bold' : ''}
                    >
                      {r} stars & up
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>

        {/* Contenido principal */}
        <div className='md:col-span-3 space-y-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div className='text-sm text-muted-foreground'>
              {q !== 'all' && `Query: ${q} `}
              {category !== 'all' && ` | Category: ${category}`}
              {price !== 'all' && ` | Price: ${price}`}
              {rating !== 'all' && ` | Rating: ${rating} stars`}
              {(q !== 'all' ||
                category !== 'all' ||
                price !== 'all' ||
                rating !== 'all') && (
                <Button
                  variant='link'
                  asChild
                  className='ml-2 text-xs text-destructive underline'
                >
                  <Link href='/search'>Clear filters</Link>
                </Button>
              )}
            </div>

            <div className='text-sm'>
              Sort by:{' '}
              {sortOrders.map((s) => (
                <Link
                  key={s}
                  href={getFilterUrl({ s })}
                  className={`ml-2 hover:underline ${sort === s ? 'font-bold' : ''}`}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Productos */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.data.length === 0 && (
              <div className='col-span-full text-center text-muted-foreground'>
                No products found.
              </div>
            )}
            {products.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
