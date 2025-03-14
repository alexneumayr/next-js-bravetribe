'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchAreaSidebar() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearchFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSearchText('');
    const params = new URLSearchParams(searchParams);
    params.set('text', searchText);
    router.push(`/main/search?${params}`);
  }

  return (
    <form onSubmit={handleSearchFormSubmit}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          onChange={(event) => setSearchText(event.currentTarget.value)}
          value={searchText}
          placeholder="Search"
          className="pl-8 rounded-[100px]"
        />
      </div>
    </form>
  );
}
