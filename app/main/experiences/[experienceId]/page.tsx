import { Separator } from '@/components/ui/separator';
import { getExperienceInsecure } from '@/database/experiences';
import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import MainExperienceContent from './MainExperienceContent';

type Props = {
  params: Promise<{ experienceId: string }>;
};

export default async function ExperiencePage({ params }: Props) {
  const sessionTokenCookie = await getCookie('sessionToken');
  const experienceId = (await params).experienceId;

  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));
  if (!user) {
    redirect(`/access?mode=signin&returnTo=/main/experiences/${experienceId}`);
  }

  const experience = await getExperienceInsecure(experienceId);

  if (!experience) {
    return (
      <div className="text-center">
        <h1 className="font-bold text-2xl">
          Error loading experience {experienceId}
        </h1>
        <div>The experience does not exist</div>
        <Link href="/main/experiences" className="text-[#0000FF] underline">
          Back to Experiences
        </Link>
      </div>
    );
  }

  if (!experience.user.areExperiencesPublic && experience.userId !== user.id) {
    return (
      <div className="text-center">
        <h1 className="font-bold text-2xl">Access denied</h1>
        <div>This experience is private</div>
        <Link href="/main/experiences" className="text-[#0000FF] underline">
          Back to Experiences
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Experience Report</h1>
        <p className="text-lg font-medium">
          Experienced on {experience.date.toLocaleDateString('en-GB')}
        </p>
      </div>
      <Separator className="mt-4 mb-2" />
      <MainExperienceContent experience={experience} user={user} />
    </>
  );
}
