'use client';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ExperienceWithAdditionalDetails } from '@/database/experiences';
import type { UserWithExperiences } from '@/database/users';
import SearchArea from './SearchArea';
import SearchResultsExperiences from './SearchResultsExperiences';
import SearchResultsUsers from './SearchResultsUsers';

type Props = {
  experiencesSearchResults: ExperienceWithAdditionalDetails[] | undefined;
  usersSearchResults: UserWithExperiences[] | undefined;
};

const tabs = [
  {
    name: 'Experiences',
    value: 'experiences',
  },
  {
    name: 'Users',
    value: 'users',
  },
];

export default function MainContentSearchPage({
  experiencesSearchResults,
  usersSearchResults,
}: Props) {
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold">Search</h1>
        <SearchArea />
      </div>
      <Separator className="my-4" />
      <Tabs defaultValue="experiences" className="w-full">
        <TabsList className="w-full p-0 bg-background justify-start rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={`value-${tab.value}`}
              value={tab.value}
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <h2 className="text-2xl font-bold">{tab.name}</h2>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="experiences">
          <SearchResultsExperiences experiences={experiencesSearchResults} />
        </TabsContent>

        <TabsContent value="users">
          <SearchResultsUsers users={usersSearchResults} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
