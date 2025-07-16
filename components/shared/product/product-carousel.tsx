'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className='w-full mb-12'
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 8000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className='relative mx-auto max-h-[400px] rounded-xl overflow-hidden shadow-md'>
                {product.banner ? (
                  <Image
                    src={product.banner}
                    alt={product.name}
                    height={400}
                    width={1200}
                    className='w-full h-64 object-cover'
                    priority
                  />
                ) : (
                  <div className='w-full h-64 bg-muted flex items-center justify-center text-muted-foreground'>
                    No image available
                  </div>
                )}

                <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white px-6 py-4 text-center'>
                  <h2 className='text-lg font-semibold truncate'>
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className='hover:bg-muted hover:text-foreground' />
      <CarouselNext className='hover:bg-muted hover:text-foreground' />
    </Carousel>
  );
};

export default ProductCarousel;
