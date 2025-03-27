import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Button } from '@/components/shadcn/button';
import { PaginationWithLinks } from '@/components/shadcn/pagination-with-links';
import { Separator } from '@/components/shadcn/separator';
import levelNames from '@/util/levelNames';
import type { User } from '@prisma/client';
import { MessageSquareText } from 'lucide-react';
import Link from 'next/link';
import FriendsMenu from './FriendsMenu';

type Props = {
  friends: User[];
  currentPage: number;
  pageSize: number;
  resultsCount: number;
};

export default function MainFriendsContent({
  friends,
  currentPage,
  pageSize,
  resultsCount,
}: Props) {
  return (
    <div>
      {friends.length > 0 ? (
        <div>
          {friends.map((friend) => {
            return (
              <div key={`id-${friend.id}`} className="">
                <div className="flex items-center gap-3">
                  <Link href={`/main/profiles/${friend.id}`}>
                    <Avatar className=" w-[60px] h-[60px] cursor-pointer">
                      <AvatarImage src={friend.avatarImageUrl || undefined} />
                      <AvatarFallback>
                        {friend.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link href={`/main/profiles/${friend.id}`}>
                      <p className="text-lg font-bold hover:underline">
                        {friend.username}
                      </p>
                    </Link>

                    {/*  <p className="text-lg font-normal leading-tight">
                    {levelNames(friend.experiences.length)} (
                    {friend.experiences.length})
                  </p> */}
                  </div>
                  {/* Add message functionality later */}
                  <Button
                    variant="secondary"
                    className="ml-auto hidden sm:flex"
                  >
                    <MessageSquareText />
                    Message
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="ml-auto sm:hidden"
                  >
                    <MessageSquareText />
                  </Button>
                  <FriendsMenu friendId={friend.id} />
                </div>
                <Separator className="my-4" />
              </div>
            );
          })}
          <div className="mt-4">
            <PaginationWithLinks
              page={currentPage}
              totalCount={resultsCount}
              pageSize={pageSize}
              pageSizeSelectOptions={{
                pageSizeOptions: [2, 5, 10, 25, 50],
              }}
            />
          </div>
        </div>
      ) : (
        <div>No friends added</div>
      )}
    </div>
  );
}
