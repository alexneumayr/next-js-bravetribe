import { prisma } from '@/lib/prisma';
import type { Comment, Session } from '@prisma/client';
import { getUserBySessionToken } from './users';

export async function createComment(
  sessionToken: Session['token'],
  newComment: Omit<Comment, 'id' | 'userId' | 'createdAt'>,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const comment = await prisma.comment.create({
    data: {
      content: newComment.content,
      experienceId: newComment.experienceId,
      userId: user.id,
    },
    include: {
      experience: {
        select: {
          title: true,
          userId: true,
        },
      },
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return comment;
}

export async function updateComment(
  sessionToken: Session['token'],
  updatedComment: Omit<Comment, 'userId' | 'createdAt' | 'experienceId'>,
) {
  const user = await getUserBySessionToken(sessionToken);
  if (!user) {
    return null;
  }
  const comment = await prisma.comment.update({
    where: {
      id: updatedComment.id,
    },
    data: {
      content: updatedComment.content,
    },
  });
  return comment;
}

export async function deleteComment(
  commentId: string,
  sessionToken: Session['token'],
) {
  const comment = await prisma.comment.delete({
    where: {
      id: commentId,
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
  return comment;
}
