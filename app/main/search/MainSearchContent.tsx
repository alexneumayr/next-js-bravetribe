import { Separator } from '@/components/ui/separator';
import SearchArea from './SearchArea';
import SearchResultsExperiences from './SearchResultsExperiences';
import SearchResultsUsers from './SearchResultsUsers';
import TabButtons from './TabButtons';

type Props = {
  currentPage: number;
  pageSize: number;
  category: string;
  searchParams: { [key: string]: string };
};

export default function MainSearchContent({
  currentPage,
  pageSize,
  category,
  searchParams,
}: Props) {
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold">Search</h1>
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
