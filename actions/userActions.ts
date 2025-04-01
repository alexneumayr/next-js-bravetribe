'use server';

import {
  deleteUser,
  getUserBySessionToken,
  updateUser,
} from '@/database/users';
import type { UserActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import {
  changeUserPasswordSchema,
  deleteUserSchema,
  userSchema,
} from '@/util/schemas';
import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

export async function updateUserAction(
  prevState: any,
  formData: FormData,
): Promise<UserActionState> {
  // Validate form data
  const validatedFields = userSchema.safeParse({
    id: formData.get('id'),
    username: formData.get('username'),
    email: formData.get('email'),
    aboutDescription: formData.get('about-description'),
    gender: formData.get('gender'),
    location: formData.get('location'),
    avatarImageUrl: formData.get('avatarImageUrl'),
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

  // Update the user
  try {
    await updateUser(sessionToken, {
      id: validatedFields.data.id,
      username: validatedFields.data.username || '',
      email: validatedFields.data.email || '',
      aboutDescription: validatedFields.data.aboutDescription || null,
      gender: validatedFields.data.gender || null,
      location: validatedFields.data.location || null,
      avatarImageUrl: validatedFields.data.avatarImageUrl || null,
    });

    revalidatePath('/main/settings');
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to update comment' },
    };
  }
}

export async function updateUserPasswordAction(
  prevState: any,
  formData: FormData,
): Promise<UserActionState> {
  // Validate form data
  const validatedFields = changeUserPasswordSchema.safeParse({
    id: formData.get('id'),
    currentPassword: formData.get('current-password'),
    newPassword: formData.get('new-password'),
    confirmPassword: formData.get('confirm-password'),
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

  // Get current user data
  const user = sessionToken && (await getUserBySessionToken(sessionToken));

  if (!user) {
    return {
      success: false,
      error: { general: 'Failed to get data of the current user' },
    };
  }
  // Validate the user password by comparing with hashed password
  const isPasswordValid = await bcrypt.compare(
    validatedFields.data.currentPassword,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    return {
      success: false,
      error: { general: 'Current Password is invalid' },
    };
  }

  // Hash the new password
  const passwordHash = await bcrypt.hash(validatedFields.data.newPassword, 12);

  // Update user data
  try {
    await updateUser(sessionToken, {
      id: validatedFields.data.id,
      passwordHash: passwordHash,
    });
    revalidatePath('/main/settings');
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to update password' },
    };
  }
}

export async function toggleAreExperiencesPublicAction(
  prevState: any,
  user: Pick<User, 'id' | 'areExperiencesPublic'>,
): Promise<UserActionState> {
  // Validate form data
  const validatedFields = userSchema.safeParse({
    id: user.id,
    areExperiencesPublic: user.areExperiencesPublic,
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

  // Update user data
  try {
    await updateUser(sessionToken, {
      id: validatedFields.data.id,
      areExperiencesPublic: user.areExperiencesPublic,
    });

    revalidatePath('/main/settings');
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to update password' },
    };
  }
}

export async function deleteUserAction(
  prevState: any,
  formData: FormData,
): Promise<UserActionState> {
  // Validate form data
  const validatedFields = deleteUserSchema.safeParse({
    id: formData.get('id'),
    deleteConfirmation: formData.get('delete-confirmation'),
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

  // Delete the user
  try {
    await deleteUser(validatedFields.data.id, sessionToken);
    revalidatePath('/main/settings');
    return {
      success: true,
    };
  } catch (error) {
    console.log('Error deleting user:', error);
    return {
      success: false,
      error: { general: 'Failed to delete user' },
    };
  }
}
