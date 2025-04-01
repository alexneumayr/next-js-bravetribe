import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import LogoutDialog from './LogoutDialog';

export default async function page() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));
  // If the user is not logged in redirect to login page
  if (!user) {
    redirect('/access?mode=signin');
  }
  return <LogoutDialog username={user.username} />;
}
