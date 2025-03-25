import { getValidSession } from '@/database/sessions';
import { getSafeReturnToPath } from '@/util/returnPathValidation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AccessTabs from './AccessTabs';

type Props = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

export default async function AccessPage({ searchParams }: Props) {
  const returnTo = (await searchParams).returnTo;

  // 1. Check if the sessionToken cookie exists
  const cookieStore = await cookies();

  // 1. Get the session token from the cookie
  const sessionTokenCookie = cookieStore.get('sessionToken');

  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie.value));

  // 3. If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect(getSafeReturnToPath(returnTo) || '/main');
  }

  // 4. If the sessionToken cookie is invalid or doesn't exist, show the login form
  return <AccessTabs />;
}
