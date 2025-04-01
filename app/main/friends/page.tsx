import { Separator } from '@/components/shadcn/separator';
import {
  getFriends,
  getReceivedFriendRequests,
  getTotalFriendsCount,
} from '@/database/friends';
import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import type { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import MainFriendsContent from './MainFriendsContent';
import ReceivedFriendRequests from './ReceivedFriendRequests';

type Props = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  }>;
};

export default async function FriendsPage({ searchParams }: Props) {
  const currentPage = Number((await searchParams).page) || 1;
  const pageSize = Number((await searchParams).pageSize) || 5;

  const sessionTokenCookie = await getCookie('sessionToken');
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie));
  // If the user is not logged in redirect to login page
  if (!session) {
    redirect('/access?mode=signin&returnTo=/main');
  }

  const friends = await getFriends(session.token, currentPage, pageSize);

  // Filter the friends array because the result of the previous database query also contains the current user itself in every friend request (either as the requester or receiver of the friend request)
  const filteredFriends = friends.map((friend) => {
    if (friend.receiverUserId !== session.userId) {
      return friend.receiverUser as User;
    } else {
      return friend.requesterUser as User;
    }
  });

  const totalFriendsCount = await getTotalFriendsCount(session.token);
  const receivedFriendRequests = await getReceivedFriendRequests(session.token);

  return (
    <>
      <div className="">
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          Friends ({totalFriendsCount})
        </h1>
        <p className="hidden sm:block text-lg font-medium">
          See who you are friends with and message them.
        </p>
      </div>
      <Separator className="my-4" />
      {receivedFriendRequests.length > 0 && (
        <ReceivedFriendRequests
          receivedFriendRequests={receivedFriendRequests}
        />
      )}
      <MainFriendsContent
        friends={filteredFriends}
        resultsCount={totalFriendsCount}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  );
}
