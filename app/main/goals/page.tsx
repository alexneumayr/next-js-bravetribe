import { Separator } from '@/components/shadcn/separator';
import { getGoals } from '@/database/goals';
import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import { GoalsTable } from './GoalsTable';

export default async function GoalsPage() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie));
  if (!session) {
    redirect('/access?mode=signin&returnTo=/main/goals');
  }
  const goals = await getGoals(session.token);
  return (
    <>
      <div className="">
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          My goals
        </h1>
        <p className="hidden sm:block text-lg font-medium">
          This page helps you stay focused on your goals.
        </p>
      </div>
      <Separator className="my-4" />
      <GoalsTable data={goals} />
    </>
  );
}
