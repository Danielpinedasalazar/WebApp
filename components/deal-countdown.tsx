'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';

const TARGET_DATE = new Date('2025-01-20T00:00:00');

const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (Object.values(newTime).every((v) => v === 0)) {
        clearInterval(timerInterval);
      }

      return () => clearInterval(timerInterval);
    }, 1000);
  }, []);

  const hasEnded =
    time &&
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0;

  return (
    <section className='my-20'>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4'>
        <div className='flex flex-col justify-center gap-6'>
          <h3 className='text-3xl font-bold text-foreground'>
            {hasEnded ? 'Deal Has Ended' : 'Deal Of The Month'}
          </h3>

          <p className='text-muted-foreground'>
            {hasEnded
              ? 'This deal is no longer available. Check out our latest promotions!'
              : `Get ready for a shopping experience like never before with our Deals
              of the Month! Every purchase comes with exclusive perks and offers.
              Don’t miss out! 🎁🛒`}
          </p>

          {!hasEnded && time && (
            <ul className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              <StatBox label='Days' value={time.days} />
              <StatBox label='Hours' value={time.hours} />
              <StatBox label='Minutes' value={time.minutes} />
              <StatBox label='Seconds' value={time.seconds} />
            </ul>
          )}

          <div>
            <Button asChild>
              <Link href='/search'>View Products</Link>
            </Button>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <Image
            src='/images/promo.jpg'
            alt='Promotion'
            width={400}
            height={300}
            className='rounded-xl shadow-md'
          />
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <Card className='text-center bg-muted rounded-xl'>
    <CardContent className='py-4'>
      <p className='text-3xl font-bold text-primary'>{value}</p>
      <p className='text-sm text-muted-foreground'>{label}</p>
    </CardContent>
  </Card>
);

export default DealCountdown;
