import checkAuth from '@/util/checkAuth';

export default async function page() {
  await checkAuth();
  return <div className="">This is the home page</div>;
}
