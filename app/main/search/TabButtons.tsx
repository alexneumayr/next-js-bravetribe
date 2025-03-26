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
    newSearchParams.set('category', 'experiences');
    newSearchParams.set('page', '1');
    router.push(`/main/search?${newSearchParams.toString()}`);
  }
  function handleUsersButtonClicked() {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', 'users');
    newSearchParams.set('page', '1');
    router.push(`/main/search?${newSearchParams.toString()}`);
  }
  return (
    <div className="mb-2">
      <button
        className={`px-3 py-1 text-xl sm:text-2xl font-bold border-primary ${category === 'experiences' ? 'border-b-2 text-foreground' : 'text-[#737373]'}`}
        onClick={handleExperiencesButtonClicked}
      >
        Experiences
      </button>
      <button
        className={`px-3 py-1 text-xl sm:text-2xl font-bold border-primary ${category === 'users' ? 'border-b-2 text-foreground' : 'text-[#737373]'}`}
        onClick={handleUsersButtonClicked}
      >
        Users
      </button>
    </div>
  );
}
