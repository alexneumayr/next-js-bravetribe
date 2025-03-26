'use client';
import { logoutUserAction } from '@/actions/authActions';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import type { User } from '@prisma/client';
import { CircleUserRound, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useActionState } from 'react';

type Props = {
  user: User;
};

export default function AvatarWithMenu({ user }: Props) {
  const initialState = {
    success: false,
    error: {},
  };

  const [state, formAction, pending] = useActionState(
    logoutUserAction,
    initialState,
  );

  return (
    <div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="hidden sm:block w-[80px] h-[80px] cursor-pointer">
              <AvatarImage src={user.avatarImageUrl || undefined} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/main/profiles/${user.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <CircleUserRound /> Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/main/settings">
              <DropdownMenuItem className="cursor-pointer">
                <Settings /> Settings
              </DropdownMenuItem>
            </Link>
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <LogOut /> Logout
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent
          className="max-w-[425px] [&>button]:hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-center font-semibold text-2xl">
              Do you really want to log out?
            </DialogTitle>
          </DialogHeader>
          {!state.success ? (
            <p className="text-center text-lg text-zinc-600 mt-5 mb-8">
              Log out {user.username} from BraveTribe?
            </p>
          ) : (
            <p className="text-center mt-5 mb-8 text-lg text-green-500 font-semibold">
              Logout successful
            </p>
          )}
          <DialogFooter>
            <form
              className="flex justify-around w-full gap-x-2"
              action={formAction}
            >
              <Button className="w-full" type="submit" disabled={pending}>
                Logout
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="w-full" type="button">
                  Cancel
                </Button>
              </DialogClose>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
