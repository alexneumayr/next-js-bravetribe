import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

export async function getNewestExperiencesInsecure() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ created_at: 'desc' }],
    take: 10,
    include: {
      Challenge: true,
      likes: true,
      comments: true,
      User: { include: { experiences: true } },
    },
  });
  return experiences;
}

export type ExperienceWithAdditionalDetails = Prisma.ExperienceGetPayload<{
  include: {
    Challenge: true;
    User: {
      include: { experiences: true };
    };
    comments: true;
    likes: true;
  };
}>;

export async function getExperiencesByTextInsecure(text: string) {
  if (text) {
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
            Challenge: {
              User: {
                username: { contains: text, mode: 'insensitive' },
              },
            },
          },
        ],
      },
      orderBy: [{ created_at: 'desc' }],
      include: {
        Challenge: true,
        likes: true,
        comments: true,
        User: { include: { experiences: true } },
      },
    });
    return experiences;
  }
}

export async function getExperiencesFromLast12MonthsByUserIdInsecure(
  id: string,
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

export async function getNewestExperiencesByUserInsecure(id: string) {
  const experiences = await prisma.experience.findMany({
    where: {
      userId: id,
    },
    orderBy: [{ created_at: 'desc' }],
    take: 10,
    include: {
      Challenge: true,
      likes: true,
      comments: true,
      User: { include: { experiences: true } },
    },
  });
  return experiences;
}
