import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';
import CategoryDrawer from './category-drawer';
import Search from './search';

const Header = () => {
  return (
    <header
      className='w-full border-b bg-gradient-to-r from-background via-muted/20 to-background
        shadow-sm backdrop-blur-md'
    >
      <div className='wrapper flex items-center justify-between py-3 px-4 md:px-6'>
        {/* Logo y Drawer */}
        <div className='flex items-center gap-4'>
          <CategoryDrawer />
          <Link href='/' className='flex items-center gap-3'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              height={40}
              width={40}
              priority
            />
            <span className='hidden lg:inline text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500'>
              {APP_NAME}
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className='hidden md:flex'>
          <Search />
        </div>

        {/* User/Menu */}
        <div className='flex items-center gap-4'>
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
