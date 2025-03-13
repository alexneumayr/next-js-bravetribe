'use client';

import { Separator } from '@/components/ui/separator';
import type { ExperienceWithAdditionalDetails } from '@/database/experiences';
import type { UserWithExperiences } from '@/database/users';
import { useRouter } from 'next/navigation';
import SearchArea from './SearchArea';
import SearchResultsExperiences from './SearchResultsExperiences';
import SearchResultsUsers from './SearchResultsUsers';

type Props = {
  experiencesSearchResults: ExperienceWithAdditionalDetails[] | undefined;
  usersSearchResults: UserWithExperiences[] | undefined;
  currentPage: number;
  experiencesResultsCount: number;
  usersResultsCount: number;
  pageSize: number;
  searchText: string;
  category: string;
  searchParams: any;
};

export default function MainContentSearchPage({
  experiencesSearchResults,
  usersSearchResults,
  currentPage,
  experiencesResultsCount,
  usersResultsCount,
  pageSize,
  searchText,
  category,
  searchParams,
}: Props) {
  const router = useRouter();

  function handleExperiencesButtonClicked() {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', 'experiences');
    newSearchParams.set('page', '1');
    router.push(`/main/search?${newSearchParams.toString()}`);
  }
  function handleUsersButtonClicked() {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', 'users');
    newSearchParams.set('page', '1');
    router.push(`/main/search?${newSearchParams.toString()}`);
  }
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold">Search</h1>
        <SearchArea />
      </div>
      <Separator className="my-4" />
      {searchText ? (
        <div>
          <div className="mb-2">
            <button
              className={`px-3 py-1 text-2xl font-bold border-primary ${category === 'experiences' ? 'border-b-2 text-foreground' : 'text-[#737373]'}`}
              onClick={handleExperiencesButtonClicked}
            >
              Experiences
            </button>
            <button
              className={`px-3 py-1 text-2xl font-bold border-primary ${category === 'users' ? 'border-b-2 text-foreground' : 'text-[#737373]'}`}
              onClick={handleUsersButtonClicked}
            >
              Users
            </button>
          </div>
          {category === 'experiences' ? (
            <SearchResultsExperiences
              experiences={experiencesSearchResults || []}
              currentPage={currentPage}
              resultsCount={experiencesResultsCount}
              pageSize={pageSize}
            />
          ) : (
            <SearchResultsUsers
              users={usersSearchResults || []}
              currentPage={currentPage}
              resultsCount={usersResultsCount}
              pageSize={pageSize}
            />
          )}
        </div>
      ) : (
        <p>Please input your search text</p>
      )}
    </div>
  );
}
