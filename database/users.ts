import { prisma } from '@/lib/prisma';

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
