import { prisma } from '@/lib/prisma';

export async function getValidSessionToken(sessionToken: string) {
  const session = await prisma.session.findUnique({
    where: {
      token: sessionToken,
      expiryTimestamp: { gt: new Date() },
    },
    select: {
      id: true,
      userId: true,
      token: true,
    },
  });
  return session;
}

export async function createSessionInsecure(token: string, userId: string) {
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

export async function deleteSession(sessionToken: string) {
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
