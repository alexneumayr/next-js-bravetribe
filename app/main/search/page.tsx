import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import React from 'react';
import MainSearchContent from './MainSearchContent';

type Props = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    category?: string;
    text?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const sessionTokenCookie = await getCookie('sessionToken');
  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));

  if (!user) {
    redirect('/access?mode=signin&returnTo=/main/search');
  }
  const currentPage = Number((await searchParams).page) || 1;
  const pageSize = Number((await searchParams).pageSize) || 5;
  const category = (await searchParams).category || '';

  return (
    <MainSearchContent
      currentPage={currentPage}
      pageSize={pageSize}
      category={category || 'experiences'}
      searchParams={await searchParams}
      user={user}
    />
  );
}
