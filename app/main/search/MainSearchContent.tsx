import { Separator } from '@/components/ui/separator';
import SearchArea from './SearchArea';
import SearchResultsExperiences from './SearchResultsExperiences';
import SearchResultsUsers from './SearchResultsUsers';
import TabButtons from './TabButtons';

type Props = {
  currentPage: number;
  pageSize: number;
  searchText: string;
  category: string;
  searchParams: any;
};

export default function MainSearchContent({
  currentPage,
  pageSize,
  searchText,
  category,
  searchParams,
}: Props) {
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold">Search</h1>
        <SearchArea />
      </div>
      <Separator className="my-4" />
      <TabButtons searchParams={searchParams} category={category} />
      {
        /* searchText */ true ? (
          <div>
            {category === 'experiences' ? (
              <SearchResultsExperiences
                searchText={searchText}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            ) : (
              <SearchResultsUsers
                searchText={searchText}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            )}
          </div>
        ) : (
          <p>Please input your search text</p>
        )
      }
    </div>
  );
}
