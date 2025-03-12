import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';

export default async function JustformembersPage() {
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = await getCookie('sessionToken');

  // 2. Query user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie));

  // 3. If the user does not exist, redirect to the login (in the example it was with the returnTo parameter)
  if (!user) {
    redirect('/access?mode=signin');
  }
  // 4. Display the page
  return <div>This page is just for members.</div>;
}
