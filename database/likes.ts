import { prisma } from '@/lib/prisma';
import type { Like, Session } from '@prisma/client';
import { getUserBySessionToken } from './users';

export async function createLike(
  sessionToken: Session['token'],
  newLike: Omit<Like, 'id' | 'userId'>,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const like = await prisma.like.create({
    data: {
      experienceId: newLike.experienceId,
      userId: user.id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      experience: {
        select: {
          title: true,
          userId: true,
        },
      },
    },
  });
  return like;
}

export async function deleteLike(
  id: Like['id'],
  sessionToken: Session['token'],
) {
  const like = await prisma.like.delete({
    where: {
      id: id,
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
  return like;
}
