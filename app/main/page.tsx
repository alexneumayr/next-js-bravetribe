import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getNewestExperiencesInsecure } from '@/database/experiences';
import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import levelNames from '@/util/levelNames';
import { Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DisplayStarRating from './components/DisplayStarRating';

export default async function page() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));
  if (!user) {
    redirect('/access?mode=signin&returnTo=/main');
  }
  const experiences = await getNewestExperiencesInsecure();
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold">Home</h1>
        <p className="text-lg font-medium">
          Welcome, {user.username}! Get inspired by the newest experiences of
          our members and create your own.
        </p>
      </div>
      <Separator className="mt-4" />
      {experiences.map((experience) => {
        return (
          <div key={`experience-${experience.id}`} className="pt-4">
            <div className="flex">
              <div className="flex flex-col gap-1 items-center w-[150px] flex-none">
                <Link href={`/main/profiles/${experience.user.id}`}>
                  <Avatar className="w-[65px] h-[65px]">
                    <AvatarImage src={`${experience.user.avatarImageUrl}`} />
                    <AvatarFallback>
                      {experience.user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Link
                  className="hover:underline"
                  href={`/main/profiles/${experience.user.id}`}
                >
                  <p className="text-sm font-bold">
                    {experience.user.username}
                  </p>
                </Link>
                <p className="text-xs font-medium">
                  {levelNames(experience.user.experiences.length)}
                </p>
                <p className="text-xs font-medium">
                  {experience.user.experiences.length}
                  &nbsp;
                  {experience.user.experiences.length !== 1
                    ? 'challenges'
                    : 'challenge'}
                </p>
                <dl className="text-xs font-medium">
                  {experience.user.gender && (
                    <div className="flex justify-center flex-wrap gap-1">
                      <dt className="text-xs font-medium text-[#8d8d8d]">
                        Gender:
                      </dt>
                      <dd> {experience.user.gender}</dd>
                    </div>
                  )}
                  {experience.user.location && (
                    <div className="text-center">
                      <dt className="text-xs font-medium text-[#8d8d8d]">
                        Location:
                      </dt>
                      <dd> {experience.user.location}</dd>
                    </div>
                  )}
                </dl>
              </div>
              <div className="p-2">
                <Link
                  className="space-y-1"
                  href={`/main/experiences/${experience.id}`}
                >
                  <p className="text-sm font-extralight">
                    {experience.date.toLocaleDateString('en-GB')}
                  </p>
                  <h2 className="text-sm font-medium">
                    {experience.challenge.title}
                  </h2>
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                  <div>
                    <h4 className="text-sm font-bold text-secondary">
                      Experience:
                    </h4>
                    <p className="text-sm font-medium line-clamp-3">
                      {experience.story}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <h4 className="text-sm font-bold text-secondary mr-1">
                      Rating:
                    </h4>
                    <DisplayStarRating rating={experience.rating} />
                  </div>
                </Link>
                <div className="flex gap-2 py-2">
                  <button className="bg-[#ededed] rounded-[100px] px-2 py-1 text-xs flex gap-1">
                    <Heart size={15} />
                    {experience.likes.length}
                  </button>
                  <Link
                    href={`/main/experiences/${experience.id}#comments`}
                    className="bg-[#ededed] rounded-[100px] px-2 py-1 text-xs flex gap-1 hover:bg-zinc-200"
                  >
                    <MessageSquare size={15} />
                    {experience.comments.length}
                  </Link>
                </div>
              </div>
            </div>
            <Separator className="" />
          </div>
        );
      })}
    </>
  );
}
