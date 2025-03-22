'use server';

import {
  createComment,
  deleteComment,
  updateComment,
} from '@/database/comments';
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

export async function updateCommentAction(
  prevState: any,
  formData: FormData,
): Promise<CommentActionState> {
  // 1. Formdaten validieren
  const validatedFields = commentSchema.omit({ experienceId: true }).safeParse({
    id: formData.get('id'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Update the comment

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }
  try {
    const updatedComment = await updateComment(sessionToken, {
      content: validatedFields.data.content,
      id: validatedFields.data.id,
    });

    if (!updatedComment) {
      return {
        error: { general: 'Comment update returned no data' },
      };
    }
    revalidatePath(`/main/experiences/${updatedComment.experienceId}`);
    return {
      comment: updatedComment,
    };
  } catch {
    return {
      error: { general: 'Failed to update comment' },
    };
  }
}

export async function deleteCommentAction(
  prevState: any,
  formData: FormData,
): Promise<CommentActionState> {
  const validatedFields = commentSchema
    .pick({ id: true, experienceId: true })
    .safeParse({
      id: formData.get('id'),
      experienceId: formData.get('id'),
    });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Delete the experience

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    const deletedComment = await deleteComment(
      validatedFields.data.id,
      sessionToken,
    );
    revalidatePath(`/main/experiences/${validatedFields.data.experienceId}`);
    return {
      comment: deletedComment,
    };
  } catch (error) {
    console.log('Error deleting comment:', error);
    return {
      error: { general: 'Failed to delete comment' },
    };
  }
}
