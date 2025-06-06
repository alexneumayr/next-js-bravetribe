import ExperiencesPreview from '@/components/ExperiencesPreview';
import {
  getPublicExperiencesByTextInsecure,
  getTotalAmountOfPublicExperiencesByTextInsecure,
} from '@/database/experiences';
import type { User } from '@prisma/client';

type Props = {
  currentPage: number;
  pageSize: number;
  searchText: string;
  user: User;
};
export default async function SearchResultsExperiences({
  currentPage,
  pageSize,
  searchText,
  user,
}: Props) {
  const experiences =
    (await getPublicExperiencesByTextInsecure(
      searchText,
      currentPage,
      pageSize,
    )) || [];
  const resultsCount =
    (await getTotalAmountOfPublicExperiencesByTextInsecure(searchText)) || 0;
  return (
    <div>
      {experiences.length > 0 ? (
        <ExperiencesPreview
          enablePagination={true}
          currentPage={currentPage}
          pageSize={pageSize}
          resultsCount={resultsCount}
          experiences={experiences}
          user={user}
        />
      ) : (
        <div>No matches found</div>
      )}
    </div>
  );
}
