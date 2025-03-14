import { Separator } from '@/components/ui/separator';
import AllExperiences from './AllExperiences';
import MyExperiences from './MyExperiences';
import SearchArea from './SearchArea';
import TabButtons from './TabButtons';

type Props = {
  currentPage: number;
  pageSize: number;
  searchText: string;
  category: string;
  searchParams: any;
  userId: string;
};

export default function MainContentSearchPage({
  currentPage,
  pageSize,
  searchText,
  category,
  searchParams,
  userId,
}: Props) {
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold">Experiences</h1>
        <SearchArea />
      </div>
      <Separator className="my-4" />
      <TabButtons searchParams={searchParams} category={category} />
      <div>
        {category === 'mine' ? (
          <MyExperiences
            searchText={searchText}
            currentPage={currentPage}
            pageSize={pageSize}
            userId={userId}
          />
        ) : (
          <AllExperiences
            searchText={searchText}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
}
