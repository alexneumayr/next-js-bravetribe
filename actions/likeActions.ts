'use server';

import { createLike, deleteLike } from '@/database/likes';
import type { LikeActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { likeSchema } from '@/util/schemas';
import { revalidatePath } from 'next/cache';

export async function createLikeAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<LikeActionState> {
  // 1. Formdaten validieren
  const validatedFields = likeSchema.pick({ experienceId: true }).safeParse({
    experienceId: formData.get('experienceId'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create the like

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }
  try {
    const newLike = await createLike(sessionToken, {
      experienceId: validatedFields.data.experienceId,
    });

    if (!newLike) {
      return {
        error: { general: 'Like creation returned no data' },
      };
    }
    revalidatePath(currentPath);
    return {
      like: newLike,
    };
  } catch {
    return {
      error: { general: 'Failed to update comment' },
    };
  }
}

export async function deleteLikeAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<LikeActionState> {
  const validatedFields = likeSchema.pick({ id: true }).safeParse({
    id: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Delete the like

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    const deletedLike = await deleteLike(validatedFields.data.id, sessionToken);
    revalidatePath(currentPath);
    return {
      like: deletedLike,
    };
  } catch (error) {
    console.log('Error deleting comment:', error);
    return {
      error: { general: 'Failed to delete comment' },
    };
  }
}
