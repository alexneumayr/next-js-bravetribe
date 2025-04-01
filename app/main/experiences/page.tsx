import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import React from 'react';
import MainExperiencesContent from './MainExperiencesContent';

type Props = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    category?: string;
    text?: string;
  }>;
};

export default async function ExperiencesPage({ searchParams }: Props) {
  const sessionTokenCookie = await getCookie('sessionToken');
  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));
  // If the user is not logged in redirect to login page
  if (!user) {
    redirect('/access?mode=signin&returnTo=/main/experiences');
  }
  const currentPage = Number((await searchParams).page) || 1;
  const pageSize = Number((await searchParams).pageSize) || 5;
  const category = (await searchParams).category || '';

  return (
    <MainExperiencesContent
      currentPage={currentPage}
      pageSize={pageSize}
      category={category || 'mine'}
      searchParams={await searchParams}
      user={user}
      sessionToken={sessionTokenCookie}
    />
  );
}
