import checkAuth from '@/util/checkAuth';

export default async function ExperiencesPage() {
  await checkAuth();

  return <div>page</div>;
}
