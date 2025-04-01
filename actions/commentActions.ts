'use server';

import {
  createComment,
  deleteComment,
  updateComment,
} from '@/database/comments';
import type { CommentActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { commentSchema } from '@/util/schemas';
import { Knock } from '@knocklabs/node';
import { revalidatePath } from 'next/cache';

const knock = new Knock(process.env.KNOCK_API_SECRET);

export async function createCommentAction(
  prevState: any,
  formData: FormData,
): Promise<CommentActionState> {
  // Validate form data
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

  // Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }

  // Create the comment
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

    // Send a notification to the user
    await knock.workflows.trigger('experience-commented', {
      data: {
        name: newComment.user?.username,
        value: newComment.experience.title,
      },
      recipients: [
        {
          id: newComment.experience.userId,
        },
      ],
    });
    revalidatePath(`/main/experiences/${validatedFields.data.experienceId}`);
    return { success: true };
  } catch (error) {
    console.log(error);
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
  // Validate form data
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

  // Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }

  // Update the comment
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
  // Validate form data
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

  // Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }

  // Delete the comment
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
