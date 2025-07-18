'use client';

const LoadingPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background'>
      <div className='flex flex-col items-center gap-4'>
        <div className='h-16 w-16 rounded-full border-4 border-t-transparent border-primary animate-spin' />
        <p className='text-muted-foreground text-sm'>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
