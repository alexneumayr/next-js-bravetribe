import { getValidSessionToken } from '@/database/sessions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AccessTabs from './AccessTabs';

export default async function AccessPage() {
  // 1. Check if the sessionToken cookie exists
  const cookieStore = await cookies();

  // 1. Get the session token from the cookie
  const sessionTokenCookie = cookieStore.get('sessionToken');

  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  // 3. If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect('/home');
  }

  // 4. If the sessionToken cookie is invalid or doesn't exist, show the login form
  return <AccessTabs />;
}
