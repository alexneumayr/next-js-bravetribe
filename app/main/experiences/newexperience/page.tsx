import { Separator } from '@/components/shadcn/separator';
import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import NewExperienceForm from './NewExperienceForm';

type Props = {
  searchParams: Promise<{
    challengeid: string;
  }>;
};

export default async function NewExperiencePage({ searchParams }: Props) {
  const challengeId = (await searchParams).challengeid;

  if (!challengeId) {
    redirect('/main/challenges');
  }
  const sessionTokenCookie = await getCookie('sessionToken');
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie));
  // If the user is not logged in redirect to login page
  if (!session) {
    redirect('/access?mode=signin&returnTo=/main/experiences/newexperience');
  }

  return (
    <>
      <div>
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          Add Experience
        </h1>
        <p className="hidden sm:block text-lg font-medium">
          Here you can add your experience report.
        </p>
      </div>
      <Separator className="my-4" />
      <NewExperienceForm challengeId={challengeId} />
    </>
  );
}
