'use server';

import { createGoal } from '@/database/goals';
import type { CreateGoalActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { goalSchema } from '@/util/schemas';
import { redirect } from 'next/navigation';

export async function createGoalAction(
  prevState: any,
  formData: FormData,
): Promise<CreateGoalActionState> {
  // 1. Formdaten validieren
  console.log('SA title', formData.get('title'));
  console.log('SA deadline', formData.get('deadline'));
  console.log('SA additional', formData.get('additional'));

  const validatedFields = goalSchema.safeParse({
    title: formData.get('title'),
    deadline: formData.get('deadline'),
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
  });

  if (!newGoal) {
    return {
      error: { general: 'Failed to create goal' },
    };
  }

  redirect('/main/goals');
}
