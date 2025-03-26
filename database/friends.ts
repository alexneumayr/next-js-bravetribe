import { prisma } from '@/lib/prisma';
import type { Session, User } from '@prisma/client';

export async function getFriendsInsecure(userId: User['id']) {
  const friends = await prisma.friend.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              receiverUserId: userId,
            },
            {
              requesterUserId: userId,
            },
          ],
        },
        {
          isAccepted: true,
        },
      ],
    },
    include: {
      receiverUser: true,
      requesterUser: true,
    },
  });
  return friends;
}

export async function getFriends(sessionToken: Session['token']) {
  const friends = await prisma.friend.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              receiverUser: {
                sessions: {
                  some: {
                    token: sessionToken,
                    expiryTimestamp: { gt: new Date() },
                  },
                },
              },
            },
            {
              requesterUser: {
                sessions: {
                  some: {
                    token: sessionToken,
                    expiryTimestamp: { gt: new Date() },
                  },
                },
              },
            },
          ],
        },
        {
          isAccepted: true,
        },
      ],
    },
    orderBy: {
      acceptedAt: 'desc',
    },
    include: {
      receiverUser: true,
      requesterUser: true,
    },
  });
  return friends;
}
