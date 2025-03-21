import { prisma } from '@/lib/prisma';
import type { LocationObject } from '@/types/types';
import {
  type Experience,
  type Prisma,
  type Session,
  type User,
} from '@prisma/client';
import { DateTime } from 'luxon';
import { getUserBySessionToken } from './users';

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

export async function getTotalAmountOfExperiencesByTextInsecure(
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

export async function createExperience(
  sessionToken: Session['token'],
  newExperience: Omit<Experience, 'id' | 'userId' | 'createdAt' | 'location'>,
  location: LocationObject | undefined,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const experience = await prisma.experience.create({
    data: {
      title: newExperience.title,
      story: newExperience.story,
      date: newExperience.date,
      rating: newExperience.rating,
      challengeId: newExperience.challengeId,
      imageUrl: newExperience.imageUrl,
      userId: user.id,
      location: location
        ? {
            name: location.name,
            lat: location.lat,
            lon: location.lon,
          }
        : undefined,
    },
  });
  return experience;
}

export async function selectExperienceExists(experienceId: Experience['id']) {
  const experience = await prisma.experience.count({
    where: {
      id: experienceId,
    },
  });
  return experience > 0;
}

export async function getExperienceForEdit(
  sessionToken: Session['token'],
  experienceId: Experience['id'],
) {
  const experience = await prisma.experience.findUnique({
    where: {
      id: experienceId,
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
    include: {
      comments: true,
    },
  });

  return experience;
}

export async function updateExperience(
  sessionToken: Session['token'],
  updatedExperience: Omit<
    Experience,
    'userId' | 'createdAt' | 'location' | 'challengeId'
  >,
  location: LocationObject | undefined,
) {
  console.log('Hi from database', location?.name);
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const experience = await prisma.experience.update({
    where: {
      id: updatedExperience.id,
    },
    data: {
      title: updatedExperience.title,
      story: updatedExperience.story,
      date: updatedExperience.date,
      rating: updatedExperience.rating,
      imageUrl: updatedExperience.imageUrl,
      location: location
        ? {
            name: location.name,
            lat: location.lat,
            lon: location.lon,
          }
        : undefined,
    },
  });
  return experience;
}

export async function getExperienceInsecure(experienceId: Experience['id']) {
  const experience = await prisma.experience.findUnique({
    where: {
      id: experienceId,
    },
    include: {
      challenge: true,
      likes: true,
      comments: {
        include: {
          user: {
            include: {
              experiences: true,
            },
          },
        },
      },
      user: { include: { experiences: true } },
    },
  });
  return experience;
}

export async function deleteExperience(
  experienceId: string,
  sessionToken: Session['token'],
) {
  const experience = await prisma.experience.delete({
    where: {
      id: experienceId,
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
  return experience;
}
