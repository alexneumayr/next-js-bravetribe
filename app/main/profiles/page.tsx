import checkAuth from '@/util/checkAuth';

export default async function ProfilePage() {
  await checkAuth();

  return <div>page</div>;
}
