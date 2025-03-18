import { prisma } from '@/lib/prisma';
import { type Goal, type Session } from '@prisma/client';
import { getUserBySessionToken } from './users';

export async function getGoals(sessionToken: Session['token']) {
  const goals = await prisma.goal.findMany({
    where: {
      user: {
        sessions: {
          some: {
            token: sessionToken,
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
  newGoal: Pick<Goal, 'title' | 'deadline' | 'additionalNotes'>,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const goal = await prisma.goal.create({
    data: {
      title: newGoal.title,
      deadline: newGoal.deadline,
      additionalNotes: newGoal.additionalNotes,
      userId: user.id,
    },
  });
  return goal;
}

export async function updateGoal(
  sessionToken: Session['token'],
  updatedGoal: Pick<Goal, 'id' | 'title' | 'deadline' | 'additionalNotes'>,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const goal = await prisma.goal.update({
    where: {
      id: updatedGoal.id,
      userId: user.id,
    },
    data: {
      title: updatedGoal.title,
      deadline: updatedGoal.deadline,
      additionalNotes: updatedGoal.additionalNotes,
      userId: user.id,
    },
  });
  return goal;
}

export async function deleteGoal(
  goalId: string,
  sessionToken: Session['token'],
) {
  const goal = await prisma.goal.delete({
    where: {
      id: goalId,
      user: {
        sessions: {
          some: {
            token: sessionToken,
            expiryTimestamp: { gt: new Date() },
          },
        },
      },
    },
  });
  return goal;
}
