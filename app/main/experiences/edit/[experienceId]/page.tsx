import { Separator } from '@/components/shadcn/separator';
import {
  getExperienceForEdit,
  selectExperienceExists,
} from '@/database/experiences';
import { getCookie } from '@/util/cookies';
import Link from 'next/link';
import EditExperienceForm from './EditExperienceForm';

type Props = {
  params: Promise<{ experienceId: string }>;
};

export default async function ChallengePage({ params }: Props) {
  const experienceId = (await params).experienceId;
  const sessionToken = await getCookie('sessionToken');

  //  Check if the experience exists
  if (!(await selectExperienceExists(experienceId))) {
    return (
      <div>
        <h1>Error loading experience {experienceId}</h1>
        <div>The experience does not exist</div>
        <Link href="/main/experiences" className="text-[#0000FF] underline">
          Back to Experiences
        </Link>
      </div>
    );
  }

  // Query the experience with the session token and experienceId
  const experience =
    sessionToken && (await getExperienceForEdit(sessionToken, experienceId));

  // If this is not an editable experience for the current user, show restricted access message
  if (!experience) {
    return (
      <div className="text-center">
        <h1 className="font-bold text-2xl">Access Denied</h1>
        <div>You do not have permission to edit this experience</div>
        <Link href="/main/experiences" className="text-[#0000FF] underline">
          Back to Experiences
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Experience Editor</h1>
        <p className="text-lg font-medium">
          Here you can edit your experience.
        </p>
      </div>
      <Separator className="mt-4 mb-2" />
      <EditExperienceForm experience={experience} />
    </>
  );
}
