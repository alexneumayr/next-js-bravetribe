import checkAuth from '@/util/checkAuth';
import React from 'react';
import MainSearchContent from './MainSearchContent';

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
    <MainSearchContent
      currentPage={currentPage}
      pageSize={pageSize}
      searchText={searchText}
      category={category || 'experiences'}
      searchParams={await searchParams}
    />
  );
}
