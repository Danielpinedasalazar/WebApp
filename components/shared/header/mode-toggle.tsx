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
      <SunMoon className='w-4 h-4 text-purple-500 transition-transform hover:rotate-12' />
    ) : theme === 'dark' ? (
      <MoonIcon className='w-4 h-4 text-yellow-400 transition-transform hover:-rotate-12' />
    ) : (
      <SunIcon className='w-4 h-4 text-orange-400 transition-transform hover:rotate-12' />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full bg-gradient-to-br from-indigo-100 via-slate-100 to-zinc-100 dark:from-zinc-800 dark:to-slate-900 transition-colors shadow-md hover:shadow-lg'
        >
          {currentIcon}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-40 rounded-xl border border-border bg-gradient-to-br from-muted/60 to-background/80 backdrop-blur-sm shadow-xl'
      >
        <DropdownMenuLabel className='text-xs tracking-wide text-muted-foreground'>
          Appearance
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className='hover:bg-gradient-to-r hover:from-sky-400 hover:to-purple-500 hover:text-white transition'
        >
          <SunMoon className='mr-2 w-4 h-4' />
          System
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className='hover:bg-gradient-to-r hover:from-indigo-500 hover:to-zinc-900 hover:text-white transition'
        >
          <MoonIcon className='mr-2 w-4 h-4' />
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className='hover:bg-gradient-to-r hover:from-yellow-300 hover:to-orange-400 hover:text-white transition'
        >
          <SunIcon className='mr-2 w-4 h-4' />
          Light
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
