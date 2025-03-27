import { prisma } from '@/lib/prisma';
import type { Friend, Session, User } from '@prisma/client';
import { getUserBySessionToken } from './users';

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
    orderBy: {
      updatedAt: 'desc',
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
    orderBy: {
      updatedAt: 'desc',
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
  return friends;
}

export async function getTotalFriendsCount(sessionToken: Session['token']) {
  const count = await prisma.friend.count({
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
  return count;
}

export async function alreadyFriendRequestExisting(
  sessionToken: Session['token'],
  friendId: User['id'],
) {
  const count = await prisma.friend.count({
    where: {
      AND: [
        {
          OR: [
            {
              AND: [
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
                  requesterUserId: friendId,
                },
              ],
            },
            {
              AND: [
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
                {
                  receiverUserId: friendId,
                },
              ],
            },
          ],
        },
      ],
    },
  });
  return count > 0;
}

export async function getReceivedFriendRequests(
  sessionToken: Session['token'],
) {
  const friendRequests = await prisma.friend.findMany({
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
  return friendRequests;
}

export async function createFriendRequest(
  sessionToken: Session['token'],
  receiverUserId: User['id'],
) {
  const currentUser = await getUserBySessionToken(sessionToken);
  if (!currentUser) {
    return null;
  }
  const newFriendRequest = await prisma.friend.create({
    data: {
      receiverUserId: receiverUserId,
      requesterUserId: currentUser.id,
    },
  });
  return newFriendRequest;
}

export async function confirmFriendRequest(
  sessionToken: Session['token'],
  requestId: Friend['id'],
) {
  const confirmedFriendRequest = await prisma.friend.update({
    where: {
      id: requestId,
      receiverUser: {
        sessions: {
          some: {
            token: sessionToken,
            expiryTimestamp: { gt: new Date() },
          },
        },
      },
    },
    data: {
      isAccepted: true,
    },
  });
  return confirmedFriendRequest;
}

export async function deleteReceivedFriendRequest(
  sessionToken: Session['token'],
  requestId: Friend['id'],
) {
  const deletedFriendRequest = await prisma.friend.delete({
    where: {
      id: requestId,
      receiverUser: {
        sessions: {
          some: {
            token: sessionToken,
            expiryTimestamp: { gt: new Date() },
          },
        },
      },
    },
  });
  return deletedFriendRequest;
}

export async function deleteSentFriendRequest(
  sessionToken: Session['token'],
  requestId: Friend['id'],
) {
  const deletedFriendRequest = await prisma.friend.delete({
    where: {
      id: requestId,
      requesterUser: {
        sessions: {
          some: {
            token: sessionToken,
            expiryTimestamp: { gt: new Date() },
          },
        },
      },
    },
  });
  return deletedFriendRequest;
}

export async function deleteFriend(
  sessionToken: Session['token'],
  friendUserId: User['id'],
) {
  const deletedFriend = await prisma.friend.deleteMany({
    where: {
      AND: [
        {
          OR: [
            {
              AND: [
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
                  requesterUserId: friendUserId,
                },
              ],
            },
            {
              AND: [
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
                {
                  receiverUserId: friendUserId,
                },
              ],
            },
          ],
        },
        {
          isAccepted: true,
        },
      ],
    },
  });
  return deletedFriend;
}
