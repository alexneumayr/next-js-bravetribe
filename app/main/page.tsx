import checkAuth from '@/util/checkAuth';

export default async function page() {
  await checkAuth();
  return (
    <div className="">
      <h1>Home</h1>
    </div>
  );
}
