'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { formUrlQuery } from '@/lib/utils';

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (btnType: 'next' | 'prev') => {
    const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    });
    router.push(newUrl);
  };

  const isFirstPage = Number(page) <= 1;
  const isLastPage = Number(page) >= totalPages;

  return (
    <div className='flex justify-center items-center gap-4 py-8'>
      <Button
        variant='outline'
        className='w-32 h-11 rounded-xl text-base font-medium shadow-sm'
        onClick={() => handleClick('prev')}
        disabled={isFirstPage}
      >
        Previous
      </Button>
      <span className='text-sm text-muted-foreground'>
        Page {page} of {totalPages}
      </span>
      <Button
        variant='outline'
        className='w-32 h-11 rounded-xl text-base font-medium shadow-sm'
        onClick={() => handleClick('next')}
        disabled={isLastPage}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
