import { Separator } from '@/components/ui/separator';
import { getGoalsByUserId } from '@/database/goals';
import checkAuth from '@/util/checkAuth';
import { GoalsTable } from './GoalsTable';

export default async function GoalsPage() {
  const session = await checkAuth();
  const goals = await getGoalsByUserId(session.user.id);
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold">My goals</h1>
        <p className="text-lg font-medium">
          This page helps you stay focused on your goals.
        </p>
      </div>
      <Separator className="my-4" />
      <GoalsTable data={goals} />
    </>
  );
}
