import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import UserStats from '@/components/UserStats';
import { getNewestExperiencesByUserInsecure } from '@/database/experiences';
import { getUserByIdInsecure, getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import levelNames from '@/util/levelNames';
import { userExperiencesPerMonth } from '@/util/userExperiencesPerMonth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ProfileButtonsArea from './ProfileButtonsArea';

type Props = {
  params: Promise<{ profileId: string }>;
};

export default async function IndividualProfilePage(props: Props) {
  const profileUserId = (await props.params).profileId;
  const profileUser = await getUserByIdInsecure(profileUserId);

  const sessionTokenCookie = await getCookie('sessionToken');
  const currentUser =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));
  if (!currentUser) {
    redirect('/access?mode=signin&returnTo=/main/experiences');
  }
  //  Check if the experience exists
  if (!profileUser) {
    return (
      <div className="text-center">
        <h1 className="font-bold text-2xl">Error loading profile</h1>
        <div>The user does not exist</div>
        <Link href="/main" className="text-[#0000FF] underline">
          Back to homepage
        </Link>
      </div>
    );
  }
  const chartData = await userExperiencesPerMonth(profileUser.id);
  const newestExperienceReports = await getNewestExperiencesByUserInsecure(
    profileUser.id || '',
  );

  return (
    <div className="space-y-5 max-w-[400px] mx-auto">
      <div className="flex gap-6 items-center">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src={profileUser.avatarImageUrl || undefined} />
          <AvatarFallback>
            {profileUser.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {profileUser.username}
          </h1>
          <p className="text-sm sm:text-lg font-medium">
            {levelNames(profileUser.experiences.length)} (
            {profileUser.experiences.length})
          </p>
        </div>
      </div>
      <ProfileButtonsArea profileUser={profileUser} currentUser={currentUser} />
      <dl>
        {profileUser.gender && (
          <div className="flex gap-1">
            <dt className="text-sm font-bold">Gender: </dt>
            <dd className="text-sm font-medium">{profileUser.gender}</dd>
          </div>
        )}
        {profileUser.location && (
          <div className="flex gap-1">
            <dt className="text-sm font-bold">Location: </dt>
            <dd className="text-sm font-medium">{profileUser.location}</dd>
          </div>
        )}
      </dl>
      {profileUser.aboutDescription && (
        <div>
          <h2 className="text-sm font-bold">About:</h2>
          <p className="text-sm font-medium">{profileUser.aboutDescription}</p>
        </div>
      )}
      <div>
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
