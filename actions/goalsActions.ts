'use server';

import { createGoal, deleteGoal, updateGoal } from '@/database/goals';
import type { CreateGoalActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { goalSchema } from '@/util/schemas';
import { redirect } from 'next/navigation';

export async function createGoalAction(
  prevState: any,
  formData: FormData,
): Promise<CreateGoalActionState> {
  // 1. Formdaten validieren
  const validatedFields = goalSchema.safeParse({
    title: formData.get('title'),
    deadline: formData.get('deadline'),
    additionalNotes: formData.get('additionalNotes'),
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

  // 4. Create the goal

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  // Testen, ob es auch ohne try...catch geht!
  const newGoal = await createGoal(sessionToken, {
    title: validatedFields.data.title,
    deadline: new Date(validatedFields.data.deadline),
    additionalNotes: validatedFields.data.additionalNotes || '',
  });

  if (!newGoal) {
    return {
      error: { general: 'Failed to create goal' },
    };
  }

  redirect('/main/goals');
}

export async function updateGoalAction(
  goalId: string,
  prevState: any,
  formData: FormData,
): Promise<CreateGoalActionState> {
  // 1. Formdaten validieren
  const validatedFields = goalSchema.safeParse({
    title: formData.get('title'),
    deadline: formData.get('deadline'),
    additionalNotes: formData.get('additionalNotes'),
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

  // 4. Create the goal

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  // Testen, ob es auch ohne try...catch geht!
  const updatedGoal = await updateGoal(goalId, sessionToken, {
    title: validatedFields.data.title,
    deadline: new Date(validatedFields.data.deadline),
    additionalNotes: validatedFields.data.additionalNotes || '',
  });

  if (!updatedGoal) {
    return {
      error: { general: 'Failed to update goal' },
    };
  }

  redirect('/main/goals');
}

export async function deleteGoalAction(
  goalId: string,
  prevState: any,
  formData: FormData,
): Promise<CreateGoalActionState> {
  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create the goal

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  // Testen, ob es auch ohne try...catch geht!
  const deletedGoal = await deleteGoal(goalId, sessionToken);

  if (!Boolean(deletedGoal)) {
    return {
      error: { general: 'Failed to delete goal' },
    };
  }

  redirect('/main/goals');
}
