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
  });
  return comment;
}
