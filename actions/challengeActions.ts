'use server';

import {
  createChallenge,
  deleteChallenge,
  updateChallenge,
  updateChallengeStatus,
} from '@/database/challenges';
import type { ChallengeActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { challengeSchema } from '@/util/schemas';
import { revalidatePath } from 'next/cache';

export async function createChallengeAction(
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  // Validate the form data
  const validatedFields = challengeSchema
    .omit({ id: true, isCompleted: true })
    .safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      plannedDate: formData.get('plannedDate'),
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

  //  Create the challenge
  try {
    const newChallenge = await createChallenge(sessionToken, {
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      plannedDate: new Date(validatedFields.data.plannedDate),
    });
    if (!newChallenge) {
      return {
        success: false,
        error: {
          general: 'Challenge creation returned no data',
        },
      };
    }

    revalidatePath('/main/challenges');
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to create challenge' },
    };
  }
}

export async function updateChallengeAction(
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  // Validate form data
  const validatedFields = challengeSchema
    .omit({ isCompleted: true })
    .safeParse({
      id: formData.get('id'),
      title: formData.get('title'),
      description: formData.get('description'),
      plannedDate: formData.get('plannedDate'),
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

  // Update the challenge
  try {
    const updatedChallenge = await updateChallenge(sessionToken, {
      id: validatedFields.data.id,
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      plannedDate: new Date(validatedFields.data.plannedDate),
    });

    if (!updatedChallenge) {
      return {
        success: false,
        error: { general: 'Challenge update returned no data' },
      };
    }
    revalidatePath(`/main/challenges/${validatedFields.data.id}`);
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to update challenge' },
    };
  }
}

export async function updateChallengeStatusAction(
  isCompleted: boolean,
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  // Validate form data
  const validatedFields = challengeSchema.pick({ id: true }).safeParse({
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

  // Update the challenge
  try {
    const updatedChallenge = await updateChallengeStatus(sessionToken, {
      id: validatedFields.data.id,
      isCompleted: isCompleted,
    });

    if (!updatedChallenge) {
      return {
        success: false,
        error: { general: 'Challenge update returned no data' },
      };
    }

    revalidatePath(`/main/challenges/${validatedFields.data.id}`);
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to update challenge' },
    };
  }
}

export async function deleteChallengeAction(
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  // Validate form data
  const validatedFields = challengeSchema.pick({ id: true }).safeParse({
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

  // Delete the challenge
  try {
    await deleteChallenge(validatedFields.data.id, sessionToken);
    revalidatePath('/main/challenges');
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to delete challenge' },
    };
  }
}
