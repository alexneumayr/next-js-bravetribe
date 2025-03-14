import { getUserBySessionToken } from '@/database/users';
import { redirect } from 'next/navigation';
import { getCookie } from './cookies';

export default async function checkAuth() {
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = await getCookie('sessionToken');

  // 2. Query user with the sessionToken
  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));

  // 3. If the user does not exist, redirect to the login
  if (!user) {
    const params = new URLSearchParams();
    params.set('mode', 'signin');
    redirect(`/access?${params}`);
  }
  return user;
}
