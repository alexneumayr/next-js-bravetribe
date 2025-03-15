import { prisma } from '@/lib/prisma';

//

/* export async function getGoalsByUserIdInsecure(id: string) {
  const goals = await prisma.goal.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
  return goals;
} */

export async function getGoalsByUserToken(token: string) {
  const goals = await prisma.goal.findMany({
    where: {
      Users: {
        Session: {
          token: token,
          expiryTimestamp: { gt: new Date() },
        },
      },
    },
  });
}

export async function getGoalsByUserId(token: string, id: string) {
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

export async function createGoal(
  userId: string,
  title: string,
  deadline: Date,
) {
  const goal = await prisma.goal.create({
    data: {
      title: title,
      deadline: deadline,
      userId: userId,
    },
  });
  return goal;
}
