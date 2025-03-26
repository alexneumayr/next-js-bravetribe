import { Separator } from '@/components/shadcn/separator';
import { getChallenges } from '@/database/challenges';
import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import ChallengesTabs from './ChallengesTabs';

export default async function ExperiencesPage() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie));
  if (!session) {
    redirect('/access?mode=signin&returnTo=/main/challenges');
  }
  const challenges = await getChallenges(session.token);
  return (
    <>
      <div>
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          Challenge Planner
        </h1>
        <p className="hidden sm:block text-lg font-medium">
          Here you can manage your challenges.
        </p>
      </div>
      <Separator className="my-4" />
      <ChallengesTabs challenges={challenges} />
    </>
  );
}
