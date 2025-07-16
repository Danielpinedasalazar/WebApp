'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';

const AdminSearch = () => {
  const pathname = usePathname();

  const formActionUrl = pathname.includes('/admin/orders')
    ? '/admin/orders'
    : pathname.includes('/admin/users')
      ? '/admin/users'
      : '/admin/products';

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setQueryValue(searchParams.get('query') || '');
  }, [searchParams]);

  return (
    <form
      action={formActionUrl}
      method='GET'
      className='flex items-center gap-2 w-full max-w-md'
    >
      <div className='relative w-full'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          name='query'
          placeholder='Buscar...'
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
          className='pl-9 pr-3 py-2 w-full'
        />
      </div>
      <Button type='submit' variant='secondary'>
        Buscar
      </Button>
    </form>
  );
};

export default AdminSearch;
