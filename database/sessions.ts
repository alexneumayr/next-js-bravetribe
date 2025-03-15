import { prisma } from '@/lib/prisma';
import { type Session, type User } from '@prisma/client';

export async function getValidSession(sessionToken: Session['token']) {
  const session = await prisma.session.findUnique({
    where: {
      token: sessionToken,
      expiryTimestamp: { gt: new Date() },
    },
    select: {
      id: true,
      token: true,
      userId: true,
    },
  });
  return session;
}

export async function createSessionInsecure(
  token: Session['token'],
  userId: User['id'],
) {
  const session = await prisma.session.create({
    data: {
      token: token,
      userId: userId,
    },
    select: {
      id: true,
      userId: true,
      token: true,
    },
  });

  await prisma.session.deleteMany({
    where: {
      expiryTimestamp: { lt: new Date() },
    },
  });

  return session;
}

export async function deleteSession(sessionToken: Session['token']) {
  const session = await prisma.session.delete({
    where: {
      token: sessionToken,
    },
    select: {
      userId: true,
    },
  });
  return session;
}
