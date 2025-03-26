'use client';
import DisplayStarRating from '@/components/DisplayStarRating';
import ExperienceMenu from '@/components/ExperienceMenu';
import LikeByCurrentUserField from '@/components/LikeByCurrentUserField';
import LikeFieldDefault from '@/components/LikeFieldDefault';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Separator } from '@/components/shadcn/separator';
import type { FullComment, LocationObject } from '@/types/types';
import levelNames from '@/util/levelNames';
import type { Prisma, User } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import AddComment from './AddComment';
import CommentSection from './CommentSection';
import ExperienceMap from './ExperienceMap';

type Props = {
  experience: Prisma.ExperienceGetPayload<{
    include: {
      user: { include: { experiences: true } };
      challenge: true;
      likes: true;
      comments: true;
    };
  }>;
  user: User;
};

export default function MainExperienceContent({ experience, user }: Props) {
  const location: LocationObject | null =
    experience.location as LocationObject | null;
  const commentsRef = useRef<HTMLDivElement>(null);
  return (
    <div className="pt-4">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 items-center sm:w-[150px] flex-none w-full">
          <Link href={`/main/profiles/${experience.user.id}`}>
            <Avatar className="w-[30px] h-[30px] sm:w-[65px] sm:h-[65px]">
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
            <p className="text-sm font-bold">{experience.user.username}</p>
            <p className="text-xs font-extralight sm:hidden">
              {experience.date.toLocaleDateString('en-GB')}
            </p>
          </Link>
          <div className="ml-auto flex items-center sm:hidden">
            <ExperienceMenu experience={experience} user={user} />
          </div>
          <p className="text-xs font-medium hidden sm:block">
            {levelNames(experience.user.experiences.length)}
          </p>
          <p className="text-xs font-medium hidden sm:block">
            {experience.user.experiences.length}
            &nbsp;
            {experience.user.experiences.length !== 1
              ? 'challenges'
              : 'challenge'}
          </p>
          <dl className="text-xs font-medium hidden sm:block">
            {experience.user.gender && (
              <div className="flex justify-center flex-wrap gap-1">
                <dt className="text-xs font-medium text-[#8d8d8d]">Gender:</dt>
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
        <div className="w-full mt-1">
          <div className="flex justify-between items-start">
            <div className="">
              <h2 className="text-sm sm:text-base font-semibold sm:font-bold">
                {experience.challenge.title}
              </h2>
              <h3 className="text-xl sm:text-3xl font-semibold">
                {experience.title}
              </h3>

              <div className="mt-2">
                <DisplayStarRating rating={experience.rating} />
              </div>
            </div>
            <div className="hidden sm:block">
              <ExperienceMenu experience={experience} user={user} />
            </div>
          </div>
          <div className="my-3">
            {experience.imageUrl && (
              <img
                src={experience.imageUrl}
                alt="Doing the experience"
                className="w-[180px] h-[180px] sm:float-right sm:ml-4 mb-4 mt-4 sm:mt-0"
              />
            )}
            <h4 className="text-sm font-bold text-secondary">Challenge:</h4>
            <p className="text-sm font-medium whitespace-pre-wrap">
              {experience.challenge.description}
            </p>
          </div>
          <h4 className="text-sm font-bold text-secondary">Experience:</h4>
          <p className="text-sm font-medium whitespace-pre-wrap">
            {experience.story}
          </p>
          <Separator className="my-4 clear-right" />
          {location && <ExperienceMap lat={location.lat} lng={location.lon} />}
          <div className="flex gap-2 pb-2">
            {experience.likes.some((likes) => likes.userId === user.id) ? (
              <LikeByCurrentUserField
                likes={experience.likes}
                userId={user.id}
              />
            ) : (
              <LikeFieldDefault
                likes={experience.likes}
                experienceId={experience.id}
              />
            )}
            <button
              className="hover:bg-zinc-200 bg-[#ededed] rounded-[100px] px-2 py-1 text-xs flex gap-1"
              type="button"
              onClick={() =>
                commentsRef.current?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
            >
              <MessageSquare size={15} />
              {experience.comments.length}
            </button>
          </div>
          <div id="comments" ref={commentsRef}>
            <AddComment experienceId={experience.id} />
            {experience.comments.length > 0 && (
              <CommentSection
                comments={experience.comments as FullComment[]}
                user={user}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
