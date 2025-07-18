import Link from 'next/link';
import { auth } from '@/auth';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserIcon } from 'lucide-react';

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button
        asChild
        className='flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition shadow-lg'
      >
        <Link href='/sign-in'>
          <UserIcon className='w-4 h-4' />
          <span>Sign In</span>
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className='flex items-center gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 text-white font-bold shadow-lg hover:scale-105 transition-all duration-200'
          >
            {firstInitial}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className='w-64 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border border-border shadow-xl rounded-xl'
          align='end'
          forceMount
        >
          <DropdownMenuLabel className='font-normal px-4 py-3 border-b border-muted'>
            <div className='flex flex-col space-y-0.5'>
              <span className='text-sm font-semibold text-foreground'>
                {session.user?.name}
              </span>
              <span className='text-xs text-muted-foreground truncate'>
                {session.user?.email}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link
              href='/user/profile'
              className='px-4 py-2 hover:bg-muted/20 rounded-md w-full'
            >
              Perfil
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href='/user/orders'
              className='px-4 py-2 hover:bg-muted/20 rounded-md w-full'
            >
              Mis pedidos
            </Link>
          </DropdownMenuItem>

          {session.user?.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link
                href='/admin/overview'
                className='px-4 py-2 hover:bg-muted/20 rounded-md w-full'
              >
                Panel Admin
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className='text-destructive px-4 py-2'>
            <form action={signOutUser} className='w-full'>
              <button
                type='submit'
                className='w-full text-left hover:bg-destructive/10 rounded-sm'
              >
                Cerrar sesión
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
