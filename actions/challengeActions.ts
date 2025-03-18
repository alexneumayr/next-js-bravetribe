'use server';

import {
  createChallenge,
  deleteChallenge,
  updateChallenge,
} from '@/database/challenges';
import type { ChallengeActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { challengeSchema } from '@/util/schemas';
import { redirect } from 'next/navigation';

export async function createChallengeAction(
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  // 1. Formdaten validieren
  const validatedFields = challengeSchema
    .omit({ id: true, isCompleted: true })
    .safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      plannedDate: formData.get('plannedDate'),
    });

  if (!validatedFields.success) {
    console.log('Validation unsuccessful');
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log('Validation successful');

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create the challenge

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  // Testen, ob es auch ohne try...catch geht!
  const newChallenge = await createChallenge(sessionToken, {
    title: validatedFields.data.title,
    description: validatedFields.data.description,
    plannedDate: new Date(validatedFields.data.plannedDate),
  });

  if (!newChallenge) {
    return {
      error: { general: 'Failed to create challenge' },
    };
  }

  redirect('/main/challenges');
}

export async function updateChallengeAction(
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  // 1. Formdaten validieren
  const validatedFields = challengeSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    plannedDate: formData.get('plannedDate'),
    isCompleted: formData.get('isCompleted'),
  });

  if (!validatedFields.success) {
    console.log('Validation unsuccessful');
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log('Validation successful');

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Update the challenge

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  // Testen, ob es auch ohne try...catch geht!
  const updatedChallenge = await updateChallenge(sessionToken, {
    id: validatedFields.data.id,
    title: validatedFields.data.title,
    description: validatedFields.data.description,
    plannedDate: new Date(validatedFields.data.plannedDate),
    isCompleted: validatedFields.data.isCompleted,
  });

  if (!updatedChallenge) {
    return {
      error: { general: 'Failed to update challenge' },
    };
  }

  redirect('/main/challenges');
}

export async function deleteChallengeAction(
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  const validatedFields = challengeSchema.pick({ id: true }).safeParse({
    id: formData.get('id'),
  });

  if (!validatedFields.success) {
    console.log('Validation unsuccessful');
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log('Validation successful');

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Delete the challenge

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  // Testen, ob es auch ohne try...catch geht!
  const deletedChallenge = await deleteChallenge(
    validatedFields.data.id,
    sessionToken,
  );

  if (!Boolean(deletedChallenge)) {
    return {
      error: { general: 'Failed to delete goal' },
    };
  }

  redirect('/main/challenges');
}
