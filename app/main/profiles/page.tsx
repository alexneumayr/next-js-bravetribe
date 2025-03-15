import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie));
  if (!session) {
    redirect('/access?mode=signin&returnTo=/profile');
  }
  return <div>page</div>;
}
