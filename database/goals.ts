import { prisma } from '@/lib/prisma';
import { type Goal, type Session } from '@prisma/client';

export async function getGoals(token: Session['token']) {
  const goals = await prisma.goal.findMany({
    where: {
      user: {
        sessions: {
          some: {
            token: token,
            expiryTimestamp: { gt: new Date() },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return goals;
}

export async function getGoal(
  sessionToken: Session['token'],
  goalId: Goal['id'],
) {
  const goal = await prisma.goal.findUnique({
    where: {
      id: goalId,
      user: {
        sessions: {
          some: {
            token: sessionToken,
            expiryTimestamp: {
              gt: new Date(),
            },
          },
        },
      },
    },
  });
  return goal;
}

export async function createGoal(
  sessionToken: Session['token'],
  newGoal: Omit<Goal, 'id' | 'userId' | 'createdAt'>,
) {
  const goal = await prisma.goal.create({
    data: {
      title: newGoal.title,
      deadline: newGoal.deadline,
      additionalNotes: newGoal.additionalNotes,
    },
  });
}

/* export async function getGoalsByUserId(token: string, id: string) {
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

/* export async function createGoal(
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
 */
