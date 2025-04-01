import { Separator } from '@/components/shadcn/separator';
import { getValidSession } from '@/database/sessions';
import { getTemplateInsecure } from '@/database/templates';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import NewChallengeForm from './NewChallengeForm';

type Props = {
  searchParams: Promise<{
    template?: string;
  }>;
};

export default async function NewChallengePage({ searchParams }: Props) {
  const sessionTokenCookie = await getCookie('sessionToken');
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie));
  // If the user is not logged in redirect to login page
  if (!session) {
    redirect('/access?mode=signin&returnTo=/main/challenges/newchallenge');
  }

  const templateId = (await searchParams).template;
  const template = await getTemplateInsecure(templateId);

  return (
    <>
      <div>
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          New challenge
        </h1>
        <p className="hidden sm:block text-lg font-medium">
          Here you can add a new challenge.
        </p>
      </div>
      <Separator className="my-4" />
      <NewChallengeForm template={template} />
    </>
  );
}
