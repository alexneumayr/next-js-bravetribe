import SearchArea from '@/components/SearchArea';
import { Separator } from '@/components/shadcn/separator';
import type { Session, User } from '@prisma/client';
import AllExperiences from './AllExperiences';
import MyExperiences from './MyExperiences';
import TabButtons from './TabButtons';

type Props = {
  currentPage: number;
  pageSize: number;
  category: string;
  searchParams: {
    page?: string;
    pageSize?: string;
    category?: string;
    text?: string;
  };
  user: User;
  sessionToken: Session['token'];
};

export default function MainContentSearchPage({
  currentPage,
  pageSize,
  category,
  searchParams,
  user,
  sessionToken,
}: Props) {
  return (
    <div className="">
      <div className="">
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          Experiences
        </h1>
        <SearchArea searchParams={searchParams} />
      </div>
      <Separator className="my-4" />
      <TabButtons searchParams={searchParams} category={category} />
      <div>
        {category === 'mine' ? (
          <MyExperiences
            searchText={searchParams.text || ''}
            currentPage={currentPage}
            pageSize={pageSize}
            user={user}
            sessionToken={sessionToken}
          />
        ) : (
          <AllExperiences
            searchText={searchParams.text || ''}
            currentPage={currentPage}
            pageSize={pageSize}
            user={user}
          />
        )}
      </div>
    </div>
  );
}
