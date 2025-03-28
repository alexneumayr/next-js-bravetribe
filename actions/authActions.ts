'use server';
import crypto from 'node:crypto';
import { createSessionInsecure, deleteSession } from '@/database/sessions';
import {
  createUserInsecure,
  getUserByEmailInsecure,
  getUserByUsernameInsecure,
  getUserWithPasswordHashInsecure,
} from '@/database/users';
import type {
  LoginActionState,
  LogoutActionState,
  RegisterActionState,
} from '@/types/types';
import { secureCookieOptions } from '@/util/cookies';
import { registrationSchema, signinSchema } from '@/util/schemas';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function registerUserAction(
  prevState: any,
  formData: FormData,
): Promise<RegisterActionState> {
  // 1. Userdaten validieren
  const validatedFields = registrationSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Checken, ob User schon existiert
  const userByEmail = await getUserByEmailInsecure(validatedFields.data.email);
  if (userByEmail) {
    return {
      success: false,
      error: { general: 'Email already registered' },
    };
  }
  const userByUsername = await getUserByUsernameInsecure(
    validatedFields.data.username,
  );
  if (userByUsername) {
    return {
      success: false,
      error: { general: 'Username already taken' },
    };
  }
  // Wenn er nicht existiert:
  // 3. Passwort hashen:
  const passwordHash = await bcrypt.hash(validatedFields.data.password, 12);

  // 4. Userinfo mit gehashtem Passwort in Datenbank speichern
  let newUser;
  try {
    newUser = await createUserInsecure(
      validatedFields.data.username,
      validatedFields.data.email,
      passwordHash,
    );
  } catch {
    return {
      success: false,
      error: { general: 'Registration failed' },
    };
  }

  // 5. Token erstellen
  const token = crypto.randomBytes(100).toString('base64');

  // 6. Session-Eintrag erstellen (weil der User gleich eingeloggt sein soll)
  let session;
  try {
    session = await createSessionInsecure(token, newUser.id);
    (await cookies()).set({
      name: 'sessionToken',
      value: session.token,
      ...secureCookieOptions,
    });
    revalidatePath('/access');
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Creating session failed' },
    };
  }
}

export async function loginUserAction(
  prevState: any,
  formData: FormData,
): Promise<LoginActionState> {
  // 1. Userdaten validieren
  const validatedFields = signinSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    validatedFields.data.username,
  );
  if (!userWithPasswordHash) {
    return {
      success: false,
      error: { general: 'Username or Password is invalid' },
    };
  }

  // 4. Validate the user password by comparing with hashed password
  const isPasswordValid = await bcrypt.compare(
    validatedFields.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return {
      success: false,
      error: { general: 'Username or Password is invalid' },
    };
  }

  // At this stage we have already confirmed that the user is who they say they are
  const token = crypto.randomBytes(100).toString('base64');

  // Session-Eintrag erstellen
  let session;
  try {
    session = await createSessionInsecure(token, userWithPasswordHash.id);
    (await cookies()).set({
      name: 'sessionToken',
      value: session.token,
      ...secureCookieOptions,
    });
    revalidatePath('/access');
    return { success: true };
  } catch {
    return {
      success: false,
      error: { general: 'Creating session failed' },
    };
  }
}

export async function logoutUserAction(): Promise<LogoutActionState> {
  // Task: Implement the user logout workflow
  const cookieStore = await cookies();

  // 1. Get the session token from the cookie
  const token = cookieStore.get('sessionToken');

  // 2. Delete the session from the database based on the token

  if (token) {
    try {
      await deleteSession(token.value);

      // 3. Delete the session cookie from the browser
      cookieStore.delete(token.name);

      return { success: true };
    } catch {
      return {
        success: false,
        error: { general: 'Failed to log out' },
      };
    }
  }
  return {
    success: false,
    error: { general: "Failed to log out (can't access token from cookie)" },
  };
}
