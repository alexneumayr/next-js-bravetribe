import SearchArea from '@/components/SearchArea';
import { Separator } from '@/components/shadcn/separator';
import type { User } from '@prisma/client';
import SearchResultsExperiences from './SearchResultsExperiences';
import SearchResultsUsers from './SearchResultsUsers';
import TabButtons from './TabButtons';

type Props = {
  currentPage: number;
  pageSize: number;
  category: string;
  searchParams: { [key: string]: string };
  user: User;
};

export default function MainSearchContent({
  currentPage,
  pageSize,
  category,
  searchParams,
  user,
}: Props) {
  return (
    <div className="">
      <div className="">
        <h1 className="text-center sm:text-left text-2xl sm:text-3xl font-bold">
          Search
        </h1>
        <SearchArea searchParams={searchParams} />
      </div>
      <Separator className="my-4" />
      <TabButtons searchParams={searchParams} category={category} />
      {searchParams.text ? (
        <div>
          {category === 'experiences' ? (
            <SearchResultsExperiences
              searchText={searchParams.text || ''}
              currentPage={currentPage}
              pageSize={pageSize}
              user={user}
            />
          ) : (
            <SearchResultsUsers
              searchText={searchParams.text || ''}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          )}
        </div>
      ) : (
        <p>Please input your search text</p>
      )}
    </div>
  );
}
