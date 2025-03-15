import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getNewestExperiencesInsecure } from '@/database/experiences';
import checkAuth from '@/util/checkAuth';
import levelNames from '@/util/levelNames';
import { maxTextLength } from '@/util/maxTextLength';
import { Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import DisplayStarRating from './components/DisplayStarRating';

export default async function page() {
  const user = await checkAuth();
  const experiences = await getNewestExperiencesInsecure();
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold">Home</h1>
        <p className="text-lg font-medium">
          Welcome, {user.user.username}! Get inspired by the newest experiences
          of our members and create your own.
        </p>
      </div>
      <Separator className="mt-4" />
      {experiences.map((experience) => {
        return (
          <div
            key={`experience-${experience.id}`}
            className="hover:bg-zinc-50 pt-4"
          >
            <div className="flex">
              <Link
                href={`/main/profiles/${experience.user.id}`}
                className="flex flex-col gap-1 items-center min-w-[150px]"
              >
                <Avatar className="w-[65px] h-[65px]">
                  <AvatarImage src={`${experience.user.avatarImage}`} />
                  <AvatarFallback>
                    {experience.user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-bold">{experience.user.username}</p>
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
                <p className="text-xs font-medium">
                  <span className="text-[#8d8d8d]">Gender: </span>
                  {experience.user.gender}
                </p>
                <p className="text-xs font-medium text-center">
                  <span className="text-[#8d8d8d]">Location: </span>
                  {experience.user.location}
                </p>
              </Link>
              <Link
                href={`/main/experiences/${experience.id}`}
                className="space-y-1 p-2"
              >
                <p className="text-sm font-extralight">
                  {experience.date.toLocaleString()}
                </p>
                <h2 className="text-sm font-medium">
                  {experience.challenge.title}
                </h2>
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div>
                  <h4 className="text-sm font-bold text-secondary">
                    Experience:
                  </h4>
                  <p className="text-sm font-medium">
                    {maxTextLength(experience.story, 200)}
                  </p>
                </div>
                <div className="flex items-center">
                  <h4 className="text-sm font-bold text-secondary mr-1">
                    Rating:
                  </h4>
                  <DisplayStarRating rating={experience.rating} />
                </div>
                <div className="flex gap-2 pb-2">
                  <button className="bg-[#ededed] rounded-[100px] px-2 py-1 text-xs flex gap-1">
                    <Heart size={15} />
                    {experience.likes.length}
                  </button>
                  <button className="bg-[#ededed] rounded-[100px] px-2 py-1 text-xs flex gap-1">
                    <MessageSquare size={15} />
                    {experience.comments.length}
                  </button>
                </div>
              </Link>
            </div>
            <Separator className="" />
          </div>
        );
      })}
    </>
  );
}
