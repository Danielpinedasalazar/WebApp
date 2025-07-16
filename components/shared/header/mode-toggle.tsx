'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, SunMoon } from 'lucide-react';

const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentIcon =
    theme === 'system' ? (
      <SunMoon className='w-4 h-4' />
    ) : theme === 'dark' ? (
      <MoonIcon className='w-4 h-4' />
    ) : (
      <SunIcon className='w-4 h-4' />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='focus-visible:ring-0 focus-visible:ring-offset-0'
        >
          {currentIcon}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuLabel className='text-xs'>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setTheme('system')}>
          <SunMoon className='mr-2 w-4 h-4' />
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <MoonIcon className='mr-2 w-4 h-4' />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <SunIcon className='mr-2 w-4 h-4' />
          Light
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
