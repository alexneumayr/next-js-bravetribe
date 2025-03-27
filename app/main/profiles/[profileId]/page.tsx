import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Button } from '@/components/shadcn/button';
import UserStats from '@/components/UserStats';
import { getNewestExperiencesByUserInsecure } from '@/database/experiences';
import { getValidSession } from '@/database/sessions';
import { getUserByIdInsecure, getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import levelNames from '@/util/levelNames';
import { userExperiencesPerMonth } from '@/util/userExperiencesPerMonth';
import type { Prisma, User } from '@prisma/client';
import {
  MessageSquareText,
  User as UserIcon,
  UserMinus,
  UserPlus,
  UserRoundCheck,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AnswerRequestButton from './AnswerRequestButton';
import FriendsButton from './FriendsButton';

type Props = {
  params: Promise<{ profileId: string }>;
};

export default async function IndividualProfilePage(props: Props) {
  const profileUser = await getUserByIdInsecure((await props.params).profileId);

  const sessionTokenCookie = await getCookie('sessionToken');
  const currentUser =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));
  if (!currentUser) {
    redirect('/access?mode=signin&returnTo=/main/experiences');
  }
  const chartData = await userExperiencesPerMonth(profileUser?.id || '');
  const newestExperienceReports = await getNewestExperiencesByUserInsecure(
    profileUser?.id || '',
  );

  function friendshipStatus(
    user: Prisma.UserGetPayload<{
      include: {
        receivedFriendRequests: true;
        sentFriendRequests: true;
        experiences: true;
      };
    }>,
    userId: User['id'],
  ) {
    if (
      user.sentFriendRequests.some(
        (friend) =>
          (friend.receiverUserId === userId ||
            friend.requesterUserId === userId) &&
          friend.isAccepted,
      ) ||
      user.receivedFriendRequests.some(
        (friend) =>
          (friend.receiverUserId === userId ||
            friend.requesterUserId === userId) &&
          friend.isAccepted,
      )
    ) {
      return 'friends';
    } else if (
      user.sentFriendRequests.some(
        (friend) => friend.receiverUserId === userId && !friend.isAccepted,
      )
    ) {
      return 'pending-receiver';
    } else if (
      user.receivedFriendRequests.some(
        (friend) => friend.requesterUserId === userId && !friend.isAccepted,
      )
    ) {
      return 'pending-requester';
    } else {
      return 'none';
    }
  }

  return (
    <div className="space-y-5 max-w-[400px] mx-auto">
      <div className="flex gap-6 items-center">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src={profileUser?.avatarImageUrl || undefined} />
          <AvatarFallback>
            {profileUser?.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {profileUser?.username}
          </h1>
          <p className="text-sm sm:text-lg font-medium">
            {levelNames(profileUser?.experiences.length)} (
            {profileUser?.experiences.length})
          </p>
        </div>
      </div>
      <div className="flex gap-5">
        {/* Add friend requests later */}
        {profileUser?.sentFriendRequests.some(
          (friend) =>
            friend.receiverUserId === currentUser.id && friend.isAccepted,
        )}
        {friendshipStatus(profileUser, currentUser.id) === 'friends' ? (
          <FriendsButton />
        ) : friendshipStatus(profileUser, currentUser.id) ===
          'pending-requester' ? (
          <Button variant="default">
            <UserMinus /> Cancel request
          </Button>
        ) : friendshipStatus(profileUser, currentUser.id) ===
          'pending-receiver' ? (
          <AnswerRequestButton />
        ) : (
          <Button variant="secondary">
            <UserPlus /> Add friend
          </Button>
        )}
        {/* Add message functionality later */}
        <Button variant="secondary">
          <MessageSquareText />
          Message
        </Button>
      </div>
      <dl className="space-y-2">
        {profileUser?.gender && (
          <div className="flex gap-1">
            <dt className="text-sm font-bold">Gender: </dt>
            <dd className="text-sm font-medium">{profileUser.gender}</dd>
          </div>
        )}
        {profileUser?.location && (
          <div className="flex gap-1">
            <dt className="text-sm font-bold">Location: </dt>
            <dd className="text-sm font-medium">{profileUser.location}</dd>
          </div>
        )}
      </dl>
      {profileUser?.aboutDescription && (
        <div>
          <h2 className="text-sm font-bold">About:</h2>
          <p className="text-sm font-medium">{profileUser.aboutDescription}</p>
        </div>
      )}
      <div>
        <h2 className="text-base font-semibold">Stats:</h2>
        <UserStats chartData={chartData} />
      </div>
      {newestExperienceReports.length > 0 && (
        <div>
          <h2 className="text-base font-semibold">
            Latest experience reports:
            <ul>
              {newestExperienceReports.map((experience) => {
                return (
                  <li
                    className="list-inside list-['🏅'] text-sm font-medium"
                    key={`experience-${experience.id}`}
                  >
                    <Link href={`/main/experiences/${experience.id}`}>
                      {experience.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </h2>
        </div>
      )}
    </div>
  );
}
