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
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create the comment

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    const newComment = await createComment(sessionToken, {
      content: validatedFields.data.content,
      experienceId: validatedFields.data.experienceId,
    });
    if (!newComment) {
      return {
        success: false,
        error: { general: 'Comment creation returned no data' },
      };
    }
    revalidatePath(`/main/experiences/${validatedFields.data.experienceId}`);
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to create comment' },
    };
  }
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
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Update the comment

  if (!sessionToken) {
    return {
      success: false,
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
        success: false,
        error: { general: 'Comment update returned no data' },
      };
    }
    revalidatePath(`/main/experiences/${updatedComment.experienceId}`);
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to update comment' },
    };
  }
}

export async function deleteCommentAction(
  prevState: any,
  formData: FormData,
): Promise<CommentActionState> {
  const validatedFields = commentSchema
    .pick({
      id: true,
    })
    .safeParse({
      id: formData.get('id'),
    });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Delete the comment

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    const deletedComment = await deleteComment(
      validatedFields.data.id,
      sessionToken,
    );
    revalidatePath(`/main/experiences/${deletedComment.experienceId}`);
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to delete comment' },
    };
  }
}
