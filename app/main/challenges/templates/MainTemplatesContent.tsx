import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import {
  getChallengeTemplatesInsecure,
  getTotalAmountOfChallengeTemplatesInsecure,
} from '@/database/templates';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  currentPage: number;
  pageSize: number;
  searchText?: string;
};
export default async function MainTemplatesContent({
  currentPage,
  pageSize,
  searchText,
}: Props) {
  const challengeTemplates = await getChallengeTemplatesInsecure(
    searchText || '',
    currentPage,
    pageSize,
  );
  const resultsCount = await getTotalAmountOfChallengeTemplatesInsecure(
    searchText || '',
  );
  return (
    <div>
      <div>
        <div className="flex flex-wrap gap-4 justify-center">
          {challengeTemplates.map((template) => (
            <div
              key={`template-${template.id}`}
              className="flex flex-col items-center hover:cursor-pointer hover:opacity-60 transition-all"
            >
              <Image
                src={`/challenge_templates/${template.image}`}
                alt={template.imageAlt}
                width="268"
                height="179"
                className="rounded-[5px]"
              />
              <p className="text-sm font-semibold">{template.title}</p>
            </div>
          ))}
        </div>
      </div>
      {challengeTemplates.length > 0 ? (
        <div className="w-full">
          <div className="mt-4">
            <PaginationWithLinks
              page={currentPage}
              totalCount={resultsCount}
              pageSize={pageSize}
              pageSizeSelectOptions={{
                pageSizeOptions: [3, 6, 12, 15, 18],
              }}
            />
          </div>
        </div>
      ) : (
        <div>No challenge templates found</div>
      )}
    </div>
  );
}
