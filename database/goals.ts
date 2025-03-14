import { prisma } from '@/lib/prisma';

export async function getGoalsByUserId(id: string) {
  const goals = await prisma.goal.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
  return goals;
}
