import SearchAreaSidebar from '@/components/SearchAreaSidebar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { getNewestUsersInsecure } from '@/database/users';
import Link from 'next/link';

export default async function SidebarRight() {
  const newestUsers = await getNewestUsersInsecure();
  return (
    <div className="space-y-4 hidden xl:block">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SearchAreaSidebar />
      </div>
      <div className="space-y-3 p-2 bg-[#f9f9f9] rounded-[5px]">
        <h2 className="text-sm font-semibold">New members</h2>
        {newestUsers.map((user) => {
          return (
            <Link
              href={`/main/profiles/${user.id}`}
              className="flex gap-x-2 ml-2"
              key={`user-${user.id}`}
            >
              <Avatar className="w-[23px] h-[23px]">
                <AvatarImage src={`${user.avatarImageUrl}`} />
                <AvatarFallback className="text-xs">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm">{user.username}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
