import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import checkAuth from '@/util/checkAuth';
import SearchResultsExperiences from '../search/SearchResultsExperiences';
import SearchResultsUsers from '../search/SearchResultsUsers';

export default async function ProfilesPage() {
  await checkAuth();

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

  return (
    <div>
      <Tabs className="w-full">
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
        <TabsContent value="experiences">sd</TabsContent>

        <TabsContent value="users">sdasd</TabsContent>
      </Tabs>
    </div>
  );
}
