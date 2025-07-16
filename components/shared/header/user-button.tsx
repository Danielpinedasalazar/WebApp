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
      <Button asChild variant='outline' className='flex items-center gap-2'>
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
            className='w-9 h-9 rounded-full bg-muted p-0 text-sm font-medium hover:bg-muted/80'
          >
            {firstInitial}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-64' align='end' forceMount>
          <DropdownMenuLabel className='font-normal px-3 py-2'>
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
            <Link href='/user/profile'>Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/user/orders'>Mis pedidos</Link>
          </DropdownMenuItem>

          {session.user?.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href='/admin/overview'>Panel Admin</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className='text-destructive' asChild>
            <form action={signOutUser} className='w-full'>
              <button
                type='submit'
                className='w-full text-left px-2 py-1.5 hover:bg-destructive/10 rounded-sm'
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
