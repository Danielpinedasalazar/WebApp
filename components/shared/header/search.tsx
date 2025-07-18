'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <form action='/search' method='GET' className='w-full'>
      <div className='flex w-full max-w-md mx-auto items-center gap-3'>
        <Input
          name='q'
          type='text'
          placeholder='Search for products...'
          className='flex-1 h-12 px-4 bg-gradient-to-br from-background to-muted/40 border border-border shadow-sm rounded-xl text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
        />
        <Button
          type='submit'
          className='h-12 px-5 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white shadow-md'
        >
          <SearchIcon className='w-5 h-5 mr-1' />
          Search
        </Button>
      </div>
    </form>
  );
};

export default Search;
