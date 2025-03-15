'use server';

import { createGoal } from '@/database/goals';
import type { CreateGoalActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { goalSchema } from '@/util/schemas';

export async function createGoalAction(
  prevState: any,
  formData: FormData,
): Promise<CreateGoalActionState> {
  // 1. Formdaten validieren
  const validatedFields = goalSchema.safeParse({
    title: formData.get('title'),
    additionalNotes: formData.get('additionalNotes'),
    deadline: formData.get('deadline'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

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
    additionalNotes: validatedFields.data.additionalNotes,
  });

  if (!newGoal) {
    return {
      error: { general: 'Failed to create goal' },
    };
  }

  return {
    goal: {
      title: newGoal.title,
      additionalNotes: newGoal.additionalNotes,
      deadline: newGoal.deadline,
    },
  };
}
