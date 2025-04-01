'use server';

import { createLike, deleteLike } from '@/database/likes';
import type { LikeActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { likeSchema } from '@/util/schemas';
import { Knock } from '@knocklabs/node';
import { revalidatePath } from 'next/cache';

const knock = new Knock(process.env.KNOCK_API_SECRET);

export async function createLikeAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<LikeActionState> {
  // Validate form data
  const validatedFields = likeSchema.pick({ experienceId: true }).safeParse({
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
  // Create the like
  try {
    const newLike = await createLike(sessionToken, {
      experienceId: validatedFields.data.experienceId,
    });

    if (!newLike) {
      return {
        success: false,
        error: { general: 'Like creation returned no data' },
      };
    }
    // Send notification to the user
    await knock.workflows.trigger('experience-liked', {
      data: {
        name: newLike.user.username,
        value: newLike.experience.title,
      },
      recipients: [
        {
          id: newLike.experience.userId,
        },
      ],
    });
    revalidatePath(currentPath);
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to update comment' },
    };
  }
}

export async function deleteLikeAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<LikeActionState> {
  // Validate form data
  const validatedFields = likeSchema.pick({ id: true }).safeParse({
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

  // Delete the like
  try {
    await deleteLike(validatedFields.data.id, sessionToken);
    revalidatePath(currentPath);
    return { success: true };
  } catch (error) {
    console.log('Error deleting comment:', error);
    return {
      success: false,
      error: { general: 'Failed to delete comment' },
    };
  }
}
