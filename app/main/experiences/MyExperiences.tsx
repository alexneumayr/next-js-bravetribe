import ExperiencesPreview from '@/components/ExperiencesPreview';
import {
  getOwnExperiencesByText,
  getTotalAmountOfOwnExperiencesByTextInsecure,
} from '@/database/experiences';
import type { Session, User } from '@prisma/client';

type Props = {
  currentPage: number;
  pageSize: number;
  searchText: string;
  user: User;
  sessionToken: Session['token'];
};
export default async function MyExperiences({
  currentPage,
  pageSize,
  searchText,
  user,
  sessionToken,
}: Props) {
  const experiences = await getOwnExperiencesByText(
    sessionToken,
    searchText,
    currentPage,
    pageSize,
  );
  const resultsCount =
    (await getTotalAmountOfOwnExperiencesByTextInsecure(
      sessionToken,
      searchText,
    )) || 0;
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
