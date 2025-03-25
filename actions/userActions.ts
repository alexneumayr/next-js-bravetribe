'use server';

import {
  createComment,
  deleteComment,
  updateComment,
} from '@/database/comments';
import {
  deleteUser,
  getUserBySessionToken,
  updateUser,
} from '@/database/users';
import type { CommentActionState, UserActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import {
  changeUserPasswordSchema,
  commentSchema,
  deleteUserSchema,
  userSchema,
} from '@/util/schemas';
import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUserAction(
  prevState: any,
  formData: FormData,
): Promise<UserActionState> {
  // 1. Formdaten validieren
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
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Update the user

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    const updatedUser = await updateUser(sessionToken, {
      id: validatedFields.data.id,
      username: validatedFields.data.username,
      email: validatedFields.data.email,
      aboutDescription: validatedFields.data.aboutDescription,
      gender: validatedFields.data.gender,
      location: validatedFields.data.location,
      avatarImageUrl: validatedFields.data.avatarImageUrl,
    });

    if (!updatedUser) {
      return {
        error: { general: 'User update returned no data' },
      };
    }
    revalidatePath('/main/settings');
    return {
      user: updatedUser,
    };
  } catch {
    return {
      error: { general: 'Failed to update comment' },
    };
  }
}

export async function updateUserPasswordAction(
  prevState: any,
  formData: FormData,
): Promise<UserActionState> {
  // 1. Formdaten validieren
  const validatedFields = changeUserPasswordSchema.safeParse({
    id: formData.get('id'),
    currentPassword: formData.get('current-password'),
    newPassword: formData.get('new-password'),
    confirmPassword: formData.get('confirm-password'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  const user = sessionToken && (await getUserBySessionToken(sessionToken));

  if (!user) {
    return {
      error: { general: 'Failed to get data of the current user' },
    };
  }
  // Validate the user password by comparing with hashed password
  const isPasswordValid = await bcrypt.compare(
    validatedFields.data.currentPassword,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    return { error: { general: 'Current Password is invalid' } };
  }

  const passwordHash = await bcrypt.hash(validatedFields.data.newPassword, 12);

  try {
    const updatedUser = await updateUser(sessionToken, {
      id: validatedFields.data.id,
      passwordHash: passwordHash,
    });

    if (!updatedUser) {
      return {
        error: { general: 'Password update returned no data' },
      };
    }
    revalidatePath('/main/settings');
    return {
      user: updatedUser,
    };
  } catch {
    return {
      error: { general: 'Failed to update password' },
    };
  }
}

export async function toggleAreExperiencesPublicAction(
  prevState: any,
  user: Pick<User, 'id' | 'areExperiencesPublic'>,
): Promise<UserActionState> {
  const validatedFields = userSchema.safeParse({
    id: user.id,
    areExperiencesPublic: user.areExperiencesPublic,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');
  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    const updatedUser = await updateUser(sessionToken, {
      id: validatedFields.data.id,
      areExperiencesPublic: user.areExperiencesPublic,
    });

    if (!updatedUser) {
      return {
        error: { general: 'Experience update returned no data' },
      };
    }

    revalidatePath('/main/settings');
    return {
      user: updatedUser,
    };
  } catch {
    return {
      error: { general: 'Failed to update password' },
    };
  }
}

export async function deleteUserActions(
  prevState: any,
  formData: FormData,
): Promise<UserActionState> {
  const validatedFields = deleteUserSchema.safeParse({
    deleteConfirmation: formData.get('delete-confirmation'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Delete the user

  if (!sessionToken) {
    return {
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    const deletedUser = await deleteUser(validatedFields.data.id, sessionToken);
    revalidatePath('/main/settings');
    return {
      user: deletedUser,
    };
  } catch (error) {
    console.log('Error deleting user:', error);
    return {
      error: { general: 'Failed to delete user' },
    };
  }
}
