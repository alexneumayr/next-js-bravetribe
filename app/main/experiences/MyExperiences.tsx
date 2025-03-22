import {
  getExperiencesByTextInsecure,
  getTotalAmountOfExperiencesByTextInsecure,
} from '@/database/experiences';
import type { User } from '@prisma/client';
import ExperiencesPreview from '../components/ExperiencesPreview';

type Props = {
  currentPage: number;
  pageSize: number;
  searchText: string;
  user: User;
};
export default async function MyExperiences({
  currentPage,
  pageSize,
  searchText,
  user,
}: Props) {
  const experiences =
    (await getExperiencesByTextInsecure(
      searchText,
      currentPage,
      pageSize,
      true,
      user.id,
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
          user={user}
        />
      ) : (
        <div>No matches found</div>
      )}
    </div>
  );
}
