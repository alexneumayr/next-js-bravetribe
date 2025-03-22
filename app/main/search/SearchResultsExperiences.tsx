import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { Separator } from '@/components/ui/separator';
import {
  getExperiencesByTextInsecure,
  getTotalAmountOfExperiencesByTextInsecure,
} from '@/database/experiences';
import levelNames from '@/util/levelNames';
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
    (await getExperiencesByTextInsecure(searchText, currentPage, pageSize)) ||
    [];
  const resultsCount =
    (await getTotalAmountOfExperiencesByTextInsecure(searchText)) || 0;
  return (
    <div>
      {experiences.length > 0 ? (
        <div className="w-full">
          {Array.isArray(experiences) &&
            experiences.map((experience) => {
              return (
                <div key={`experience-${experience.id}`} className="pt-4">
                  <div className="flex">
                    <div className="flex flex-col gap-1 items-center w-[150px] flex-none">
                      <Link href={`/main/profiles/${experience.user.id}`}>
                        <Avatar className="w-[65px] h-[65px]">
                          <AvatarImage
                            src={`${experience.user.avatarImageUrl}`}
                          />
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
                        <h3 className="text-xl font-bold">
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
                          className="bg-[#ededed] rounded-[100px] px-2 py-1 text-xs flex gap-1 hover:bg-zinc-200"
                          href={`/main/experiences/${experience.id}#comments`}
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
