import type { User } from '@prisma/client';

export type RegisterActionState =
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

export type LoginActionState =
  | { user: Pick<User, 'username'> }
  | {
      error: {
        username?: string[];
        password?: string[];
        general?: string;
      };
    };
