'use server';

import { createComment } from '@/database/comments';
import type { CommentActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { commentSchema } from '@/util/schemas';
import { revalidatePath } from 'next/cache';

export async function createCommentAction(
  prevState: any,
  formData: FormData,
): Promise<CommentActionState> {
  // 1. Formdaten validieren
  const validatedFields = commentSchema.omit({ id: true }).safeParse({
    content: formData.get('content'),
    experienceId: formData.get('experienceId'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create the comment

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  // Testen, ob es auch ohne try...catch geht!
  const newComment = await createComment(sessionToken, {
    content: validatedFields.data.content,
    experienceId: validatedFields.data.experienceId,
  });

  if (!newComment) {
    return {
      error: { general: 'Failed to create comment' },
    };
  }

  revalidatePath(`/main/experiences/${validatedFields.data.experienceId}`);

  return {
    comment: newComment,
  };
}
