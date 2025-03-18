import { prisma } from '@/lib/prisma';
import { type Goal, type Session } from '@prisma/client';
import { update } from 'lodash';
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

export async function selectGoalExists(goalId: Goal['id']) {
  const goal = await prisma.goal.count({
    where: {
      id: goalId,
    },
  });
  return goal > 0;
}

export async function createGoal(
  sessionToken: Session['token'],
  newGoal: Pick<Goal, 'title' | 'deadline' | 'additionalNotes'>,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const goals = await prisma.goal.create({
    data: {
      title: newGoal.title,
      deadline: newGoal.deadline,
      additionalNotes: newGoal.additionalNotes,
      userId: user.id,
    },
  });
  return goals;
}

export async function updateGoal(
  goalId: string,
  sessionToken: Session['token'],
  updatedGoal: Pick<Goal, 'title' | 'deadline' | 'additionalNotes'>,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const goals = await prisma.goal.update({
    where: {
      id: goalId,
      userId: user.id,
    },
    data: {
      title: updatedGoal.title,
      deadline: updatedGoal.deadline,
      additionalNotes: updatedGoal.additionalNotes,
      userId: user.id,
    },
  });
  return goals;
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
