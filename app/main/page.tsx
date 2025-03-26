import ExperiencesPreview from '@/components/ExperiencesPreview';
import { Separator } from '@/components/shadcn/separator';
import { getNewestExperiencesInsecure } from '@/database/experiences';
import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';

export default async function page() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));
  if (!user) {
    redirect('/access?mode=signin&returnTo=/main');
  }
  const experiences = await getNewestExperiencesInsecure();
  return (
    <>
      <div className="">
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          Home
        </h1>
        <p className="hidden sm:block text-lg font-medium">
          Welcome, {user.username}! Get inspired by the newest experiences of
          our members and create your own.
        </p>
      </div>
      <Separator className="mt-4" />
      <ExperiencesPreview
        user={user}
        experiences={experiences}
        enablePagination={false}
      />
    </>
  );
}
