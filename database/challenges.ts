import { prisma } from '@/lib/prisma';
import { type Challenge, type Session } from '@prisma/client';
import { getUserBySessionToken } from './users';

export async function getChallenges(sessionToken: Session['token']) {
  const challenges = await prisma.challenge.findMany({
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
  return challenges;
}

export async function getChallenge(
  sessionToken: Session['token'],
  challengeId: Challenge['id'],
) {
  const challenge = await prisma.challenge.findUnique({
    where: {
      id: challengeId,
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
  return challenge;
}

export async function selectChallengeExists(challengeId: Challenge['id']) {
  const challenge = await prisma.challenge.count({
    where: {
      id: challengeId,
    },
  });
  return challenge > 0;
}

export async function createChallenge(
  sessionToken: Session['token'],
  newChallenge: Pick<Challenge, 'title' | 'description' | 'plannedDate'>,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const challenge = await prisma.challenge.create({
    data: {
      title: newChallenge.title,
      description: newChallenge.description,
      plannedDate: newChallenge.plannedDate,
      userId: user.id,
    },
  });
  return challenge;
}

export async function updateChallenge(
  sessionToken: Session['token'],
  updatedChallenge: Pick<
    Challenge,
    'id' | 'title' | 'description' | 'plannedDate'
  >,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const challenge = await prisma.challenge.update({
    where: {
      id: updatedChallenge.id,
      userId: user.id,
    },
    data: {
      title: updatedChallenge.title,
      description: updatedChallenge.description,
      plannedDate: updatedChallenge.plannedDate,
    },
  });
  return challenge;
}

export async function updateChallengeStatus(
  sessionToken: Session['token'],
  updatedChallenge: Pick<Challenge, 'id' | 'isCompleted'>,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const challenge = await prisma.challenge.update({
    where: {
      id: updatedChallenge.id,
      userId: user.id,
    },
    data: {
      isCompleted: updatedChallenge.isCompleted,
    },
  });
  return challenge;
}

export async function deleteChallenge(
  challengeId: string,
  sessionToken: Session['token'],
) {
  const challenge = await prisma.challenge.delete({
    where: {
      id: challengeId,
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
  return challenge;
}
