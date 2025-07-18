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
      className='w-full max-w-screen-xl mx-auto px-4 md:px-6 mb-12'
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
              <div className='relative rounded-xl overflow-hidden shadow-md h-[200px] md:h-[250px]'>
                {product.banner ? (
                  <Image
                    src={product.banner}
                    alt={product.name}
                    fill
                    className='object-cover'
                    priority
                  />
                ) : (
                  <div className='w-full h-full bg-muted flex items-center justify-center text-muted-foreground'>
                    No image available
                  </div>
                )}

                <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white px-4 py-2 text-center'>
                  <h2 className='text-sm md:text-lg font-semibold truncate'>
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
