'use client';

import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-background to-muted'>
      <Image
        src='/images/logo.svg'
        width={64}
        height={64}
        alt={`${APP_NAME} logo`}
        priority={true}
        className='mb-6 animate-pulse'
      />

      <div className='w-full max-w-md p-6 rounded-2xl shadow-lg bg-white/10 dark:bg-black/30 backdrop-blur-sm text-center border border-border'>
        <h1 className='text-4xl font-extrabold text-foreground mb-2'>Oops!</h1>
        <p className='text-sm text-muted-foreground mb-4'>
          Sorry, we couldn’t find that page.
        </p>

        <Button asChild className='w-full mt-2 shadow-md'>
          <Link href='/'>← Go back home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
