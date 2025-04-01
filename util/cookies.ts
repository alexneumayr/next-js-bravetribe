import { cookies } from 'next/headers';

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  maxAge: 60 * 60 * 24, // Expires in 24 hours
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
} as const;

export async function getCookie(name: string) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  }
  return cookie.value;
}
