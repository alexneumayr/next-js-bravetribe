'use client';
import { useRouter } from 'next/navigation';

type Props = {
  searchParams: {
    page?: string;
    pageSize?: string;
    category?: string;
    text?: string;
  };
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
    newSearchParams.set('category', 'public');
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
        className={`px-3 py-1 text-2xl font-bold border-primary ${category === 'public' ? 'border-b-2 text-foreground' : 'text-[#737373]'}`}
        onClick={handleUsersButtonClicked}
      >
        Public
      </button>
    </div>
  );
}
