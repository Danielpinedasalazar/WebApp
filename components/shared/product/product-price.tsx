import { cn } from '@/lib/utils';

type ProductPriceProps = {
  value: number;
  className?: string;
};

const ProductPrice = ({ value, className }: ProductPriceProps) => {
  const stringValue = value.toFixed(2);
  const [intValue, floatValue] = stringValue.split('.');

  return (
    <p
      className={cn(
        'text-xl font-extrabold tracking-tight bg-gradient-to-br from-green-500 via-emerald-400 to-lime-400 bg-clip-text text-transparent',
        'flex items-baseline gap-1',
        className
      )}
    >
      <span className='text-sm font-medium align-super text-muted-foreground'>
        $
      </span>
      {intValue}
      <span className='text-sm font-medium align-super text-muted-foreground'>
        .{floatValue}
      </span>
    </p>
  );
};

export default ProductPrice;
