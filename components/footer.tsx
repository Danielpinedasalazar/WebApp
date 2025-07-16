import { APP_NAME } from '@/lib/constants';
import { Copyright } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t border-border bg-background'>
      <div className='max-w-screen-xl mx-auto px-4 py-6 flex items-center justify-center gap-2 text-muted-foreground text-sm'>
        <Copyright className='w-4 h-4' />
        <span>
          {currentYear} {APP_NAME}. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
