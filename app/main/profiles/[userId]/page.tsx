import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getNewestExperiencesByUserInsecure } from '@/database/experiences';
import { getUserByIdInsecure } from '@/database/users';
import checkAuth from '@/util/checkAuth';
import levelNames from '@/util/levelNames';
import { userExperiencesPerMonth } from '@/util/userExperiencesPerMonth';
import { MessageSquareText, User } from 'lucide-react';
import Link from 'next/link';
import UserStats from '../../components/UserStats';

type Props = {
  params: Promise<{ userId: string }>;
};

export default async function IndividualProfilePage(props: Props) {
  await checkAuth();
  const user = await getUserByIdInsecure((await props.params).userId);
  const chartData = await userExperiencesPerMonth(user?.id || '');
  const newestExperienceReports = await getNewestExperiencesByUserInsecure(
    user?.id || '',
  );

  return (
    <div className="space-y-5 max-w-[400px]">
      <div className="flex gap-6 items-center">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src={`${user?.avatarImage}`} />
          <AvatarFallback>
            {user?.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user?.username}</h1>
          <p className="text-lg font-medium">
            {levelNames(user?.experiences.length)} ({user?.experiences.length})
          </p>
        </div>
      </div>
      <div className="flex gap-5">
        {/* Add friend requests later */}
        <Button variant="secondary">
          <User />
          Add friend
        </Button>
        {/* Add message functionality later */}
        <Button variant="secondary">
          <MessageSquareText />
          Message
        </Button>
      </div>
      <div>
        <h2 className="text-sm font-bold">Location: </h2>
        <p className="text-sm font-medium">{user?.location}</p>
      </div>
      <div>
        <h2 className="text-sm font-bold">About:</h2>
        <p className="text-sm font-medium">{user?.aboutDescription}</p>
      </div>
      <div>
        <h2 className="text-base font-semibold">Stats:</h2>
        <UserStats chartData={chartData} />
      </div>
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
    </div>
  );
}
