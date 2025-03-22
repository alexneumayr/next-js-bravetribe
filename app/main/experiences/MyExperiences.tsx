import {
  getExperiencesByTextInsecure,
  getTotalAmountOfExperiencesByTextInsecure,
} from '@/database/experiences';
import ExperiencesPreview from '../components/ExperiencesPreview';

type Props = {
  currentPage: number;
  pageSize: number;
  searchText: string;
  userId: string;
};
export default async function SearchResultsExperiences({
  currentPage,
  pageSize,
  searchText,
  userId,
}: Props) {
  const experiences =
    (await getExperiencesByTextInsecure(
      searchText,
      currentPage,
      pageSize,
      true,
      userId,
    )) || [];
  const resultsCount =
    (await getTotalAmountOfExperiencesByTextInsecure(searchText, true)) || 0;
  return (
    <div>
      {experiences.length > 0 ? (
        <ExperiencesPreview
          enablePagination={true}
          currentPage={currentPage}
          pageSize={pageSize}
          resultsCount={resultsCount}
          experiences={experiences}
        />
      ) : (
        <div>No matches found</div>
      )}
    </div>
  );
}
