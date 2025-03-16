import type { Goal } from '@prisma/client';

export type RegisterActionState = {
  error: {
    confirmPasswordMatch?: string[];
    email?: string[];
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string;
  };
};

export type LoginActionState = {
  error: {
    username?: string[];
    password?: string[];
    general?: string;
  };
};

export type CreateGoalActionState =
  | { goal: Pick<Goal, 'title' | 'deadline'> }
  | {
      error: {
        title?: string[];
        deadline?: string[];
        general?: string;
      };
    };
