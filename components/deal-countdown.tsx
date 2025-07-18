'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { AlarmClock, Flame, Gift } from 'lucide-react';

const TARGET_DATE = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3); // 3 días desde ahora

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
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const hasEnded = time && Object.values(time).every((v) => v === 0);

  return (
    <section className='my-24 rounded-xl bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 shadow-2xl'>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-8 py-12 items-center'>
        <div className='flex flex-col justify-center gap-6'>
          <h3 className='text-4xl font-extrabold text-foreground flex items-center gap-3'>
            <AlarmClock className='text-rose-500 animate-pulse' /> Limited Time
            Deal!
          </h3>

          <p className='text-lg text-muted-foreground'>
            ⏳ Hurry! This exclusive deal is live for a few more days only. Grab
            the latest gadgets at insane discounts before time runs out!
          </p>

          {time && (
            <ul className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-center'>
              <StatBox label='Days' value={time.days} />
              <StatBox label='Hours' value={time.hours} />
              <StatBox label='Minutes' value={time.minutes} />
              <StatBox label='Seconds' value={time.seconds} />
            </ul>
          )}

          <div>
            <Button
              size='lg'
              asChild
              className='bg-gradient-to-r from-rose-500 to-indigo-500 text-white shadow-lg hover:scale-105 transition-transform'
            >
              <Link href='/search'>
                <Gift className='mr-2' /> Explore Products
              </Link>
            </Button>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <Image
            src='/images/promo.jpg'
            alt='Deal product display'
            width={480}
            height={480}
            className='rounded-3xl shadow-xl hover:scale-105 transition duration-500 ease-in-out'
          />
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <Card className='bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-md hover:scale-105 transition'>
    <CardContent className='py-6'>
      <p className='text-4xl font-bold text-rose-600'>{value}</p>
      <p className='text-sm text-muted-foreground uppercase tracking-wider'>
        {label}
      </p>
    </CardContent>
  </Card>
);

export default DealCountdown;
