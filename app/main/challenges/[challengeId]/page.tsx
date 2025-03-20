import { Separator } from '@/components/ui/separator';
import { getChallenge, selectChallengeExists } from '@/database/challenges';
import { getCookie } from '@/util/cookies';
import Link from 'next/link';
import { ExperiencesTable } from './ExperiencesTable';
import MainChallengeContent from './MainChallengeContent';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function ChallengePage({ params }: Props) {
  const challengeId = (await params).challengeId;
  const sessionToken = await getCookie('sessionToken');

  //  Check if the challenge exists
  if (!(await selectChallengeExists(challengeId))) {
    return (
      <div>
        <h1>Error loading challenge {challengeId}</h1>
        <div>The challenge does not exist</div>
        <Link href="/main/challenges" className="text-[#0000FF] underline">
          Back to Challenge Planner
        </Link>
      </div>
    );
  }

  // Query the challenge with the session token and noteId
  const challenge =
    sessionToken && (await getChallenge(sessionToken, challengeId));

  // If there is no challenge for the current user, show restricted access message
  if (!challenge) {
    return (
      <div>
        <h1>Access Denied</h1>
        <div>You do not have permission to access this challenge</div>
        <Link href="/main/challenges" className="text-[#0000FF] underline">
          Back to Challenge Planner
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Challenge details</h1>
        <p className="text-lg font-medium">
          See the details of your challenge.
        </p>
      </div>
      <Separator className="mt-4 mb-2" />
      <MainChallengeContent challenge={challenge} />
      <Separator className="my-4" />
      <ExperiencesTable
        data={challenge.experiences}
        challengeId={challengeId}
      />
    </>
  );
}
