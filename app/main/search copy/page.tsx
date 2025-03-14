import {
  getAmountOfExperiencesByTextInsecure,
  getExperiencesByTextInsecure,
} from '@/database/experiences';
import {
  getAmountOfUsersByTextInsecure,
  getUsersByTextInsecure,
} from '@/database/users';
import checkAuth from '@/util/checkAuth';
import React from 'react';
import MainContentSearchPage from './MainContentSearchPage';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  await checkAuth();
  const searchText = (await searchParams).text || '';
  const currentPage = Number((await searchParams).page) || 1;
  const pageSize = Number((await searchParams).pageSize) || 5;
  const category = (await searchParams).category || '';

  return (
    <MainContentSearchPage
      experiencesSearchResults={await getExperiencesByTextInsecure(
        searchText,
        currentPage,
        pageSize,
      )}
      usersSearchResults={await getUsersByTextInsecure(
        searchText,
        currentPage,
        pageSize,
      )}
      currentPage={currentPage}
      experiencesResultsCount={
        (await getAmountOfExperiencesByTextInsecure(searchText)) || 0
      }
      usersResultsCount={
        (await getAmountOfUsersByTextInsecure(searchText)) || 0
      }
      pageSize={pageSize}
      searchText={searchText}
      category={category || 'experiences'}
      searchParams={await searchParams}
    />
  );
}
