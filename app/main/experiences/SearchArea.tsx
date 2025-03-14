'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchArea() {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('text') || '');
  const router = useRouter();

  function handleSearchFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSearchText('');
    const params = new URLSearchParams();
    params.set('text', searchText);
    router.push(`/main/experiences?${params}`);
  }

  return (
    <form onSubmit={handleSearchFormSubmit} className="mt-2 flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          onChange={(event) => setSearchText(event.currentTarget.value)}
          value={searchText}
          placeholder="What are you looking for?"
          className="pl-8 rounded-[5px]"
        />
      </div>
      <Button variant="secondary" className="text-white" type="submit">
        Search
      </Button>
    </form>
  );
}
