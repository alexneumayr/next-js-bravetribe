import checkAuth from '@/util/checkAuth';

export default async function ProfilesPage() {
  await checkAuth();

  return <div>page</div>;
}
