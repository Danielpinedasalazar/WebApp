import ProductList from '@/components/shared/product/product-list';
import {
  getLatestProducts,
  getFeaturedProducts,
} from '@/lib/actions/product.actions';
import ProductCarousel from '@/components/shared/product/product-carousel';
import ViewAllProductsButton from '@/components/view-all-products-button';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className='space-y-16'>
      {/* Todo el contenido centrado */}
      <div className='max-w-screen-xl mx-auto px-4 md:px-6'>
        {/* Carrusel */}
        {featuredProducts.length > 0 && (
          <section>
            <ProductCarousel data={featuredProducts} />
          </section>
        )}

        {/* Últimos productos */}
        <section>
          <ProductList
            data={latestProducts}
            title='Newest Arrivals'
            limit={4}
          />
          <div className='mt-6 flex justify-center'>
            <ViewAllProductsButton />
          </div>
        </section>

        {/* Cuenta regresiva */}
        <section>
          <DealCountdown />
        </section>

        {/* Iconos de beneficios */}
        <section>
          <IconBoxes />
        </section>
      </div>
    </main>
  );
};

export default Homepage;
