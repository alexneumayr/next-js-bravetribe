'use server';

import {
  createExperience,
  deleteExperience,
  updateExperience,
} from '@/database/experiences';
import type { ExperienceActionState, LocationObject } from '@/types/types';
import { getCookie } from '@/util/cookies';
import { experienceSchema } from '@/util/schemas';
import { revalidatePath } from 'next/cache';

export async function createExperienceAction(
  location: LocationObject | undefined,
  prevState: any,
  formData: FormData,
): Promise<ExperienceActionState> {
  // Validate form data
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

  // Create the experience
  try {
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
        success: false,
        error: { general: 'Experience creation returned no data' },
      };
    }
    revalidatePath(`/main/challenges/${validatedFields.data.challengeId}`);
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to create experience' },
    };
  }
}

export async function updateExperienceAction(
  location: LocationObject | undefined,
  prevState: any,
  formData: FormData,
): Promise<ExperienceActionState> {
  // Validate form data
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

  // Update the experience
  try {
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
        success: false,
        error: { general: 'Experience update returned no data' },
      };
    }
    revalidatePath(`/main/experiences/${updatedExperience.id}`);
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to update experience' },
    };
  }
}

export async function deleteExperienceAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<ExperienceActionState> {
  // Validate form data
  const validatedFields = experienceSchema.pick({ id: true }).safeParse({
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

  // Delete the experience
  try {
    await deleteExperience(validatedFields.data.id, sessionToken);
    revalidatePath(currentPath);
    return { success: true };
  } catch (error) {
    console.log('Error deleting experience:', error);
    return {
      success: false,
      error: { general: 'Failed to delete experience' },
    };
  }
}
