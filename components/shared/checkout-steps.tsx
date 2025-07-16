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
          <div className='flex flex-col items-center text-center'>
            <div
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-full border text-sm font-semibold',
                index === current
                  ? 'bg-primary text-white border-primary shadow'
                  : 'bg-muted text-muted-foreground border-border'
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                'mt-2 text-xs font-medium',
                index === current ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {step}
            </span>
          </div>

          {/* Línea de conexión (excepto después del último) */}
          {index < steps.length - 1 && (
            <div className='hidden md:block h-px w-16 bg-border' />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;
