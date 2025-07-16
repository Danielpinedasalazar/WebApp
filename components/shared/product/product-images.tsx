'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className='space-y-4'>
      <div className='relative w-full aspect-square overflow-hidden rounded-xl border border-border shadow-sm'>
        <Image
          src={images[current]}
          alt='product image'
          fill
          className='object-cover object-center'
          priority
        />
      </div>

      <div className='flex gap-3 overflow-x-auto'>
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              'relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border transition-colors duration-200',
              current === index
                ? 'border-primary ring-2 ring-primary'
                : 'border-border hover:border-primary'
            )}
          >
            <Image
              src={image}
              alt='thumbnail'
              fill
              className='object-cover object-center'
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
