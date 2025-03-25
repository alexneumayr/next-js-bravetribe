'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { User } from '@prisma/client';
import AccountSettings from './AccountSettings';
import ProfileSettings from './ProfileSettings';

type Props = {
  user: User;
};

export default function SettingsTabs({ user }: Props) {
  const tabs = [
    {
      name: 'Account',
      value: 'account',
    },
    {
      name: 'Profile',
      value: 'profile',
    },
  ];
  return (
    <Tabs defaultValue="account" className="space-y-4 mt-4">
      <div className="flex items-center gap-2 justify-end">
        <TabsList className="w-full p-0 bg-background justify-start rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={`tab-${tab.value}`}
              value={tab.value}
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <h2 className="text-2xl font-bold">{tab.name}</h2>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="account">
        <AccountSettings user={user} />
      </TabsContent>
      <TabsContent value="profile">
        <ProfileSettings user={user} />
      </TabsContent>
    </Tabs>
  );
}
