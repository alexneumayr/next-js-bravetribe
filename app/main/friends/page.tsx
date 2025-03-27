import { Separator } from '@/components/shadcn/separator';
import {
  getFriends,
  getReceivedFriendRequests,
  getTotalFriendsCount,
} from '@/database/friends';
import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
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
  if (!session) {
    redirect('/access?mode=signin&returnTo=/main');
  }

  const friends = await getFriends(session.token, currentPage, pageSize);

  const filteredFriends = friends.map((friend) => {
    if (friend.receiverUserId !== session.userId) {
      return friend.receiverUser;
    } else {
      return friend.requesterUser;
    }
  });

  const totalFriendsCount = await getTotalFriendsCount(session.token);

  const receivedFriendRequests = await getReceivedFriendRequests(session.token);

  /*  const filteredReceivedFriendRequests = receivedFriendRequests.map(
    (friendRequest) => {
      if (friendRequest.receiverUserId !== session.userId) {
        return friendRequest.receiverUser;
      } else {
        return friendRequest.requesterUser;
      }
    },
  ); */

  console.log('receivedFriendRequests', receivedFriendRequests);

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
