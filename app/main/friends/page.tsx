import { Separator } from '@/components/shadcn/separator';
import { getFriendsInsecure } from '@/database/friends';
import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import MainFriendsContent from './MainFriendsContent';

export default async function FriendsPage() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));
  if (!user) {
    redirect('/access?mode=signin&returnTo=/main');
  }
  const friends = await getFriendsInsecure(user.id);
  const filteredFriends = friends.map((friend) => {
    if (friend.receiverUserId !== user.id) {
      return friend.receiverUser;
    } else {
      return friend.requesterUser;
    }
  });

  return (
    <>
      <div className="">
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          Friends ({filteredFriends.length})
        </h1>
        <p className="hidden sm:block text-lg font-medium">
          See who you are friends with and message them.
        </p>
      </div>
      <Separator className="my-4" />
      <MainFriendsContent friends={filteredFriends} />
    </>
  );
}
