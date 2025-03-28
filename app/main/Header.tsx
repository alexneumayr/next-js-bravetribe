import NotificationFeed from '@/components/knock/NotificationFeed';
import HamburgerMenuMain from '@/components/shadcn/HamburgerMenuMain';
import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { Search } from 'lucide-react';
import Link from 'next/link';
import AvatarWithMenu from './AvatarWithMenu';

export default async function Header() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));

  return (
    <header>
      <div className="bg-secondary h-1 sm:h-3 " />
      <div className="h-[50px] sm:h-[110px] shadow-[0px_4px_4px_0px_rgba(166,166,166,0.25)]">
        {user && (
          <div className="px-5 flex gap-2 h-full items-center justify-between  bg-white dark:bg-[#1C1C1C]  w-full">
            <Link href="/main">
              <img
                src="/logos/logo-header.png"
                className="w-[30px] sm:w-[80px]"
                alt="BraveTribe logo"
              />
            </Link>
            <div className="flex items-center gap-1 sm:gap-4">
              <div>
                <NotificationFeed user={user} />
              </div>
              <Link
                href="/main/search"
                className="xl:hidden hover:bg-zinc-100 rounded-md sm:rounded-full p-[7px] sm:p-3 transition-colors"
              >
                <Search className="flex-none w-[18px] h-[18px] sm:w-[25px] sm:h-[25px]" />
              </Link>
              <AvatarWithMenu user={user} />
              <HamburgerMenuMain userId={user.id} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
