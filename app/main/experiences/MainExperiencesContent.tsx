import { Separator } from '@/components/ui/separator';
import AllExperiences from './AllExperiences';
import MyExperiences from './MyExperiences';
import SearchArea from './SearchArea';
import TabButtons from './TabButtons';

type Props = {
  currentPage: number;
  pageSize: number;
  category: string;
  searchParams: { [key: string]: string };
  userId: string;
};

export default function MainContentSearchPage({
  currentPage,
  pageSize,
  category,
  searchParams,
  userId,
}: Props) {
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold">Experiences</h1>
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
            userId={userId}
          />
        ) : (
          <AllExperiences
            searchText={searchParams.text || ''}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
}
