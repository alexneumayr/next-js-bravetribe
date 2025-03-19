import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
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
  const challengeTemplates = [1, 2];
  const resultsCount = 3;

  // (await getExperiencesByTextInsecure(
  /*     searchText,
    currentPage,
    pageSize,
    true,
    userId,
  )) || [];
     */
  /*   const resultsCount =
    (await getAmountOfExperiencesByTextInsecure(searchText, true)) || 0;
 */ return (
    <div>
      {challengeTemplates.length > 0 ? (
        <div className="w-full">
          <div className="mt-4">
            <PaginationWithLinks
              page={currentPage}
              totalCount={resultsCount}
              pageSize={pageSize}
              pageSizeSelectOptions={{
                pageSizeOptions: [2, 5, 10, 25, 50],
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
