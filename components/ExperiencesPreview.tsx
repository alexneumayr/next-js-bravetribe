import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { PaginationWithLinks } from '@/components/shadcn/pagination-with-links';
import { Separator } from '@/components/shadcn/separator';
import levelNames from '@/util/levelNames';
import type { Prisma, User } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import DisplayStarRating from './DisplayStarRating';
import ExperienceMenu from './ExperienceMenu';
import LikeByCurrentUserField from './LikeByCurrentUserField';
import LikeFieldDefault from './LikeFieldDefault';

type PropsBase = {
  user: User;
  experiences: Prisma.ExperienceGetPayload<{
    include: {
      user: { include: { experiences: true } };
      challenge: true;
      likes: true;
      comments: true;
    };
  }>[];
};

type Props = PropsBase &
  (
    | {
        enablePagination: true;
        currentPage: number;
        pageSize: number;
        resultsCount: number;
      }
    | {
        enablePagination: false;
        currentPage?: never;
        pageSize?: never;
        resultsCount?: never;
      }
  );
export default function ExperiencesPreview({
  experiences,
  currentPage,
  pageSize,
  resultsCount,
  enablePagination,
  user,
}: Props) {
  return (
    <div className="w-full">
      {Array.isArray(experiences) &&
        experiences.map((experience) => {
          return (
            <div key={`experience-${experience.id}`} className="pt-4">
              <div className="flex flex-col sm:flex-row ">
                <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 items-center sm:w-[150px] flex-none w-full">
                  <Link href={`/main/profiles/${experience.user.id}`}>
                    <Avatar className="w-[30px] h-[30px] sm:w-[65px] sm:h-[65px]">
                      <AvatarImage src={experience.user.avatarImageUrl || ''} />
                      <AvatarFallback className="text-xs sm:text-[16px]">
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
                <div className="w-full mt-1">
                  <div>
                    <div className="sm:flex justify-between items-center hidden">
                      <p className="text-sm font-extralight">
                        {experience.date.toLocaleDateString('en-GB')}
                      </p>
                      <ExperienceMenu experience={experience} user={user} />
                    </div>
                    <Link href={`/main/experiences/${experience.id}`}>
                      <h2 className="text-sm font-medium">
                        {experience.challenge.title}
                      </h2>
                      <h3 className="text-lg sm:text-xl font-bold">
                        {experience.title}
                      </h3>
                      <div>
                        <h4 className="text-sm font-bold text-secondary">
                          Experience:
                        </h4>
                        <p className="text-sm font-medium line-clamp-3">
                          {experience.story}
                        </p>
                      </div>
                      <div className="flex items-center mt-1">
                        <p className="text-sm font-bold text-secondary mr-1">
                          Rating:
                        </p>
                        <DisplayStarRating rating={experience.rating} />
                      </div>
                    </Link>
                  </div>
                  <div className="flex gap-2 py-2">
                    {experience.likes.some(
                      (likes) => likes.userId === user.id,
                    ) ? (
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
              <Separator className="mt-3" />
            </div>
          );
        })}
      {enablePagination && (
        <div className="mt-4">
          <PaginationWithLinks
            page={currentPage}
            totalCount={resultsCount}
            pageSize={pageSize}
            pageSizeSelectOptions={{
              pageSizeOptions: [2, 5, 10, 25, 50],
            }}
          />
        </div>
      )}
    </div>
  );
}
