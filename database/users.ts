import { prisma } from '@/lib/prisma';
import { Prisma, type Session, type User } from '@prisma/client';

export async function getNewestUsersInsecure() {
  const users = await prisma.user.findMany({
    orderBy: [{ memberSince: 'desc' }],
    take: 10,
  });
  return users;
}

export async function getUserBySessionToken(sessionToken: Session['token']) {
  const user = await prisma.session.findUnique({
    where: {
      token: sessionToken,
      expiryTimestamp: {
        gt: new Date(),
      },
    },
    select: {
      user: true,
    },
  });
  return user?.user;
}

export async function getUserByEmailInsecure(email: User['email']) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
}

export async function getUserByUsernameInsecure(username: User['username']) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
}

export async function getUserWithPasswordHashInsecure(
  username: User['username'],
) {
  const user = await prisma.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
  });
  return user;
}

export async function createUserInsecure(
  username: User['username'],
  email: User['email'],
  passwordHash: User['passwordHash'],
) {
  const user = await prisma.user.create({
    data: {
      username: username.toLowerCase(),
      email: email,
      passwordHash: passwordHash,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
}

export type UserWithExperiences = Prisma.UserGetPayload<{
  include: { experiences: true };
}>;

export async function getUsersByTextInsecure(
  text: string,
  page: number,
  pageSize: number,
) {
  if (text) {
    const users = await prisma.user.findMany({
      where: {
        username: { contains: text, mode: 'insensitive' },
      },
      include: {
        experiences: true,
      },
      orderBy: [{ memberSince: 'desc' }],
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return users;
  }
}

export async function getTotalAmountOfUsersByTextInsecure(text: string) {
  if (text) {
    const count = await prisma.user.count({
      where: {
        username: { contains: text, mode: 'insensitive' },
      },
    });
    return count;
  }
}

export async function getUserByIdInsecure(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      experiences: {
        include: { challenge: true },
      },
    },
  });
  return user;
}
