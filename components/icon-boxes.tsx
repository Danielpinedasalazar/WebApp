import { DollarSign, Headset, ShoppingBag, WalletCards } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const items = [
  {
    icon: ShoppingBag,
    title: 'Free Shipping',
    description: 'Free shipping on orders above $100',
  },
  {
    icon: DollarSign,
    title: 'Money Back Guarantee',
    description: 'Within 30 days of purchase',
  },
  {
    icon: WalletCards,
    title: 'Flexible Payment',
    description: 'Pay with credit card, PayPal or COD',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description: 'Get support at any time',
  },
];

const IconBoxes = () => {
  return (
    <section className='py-6'>
      <Card className='bg-background border border-border shadow-sm rounded-xl'>
        <CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
          {items.map(({ icon: Icon, title, description }, idx) => (
            <div key={idx} className='flex items-start gap-4'>
              <div className='bg-muted text-primary p-3 rounded-xl'>
                <Icon className='w-5 h-5' />
              </div>
              <div>
                <div className='text-sm font-semibold'>{title}</div>
                <div className='text-sm text-muted-foreground'>
                  {description}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default IconBoxes;
