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
      currentPage={currentPage}
      pageSize={pageSize}
      searchText={searchText}
      category={category || 'experiences'}
      searchParams={await searchParams}
    />
  );
}
