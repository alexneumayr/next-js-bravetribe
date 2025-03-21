'use server';

import {
  createExperience,
  deleteExperience,
  updateExperience,
} from '@/database/experiences';
import type { ChallengeActionState, LocationObject } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { experienceSchema } from '@/util/schemas';
import { redirect } from 'next/navigation';

export async function createExperienceAction(
  location: LocationObject | undefined,
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  // 1. Formdaten validieren
  const validatedFields = experienceSchema.omit({ id: true }).safeParse({
    title: formData.get('title'),
    story: formData.get('story'),
    date: formData.get('date'),
    rating: formData.get('rating'),
    imageUrl: formData.get('imageUrl'),
    location: location,
    challengeId: formData.get('challengeId'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create the challenge

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  // Testen, ob es auch ohne try...catch geht!
  const newExperience = await createExperience(
    sessionToken,
    {
      title: validatedFields.data.title,
      story: validatedFields.data.story,
      date: new Date(validatedFields.data.date),
      rating: validatedFields.data.rating,
      imageUrl: validatedFields.data.imageUrl || null,
      challengeId: validatedFields.data.challengeId,
    },
    validatedFields.data.location,
  );

  if (!newExperience) {
    return {
      error: { general: 'Failed to create experience' },
    };
  }

  redirect(`/main/challenges/${validatedFields.data.challengeId}`);
}

export async function updateExperienceAction(
  location: LocationObject | undefined,
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  // 1. Formdaten validieren
  const validatedFields = experienceSchema
    .omit({ challengeId: true })
    .safeParse({
      title: formData.get('title'),
      story: formData.get('story'),
      date: formData.get('date'),
      rating: formData.get('rating'),
      id: formData.get('id'),
      imageUrl: formData.get('imageUrl'),
      location: location,
    });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Update the challenge

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }
  console.log('dd');
  const updatedExperience = await updateExperience(
    sessionToken,
    {
      title: validatedFields.data.title,
      story: validatedFields.data.story,
      date: new Date(validatedFields.data.date),
      rating: validatedFields.data.rating,
      imageUrl: validatedFields.data.imageUrl || null,
      id: validatedFields.data.id,
    },
    validatedFields.data.location,
  );

  if (!updatedExperience) {
    return {
      error: { general: 'Failed to create experience' },
    };
  }

  redirect(`/main/experiences/${updatedExperience.id}`);
}

export async function deleteExperienceAction(
  prevState: any,
  formData: FormData,
): Promise<ChallengeActionState> {
  const validatedFields = experienceSchema.pick({ id: true }).safeParse({
    id: formData.get('id'),
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
    await deleteExperience(validatedFields.data.id, sessionToken);
  } catch (error) {
    console.log('Error deleting experience:', error);
    return {
      error: { general: 'Failed to delete experience' },
    };
  }
  redirect('/main/experiences');
}
