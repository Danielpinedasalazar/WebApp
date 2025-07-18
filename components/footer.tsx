'use client';

import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { Copyright } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-tr from-[#fdfbfb] to-[#ebedee] dark:from-[#1f1f1f] dark:to-[#2c2c2c] border-t border-border rounded-t-2xl shadow-xl backdrop-blur-sm pb-10 animate-fadeIn'>
      <div className='max-w-screen-xl mx-auto px-6 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center text-sm text-muted-foreground'>
        {/* Logo + texto */}
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 rounded-full overflow-hidden shadow-md border'>
            <Image
              src='/images/logo.svg' // 💡 cambia si usas otra ruta
              alt='Logo'
              width={40}
              height={40}
              className='object-cover'
            />
          </div>
          <div className='flex items-center gap-2'>
            <Copyright className='w-4 h-4 animate-pulse text-primary' />
            <span>
              {currentYear} {APP_NAME}. All rights reserved.
            </span>
          </div>
        </div>

        {/* Enlaces legales */}
        <div className='flex justify-center gap-6 text-sm'>
          <Link
            href='/privacy'
            className='hover:underline hover:text-foreground transition'
          >
            Privacy Policy
          </Link>
          <Link
            href='/terms'
            className='hover:underline hover:text-foreground transition'
          >
            Terms of Use
          </Link>
          <Link
            href='/contact'
            className='hover:underline hover:text-foreground transition'
          >
            Contact
          </Link>
        </div>

        {/* Redes sociales */}
        <div className='flex justify-end gap-4'>
          <a
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-500 transition'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M22.46 6c-.77.35-1.6.59-2.46.69a4.26 4.26 0 001.88-2.35 8.34 8.34 0 01-2.68 1.03A4.2 4.2 0 0015.5 4a4.2 4.2 0 00-4.17 5.13 11.92 11.92 0 01-8.64-4.4 4.21 4.21 0 001.3 5.6A4.2 4.2 0 012.8 9v.05a4.2 4.2 0 003.37 4.11 4.2 4.2 0 01-1.89.07 4.2 4.2 0 003.92 2.91A8.42 8.42 0 012 18.58 11.91 11.91 0 008.29 20c7.55 0 11.67-6.26 11.67-11.67 0-.18-.01-.35-.02-.53A8.36 8.36 0 0024 6.5a8.4 8.4 0 01-2.54.7z' />
            </svg>
          </a>
          <a
            href='https://github.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground transition'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 .5C5.648.5.5 5.648.5 12c0 5.092 3.292 9.4 7.86 10.941.574.108.785-.25.785-.558 0-.276-.01-1.01-.015-1.981-3.197.695-3.872-1.542-3.872-1.542-.523-1.329-1.276-1.683-1.276-1.683-1.043-.713.079-.698.079-.698 1.152.081 1.758 1.182 1.758 1.182 1.025 1.757 2.689 1.25 3.344.956.104-.742.401-1.25.728-1.538-2.552-.29-5.238-1.277-5.238-5.686 0-1.256.448-2.284 1.18-3.09-.118-.291-.512-1.46.112-3.046 0 0 .963-.308 3.155 1.18a10.982 10.982 0 015.746 0c2.19-1.488 3.151-1.18 3.151-1.18.625 1.586.232 2.755.114 3.046.734.806 1.178 1.834 1.178 3.09 0 4.419-2.69 5.392-5.25 5.676.412.353.78 1.046.78 2.108 0 1.523-.014 2.751-.014 3.126 0 .31.21.671.79.557A11.502 11.502 0 0023.5 12c0-6.352-5.148-11.5-11.5-11.5z'
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
