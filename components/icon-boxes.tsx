'use client';

import { DollarSign, Headset, ShoppingBag, WalletCards } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const items = [
  {
    icon: ShoppingBag,
    title: 'Free Shipping',
    description: 'Enjoy free shipping on all orders over $100!',
    color: 'from-pink-400 to-fuchsia-500',
  },
  {
    icon: DollarSign,
    title: 'Money Back Guarantee',
    description: 'Full refund within 30 days of purchase. No questions asked!',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: WalletCards,
    title: 'Flexible Payment',
    description: 'Pay with card, PayPal, Apple Pay, or cash on delivery.',
    color: 'from-indigo-400 to-purple-500',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description: 'We’re here for you anytime, day or night.',
    color: 'from-yellow-400 to-orange-500',
  },
];

const IconBoxes = () => {
  return (
    <section className='py-12 px-4 md:px-8'>
      <Card className='border border-border shadow-xl rounded-3xl bg-gradient-to-br from-white/60 to-slate-100/40 dark:from-zinc-900/70 dark:to-slate-900/80 backdrop-blur-md transition-colors'>
        <CardContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10'>
          {items.map(({ icon: Icon, title, description, color }, idx) => (
            <div
              key={idx}
              className='flex items-start gap-4 transform hover:scale-[1.03] transition-all duration-300'
            >
              <div
                className={`p-4 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}
              >
                <Icon className='w-5 h-5' />
              </div>
              <div>
                <h4 className='text-base font-semibold text-neutral-900 dark:text-white'>
                  {title}
                </h4>
                <p className='text-sm text-neutral-600 dark:text-neutral-300'>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default IconBoxes;
