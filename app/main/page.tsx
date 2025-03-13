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
        <p className="max-w-[500px] text-lg font-medium">
          Welcome, {user.User.username}! Get inspired by the newest experiences
          of our members and create your own!
        </p>
      </div>
      <Separator className="mt-4" />
      {experiences.map((experience) => {
        return (
          <Link
            href={`/main/experiences/${experience.id}`}
            key={`experience-${experience.id}`}
          >
            <div className="hover:bg-zinc-50 pt-4">
              <div className="flex">
                <div className="flex flex-col gap-1 items-center min-w-[150px]">
                  <Avatar className="w-[65px] h-[65px]">
                    <AvatarImage src={`${experience.User.avatarImage}`} />
                    <AvatarFallback>
                      {experience.User.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-bold">
                    {experience.User.username}
                  </p>
                  <p className="text-xs font-medium">
                    {levelNames(experience.User.experiences.length)}
                  </p>
                  <p className="text-xs font-medium">
                    {experience.User.experiences.length} challenges
                  </p>
                  <p className="text-xs font-medium">
                    <span className="text-[#8d8d8d]">Gender: </span>
                    {experience.User.gender}
                  </p>
                  <p className="text-xs font-medium text-center">
                    <span className="text-[#8d8d8d]">Location: </span>
                    {experience.User.location}
                  </p>
                </div>
                <div className="space-y-1 p-2">
                  <p className="text-sm font-extralight">
                    {experience.date.toLocaleString()}
                  </p>
                  <h2 className="text-sm font-medium">
                    {experience.Challenge.title}
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
                </div>
              </div>
              <Separator className="" />
            </div>
          </Link>
        );
      })}
    </>
  );
}
