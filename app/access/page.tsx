import { getValidSession } from '@/database/sessions';
import { getSafeReturnToPath } from '@/util/returnPathValidation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AccessTabs from './AccessTabs';
import HeaderAccessPage from './HeaderAccessPage';

type Props = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

export default async function AccessPage({ searchParams }: Props) {
  const returnTo = (await searchParams).returnTo;

  // Check if the sessionToken cookie exists
  const cookieStore = await cookies();

  // Get the session token from the cookie
  const sessionTokenCookie = cookieStore.get('sessionToken');

  // Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie.value));

  // If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect(getSafeReturnToPath(returnTo) || '/main');
  }

  // If the sessionToken cookie is invalid or doesn't exist, show the login form
  return (
    <>
      <HeaderAccessPage />
      <AccessTabs />
    </>
  );
}
