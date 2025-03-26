import { Separator } from '@/components/shadcn/separator';
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

  //  If the expriences doesn't exist redirect to the experiences overview
  if (!experience) {
    redirect('/main/experiences');
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
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          Experience Report
        </h1>
        <p className="hidden sm:block text-lg font-medium">
          Experienced on {experience.date.toLocaleDateString('en-GB')}
        </p>
      </div>
      <Separator className="mt-4 mb-2" />
      <MainExperienceContent experience={experience} user={user} />
    </>
  );
}
