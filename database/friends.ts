import { prisma } from '@/lib/prisma';
import type { Session, User } from '@prisma/client';

export async function getFriendsInsecure(
  userId: User['id'],
  page: number,
  pageSize: number,
) {
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
      receiverUser: {
        include: {
          experiences: true,
        },
      },
      requesterUser: {
        include: {
          experiences: true,
        },
      },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  return friends;
}

export async function getFriends(
  sessionToken: Session['token'],
  page: number,
  pageSize: number,
) {
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
    include: {
      receiverUser: {
        include: {
          experiences: true,
        },
      },
      requesterUser: {
        include: {
          experiences: true,
        },
      },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  return friends;
}

export async function getTotalFriendsCount(sessionToken: Session['token']) {
  const friends = await prisma.friend.count({
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
  });
  return friends;
}

export async function getReceivedFriendRequests(
  sessionToken: Session['token'],
) {
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
          ],
        },
        {
          isAccepted: false,
        },
      ],
    },
    include: {
      requesterUser: {
        include: {
          experiences: true,
        },
      },
    },
  });
  return friends;
}
