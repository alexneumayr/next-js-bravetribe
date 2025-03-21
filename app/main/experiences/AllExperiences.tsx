import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { Separator } from '@/components/ui/separator';
import {
  getExperiencesByTextInsecure,
  getTotalAmountOfExperiencesByTextInsecure,
} from '@/database/experiences';
import levelNames from '@/util/levelNames';
import { maxTextLength } from '@/util/maxTextLength';
import { Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import DisplayStarRating from '../components/DisplayStarRating';

type Props = {
  currentPage: number;
  pageSize: number;
  searchText: string;
};
export default async function SearchResultsExperiences({
  currentPage,
  pageSize,
  searchText,
}: Props) {
  const experiences =
    (await getExperiencesByTextInsecure(
      searchText,
      currentPage,
      pageSize,
      true,
    )) || [];
  const resultsCount =
    (await getTotalAmountOfExperiencesByTextInsecure(searchText, true)) || 0;
  return (
    <div>
      {experiences.length > 0 ? (
        <div className="w-full">
          {Array.isArray(experiences) &&
            experiences.map((experience) => {
              return (
                <div
                  key={`experience-${experience.id}`}
                  className="hover:bg-zinc-50 pt-4"
                >
                  <div className="flex">
                    <Link
                      href={`/main/profiles/${experience.user.id}`}
                      className="flex flex-col gap-1 items-center w-[150px] flex-none"
                    >
                      <Avatar className="w-[65px] h-[65px]">
                        <AvatarImage
                          src={`${experience.user.avatarImageUrl}`}
                        />
                        <AvatarFallback>
                          {experience.user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-bold">
                        {experience.user.username}
                      </p>
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
                    </Link>
                    <Link
                      href={`/main/experiences/${experience.id}`}
                      className="space-y-1 p-2"
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
                        <p className="text-sm font-medium whitespace-pre-wrap">
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
        </div>
      ) : (
        <div>No matches found</div>
      )}
    </div>
  );
}
