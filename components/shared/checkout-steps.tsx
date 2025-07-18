'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type CheckoutStepsProps = {
  current?: number;
};

const steps = [
  'User Login',
  'Shipping Address',
  'Payment Method',
  'Place Order',
];

const CheckoutSteps = ({ current = 0 }: CheckoutStepsProps) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center gap-6 my-10'>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className='flex flex-col items-center text-center group transition-all duration-300 ease-in-out'>
            <div
              className={cn(
                'w-12 h-12 flex items-center justify-center rounded-full border text-sm font-semibold shadow transition-all duration-300 ease-in-out',
                index === current
                  ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white border-transparent scale-105 shadow-lg'
                  : 'bg-muted text-muted-foreground border-border group-hover:scale-105'
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                'mt-2 text-xs font-semibold transition-colors duration-200',
                index === current
                  ? 'text-indigo-500 dark:text-fuchsia-400'
                  : 'text-muted-foreground group-hover:text-foreground'
              )}
            >
              {step}
            </span>
          </div>

          {/* Línea de conexión */}
          {index < steps.length - 1 && (
            <div className='hidden md:block h-1 w-16 bg-border dark:bg-neutral-700 rounded-full transition-colors duration-300' />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;
