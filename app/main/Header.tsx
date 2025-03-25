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
import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { CircleUserRound, LogOut, Search, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Header() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));

  return (
    <header>
      <div className="bg-secondary h-3 " />
      <div className="h-[110px] shadow-[0px_4px_4px_0px_rgba(166,166,166,0.25)]">
        {user && (
          <div className="px-5 flex gap-2 h-full items-center justify-between  bg-white dark:bg-[#1C1C1C]  w-full">
            <Link href="/main">
              <Image
                src="/logos/logo-header.png"
                width={80}
                height={80}
                alt="BraveTribe logo"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/main/search"
                className="xl:hidden hover:bg-zinc-100 rounded-full p-3"
              >
                <Search />
              </Link>
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-[80px] h-[80px] cursor-pointer">
                      <AvatarImage src={`${user.avatarImageUrl}`} />
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

                <DialogContent className="max-w-[425px] [&>button]:hidden">
                  <DialogHeader>
                    <DialogTitle className="text-center font-semibold text-2xl">
                      Do you really want to log out?
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-center text-lg text-zinc-600 mt-5 mb-8">
                    Log out {user.username} from BraveTribe?
                  </div>
                  <DialogFooter>
                    <form
                      className="flex justify-around w-full gap-x-2"
                      action={logoutUserAction}
                    >
                      <Button className="w-full" type="submit">
                        Logout
                      </Button>
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          type="button"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                    </form>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
