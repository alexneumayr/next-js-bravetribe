'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Challenge } from '@prisma/client';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { ChallengesTableCompleted } from './ChallengesTableCompleted';
import { ChallengesTableTodo } from './ChallengesTableTodo';
import NewChallengeButton from './NewChallengeButton';

type Props = {
  challenges: Challenge[];
};

export default function ChallengesTabs({ challenges }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const tabs = [
    {
      name: `Todo (${challenges.filter((challenge) => !challenge.isCompleted).length})`,
      value: 'todo',
    },
    {
      name: `Completed (${challenges.filter((challenge) => challenge.isCompleted).length})`,
      value: 'completed',
    },
  ];
  return (
    <Tabs defaultValue="todo" className="space-y-4">
      <div className="flex items-center gap-2 justify-end">
        <TabsList className="w-full p-0 bg-background justify-start rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={`tab-${tab.value}`}
              value={tab.value}
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <h2 className="text-sm font-bold">{tab.name}</h2>
            </TabsTrigger>
          ))}
        </TabsList>
        <button
          className="hover:bg-zinc-100 rounded-[5px] p-[6px] transition-all"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="w-[18px] h-[18px]" />
        </button>
        <NewChallengeButton />
      </div>

      <div
        className={`relative flex-1 transition-all ${showSearch ? 'block' : 'hidden'}`}
      >
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          onChange={(event) => setSearchText(event.currentTarget.value)}
          placeholder="What are you looking for?"
          className="pl-8 rounded-[5px]"
        />
      </div>
      <TabsContent value="todo">
        <ChallengesTableTodo data={challenges} searchText={searchText} />
      </TabsContent>
      <TabsContent value="completed">
        <ChallengesTableCompleted data={challenges} searchText={searchText} />
      </TabsContent>
    </Tabs>
  );
}
