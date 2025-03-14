'use client';
import { useRouter } from 'next/navigation';

type Props = {
  searchParams: { [key: string]: string };
  category: string;
};

export default function TabButtons({ searchParams, category }: Props) {
  const router = useRouter();

  function handleExperiencesButtonClicked() {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', 'mine');
    newSearchParams.set('page', '1');
    router.push(`/main/experiences?${newSearchParams.toString()}`);
  }
  function handleUsersButtonClicked() {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', 'all');
    newSearchParams.set('page', '1');
    router.push(`/main/experiences?${newSearchParams.toString()}`);
  }
  return (
    <div className="mb-2">
      <button
        className={`px-3 py-1 text-2xl font-bold border-primary ${category === 'mine' ? 'border-b-2 text-foreground' : 'text-[#737373]'}`}
        onClick={handleExperiencesButtonClicked}
      >
        Mine
      </button>
      <button
        className={`px-3 py-1 text-2xl font-bold border-primary ${category === 'all' ? 'border-b-2 text-foreground' : 'text-[#737373]'}`}
        onClick={handleUsersButtonClicked}
      >
        All
      </button>
    </div>
  );
}
