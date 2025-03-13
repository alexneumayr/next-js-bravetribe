import { getExperiencesByTextInsecure } from '@/database/experiences';
import { getUsersByTextInsecure } from '@/database/users';
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

  return (
    <MainContentSearchPage
      experiencesSearchResults={await getExperiencesByTextInsecure(searchText)}
      usersSearchResults={await getUsersByTextInsecure(searchText)}
    />
  );
}
