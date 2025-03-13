import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function getNewestUsersInsecure() {
  const users = await prisma.user.findMany({
    orderBy: [{ memberSince: 'desc' }],
    take: 10,
  });
  return users;
}

export async function getUser(sessionToken: string) {
  const user = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      User: true,
    },
  });
  return user;
}

export async function getUserByEmailInsecure(email: string) {
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

export async function getUserByUsernameInsecure(username: string) {
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

export async function getUserWithPasswordHashInsecure(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
  });
  return user;
}

export async function createUserInsecure(
  username: string,
  email: string,
  passwordHash: string,
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

export async function getUsersByTextInsecure(text: string) {
  if (text) {
    const users = await prisma.user.findMany({
      where: {
        username: { contains: text, mode: 'insensitive' },
      },
      include: {
        experiences: true,
      },
      orderBy: [{ memberSince: 'desc' }],
    });
    return users;
  }
}
