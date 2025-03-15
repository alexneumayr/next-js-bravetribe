import checkAuth from '@/util/checkAuth';
import React from 'react';
import MainExperiencesContent from './MainExperiencesContent';

export default async function ExperiencesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const user = await checkAuth();
  const currentPage = Number((await searchParams).page) || 1;
  const pageSize = Number((await searchParams).pageSize) || 5;
  const category = (await searchParams).category || '';

  return (
    <MainExperiencesContent
      currentPage={currentPage}
      pageSize={pageSize}
      category={category || 'mine'}
      searchParams={await searchParams}
      userId={user.user.id}
    />
  );
}
