'use server';
import crypto from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { registrationSchema } from '@/util/schemas';
import type { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Session database functions

async function getValidSessionToken(sessionToken: string) {
  const session = await prisma.session.findUnique({
    where: {
      token: sessionToken,
      expiryTimestamp: { gt: new Date() },
    },
    select: {
      id: true,
      userId: true,
      token: true,
    },
  });
  return session;
}

async function createSessionInsecure(token: string, userId: string) {
  const session = await prisma.session.create({
    data: {
      token: token,
      userId: userId,
    },
    select: {
      id: true,
      userId: true,
      token: true,
    },
  });

  await prisma.session.deleteMany({
    where: {
      expiryTimestamp: { lt: new Date() },
    },
  });

  return session;
}

async function deleteSession(sessionToken: string) {
  const session = await prisma.session.delete({
    where: {
      token: sessionToken,
    },
    select: {
      userId: true,
    },
  });
  return session;
}

// User database functions

async function getUser(sessionToken: string) {
  const user = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    select: {
      User: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });
  return user;
}

async function getUserByEmailInsecure(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
}

async function getUserByUsernameInsecure(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
}

async function getUserWithPasswordHashInsecure(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
  });
  return user;
}

async function createUserInsecure(
  username: string,
  email: string,
  passwordHash: string,
) {
  const user = await prisma.user.create({
    data: {
      username: username.toLowerCase(),
      email: email,
      passwordHash: passwordHash,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
}

// Cookies

const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  maxAge: 60 * 60 * 24, // Expires 24 hours
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
} as const;

async function getCookie(name: string) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  }
  return cookie.value;
}

type RegisterActionState =
  | { user: Pick<User, 'id' | 'email' | 'username'> }
  | {
      error: {
        confirmPasswordMatch?: string[];
        email?: string[];
        username?: string[];
        password?: string[];
        confirmPassword?: string[];
        general?: string;
      };
    };

// Register

export async function registerUser(
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
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Checken, ob User schon existiert
  const userByEmail = await getUserByEmailInsecure(validatedFields.data.email);
  if (userByEmail) {
    return { error: { general: 'Email already registered' } };
  }
  const userByUsername = await getUserByUsernameInsecure(
    validatedFields.data.username,
  );
  if (userByUsername) {
    return { error: { general: 'Username already taken' } };
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
    return { error: { general: 'Registration failed' } };
  }

  // 5. Token erstellen
  const token = crypto.randomBytes(100).toString('base64');

  // 6. Session-Eintrag erstellen
  let session;
  try {
    session = await createSessionInsecure(token, newUser.id);
  } catch {
    return { error: { general: 'Creating session failed' } };
  }

  (await cookies()).set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return { user: newUser };
}
