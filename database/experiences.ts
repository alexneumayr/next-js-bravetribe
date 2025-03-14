import { prisma } from '@/lib/prisma';
import { type Prisma, type User } from '@prisma/client';
import { DateTime } from 'luxon';

export async function getNewestExperiencesInsecure() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ createdAt: 'desc' }],
    take: 10,
    include: {
      challenge: true,
      likes: true,
      comments: true,
      user: { include: { experiences: true } },
    },
  });
  return experiences;
}

export type ExperienceWithAdditionalDetails = Prisma.ExperienceGetPayload<{
  include: {
    challenge: true;
    user: {
      include: { experiences: true };
    };
    comments: true;
    likes: true;
  };
}>;

export async function getExperiencesByTextInsecure(
  text: string,
  page: number,
  pageSize: number,
  fromExperiences?: boolean,
  userId?: User['id'],
) {
  if (text || fromExperiences) {
    const experiences = await prisma.experience.findMany({
      where: {
        OR: [
          {
            title: { contains: text, mode: 'insensitive' },
          },
          {
            story: { contains: text, mode: 'insensitive' },
          },
          {
            challenge: {
              user: {
                username: { contains: text, mode: 'insensitive' },
              },
            },
          },
        ],
        userId: userId,
      },
      orderBy: [{ createdAt: 'desc' }],
      include: {
        challenge: true,
        likes: true,
        comments: true,
        user: { include: { experiences: true } },
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return experiences;
  }
}

export async function getAmountOfExperiencesByTextInsecure(
  text: string,
  fromExperiences?: boolean,
  userId?: User['id'],
) {
  if (text || fromExperiences) {
    const count = await prisma.experience.count({
      where: {
        OR: [
          {
            title: { contains: text, mode: 'insensitive' },
          },
          {
            story: { contains: text, mode: 'insensitive' },
          },
          {
            challenge: {
              user: {
                username: { contains: text, mode: 'insensitive' },
              },
            },
          },
        ],
        userId: userId,
      },
    });

    return count;
  }
}

export async function getExperiencesFromLast12MonthsByUserIdInsecure(
  id: User['id'],
) {
  const experiences = await prisma.experience.findMany({
    where: {
      userId: id,
      date: {
        gte: DateTime.now()
          .endOf('month')
          .plus({ day: 1 })
          .minus({ months: 12 })
          .toISO(),
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
  return experiences;
}

export async function getNewestExperiencesByUserInsecure(id: User['id']) {
  const experiences = await prisma.experience.findMany({
    where: {
      userId: id,
    },
    orderBy: [{ createdAt: 'desc' }],
    take: 10,
    include: {
      challenge: true,
      likes: true,
      comments: true,
      user: { include: { experiences: true } },
    },
  });
  return experiences;
}
