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
        'text-xl font-semibold text-foreground tracking-tight',
        className
      )}
    >
      <span className='text-sm align-super text-muted-foreground'>$</span>
      {intValue}
      <span className='text-sm align-super text-muted-foreground'>
        .{floatValue}
      </span>
    </p>
  );
};

export default ProductPrice;
