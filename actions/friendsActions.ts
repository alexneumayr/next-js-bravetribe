'use server';

import {
  alreadyFriendRequestExisting,
  confirmFriendRequest,
  createFriendRequest,
  deleteFriend,
  deleteReceivedFriendRequest,
  deleteSentFriendRequest,
} from '@/database/friends';
import type { FriendActionState } from '@/types/types';
import { getCookie } from '@/util/cookies';
import {
  createFriendRequestSchema,
  deleteFriendSchema,
  manageFriendRequestSchema,
} from '@/util/schemas';
import { revalidatePath } from 'next/cache';

export async function createFriendRequestAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<FriendActionState> {
  // 1. Formdaten validieren
  const validatedFields = createFriendRequestSchema.safeParse({
    receiverUserId: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create the friend request

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }
  if (
    await alreadyFriendRequestExisting(
      sessionToken,
      validatedFields.data.receiverUserId,
    )
  ) {
    return {
      success: false,
      error: {
        general: 'There is already an existing friend request with this user',
      },
    };
  }
  try {
    const newFriendRequest = await createFriendRequest(
      sessionToken,
      validatedFields.data.receiverUserId,
    );
    if (!newFriendRequest) {
      return {
        success: false,
        error: { general: 'Friend request creation returned no data' },
      };
    }
    revalidatePath(currentPath);
    revalidatePath('/main/friends');
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to create friend request' },
    };
  }
}

export async function confirmFriendRequestAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<FriendActionState> {
  // 1. Formdaten validieren
  const validatedFields = manageFriendRequestSchema.safeParse({
    requestId: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Confirm the friend request

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    const confirmedFriendRequest = await confirmFriendRequest(
      sessionToken,
      validatedFields.data.requestId,
    );

    revalidatePath(currentPath);
    revalidatePath(`/main/profiles/${confirmedFriendRequest.receiverUserId}`);

    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to confirm friend request' },
    };
  }
}

export async function deleteReceivedFriendRequestAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<FriendActionState> {
  // 1. Formdaten validieren
  const validatedFields = manageFriendRequestSchema.safeParse({
    requestId: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create the friend request

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    await deleteReceivedFriendRequest(
      sessionToken,
      validatedFields.data.requestId,
    );

    revalidatePath(currentPath);
    revalidatePath(`/main/friends/`);

    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to delete friend request' },
    };
  }
}

export async function deleteSentFriendRequestAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<FriendActionState> {
  // 1. Formdaten validieren
  const validatedFields = manageFriendRequestSchema.safeParse({
    requestId: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create the friend request

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    await deleteSentFriendRequest(sessionToken, validatedFields.data.requestId);

    revalidatePath(currentPath);
    revalidatePath(`/main/friends/`);

    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to delete friend request' },
    };
  }
}

export async function deleteFriendAction(
  currentPath: string,
  prevState: any,
  formData: FormData,
): Promise<FriendActionState> {
  const validatedFields = deleteFriendSchema.safeParse({
    friendId: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Get the token from the cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Delete the friend

  if (!sessionToken) {
    return {
      success: false,
      error: { general: 'Failed to access session token' },
    };
  }

  try {
    await deleteFriend(sessionToken, validatedFields.data.friendId);
    revalidatePath(currentPath);
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Failed to delete friend' },
    };
  }
}
