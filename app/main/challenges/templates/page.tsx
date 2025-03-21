import { Separator } from '@/components/ui/separator';
import { getValidSession } from '@/database/sessions';
import {
  getChallengeTemplatesInsecure,
  getTotalAmountOfChallengeTemplatesInsecure,
} from '@/database/templates';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import SearchArea from '../../components/SearchArea';
import MainTemplatesContent from './MainTemplatesContent';

type Props = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    text?: string;
  }>;
};

export default async function TemplatesPage({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;
  const sessionTokenCookie = await getCookie('sessionToken');
  const session =
    sessionTokenCookie && (await getValidSession(sessionTokenCookie));
  if (!session) {
    redirect('/access?mode=signin&returnTo=/main/challenge/templates');
  }
  const searchText = awaitedSearchParams.text;
  const pageSize = Number(awaitedSearchParams.pageSize) || 9;
  const currentPage = Number(awaitedSearchParams.page) || 1;
  const challengeTemplates = await getChallengeTemplatesInsecure(
    searchText || '',
    currentPage,
    pageSize,
  );
  const resultsCount = await getTotalAmountOfChallengeTemplatesInsecure(
    searchText || '',
  );
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Choose your challenge</h1>
        <p className="text-lg font-medium">
          Get inspired by one of our challenges.
        </p>
      </div>
      <SearchArea searchParams={awaitedSearchParams} />
      <Separator className="my-4" />
      <MainTemplatesContent
        currentPage={currentPage}
        pageSize={pageSize}
        resultsCount={resultsCount}
        challengeTemplates={challengeTemplates}
      />
    </>
  );
}
