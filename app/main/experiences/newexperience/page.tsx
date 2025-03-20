import { Separator } from '@/components/ui/separator';
import { getValidSession } from '@/database/sessions';
import { getTemplateInsecure } from '@/database/templates';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import NewChallengeForm from './NewChallengeForm';

export default async function NewExperiencePage() {
  const sessionTokenCookie = await getCookie('sessionToken');
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie));
  if (!session) {
    redirect('/access?mode=signin&returnTo=/main/experiences/newexperience');
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">New challenge</h1>
        <p className="text-lg font-medium">Here you can add a new challenge.</p>
      </div>
      <Separator className="my-4" />
      <NewChallengeForm template={template} />
    </>
  );
}
