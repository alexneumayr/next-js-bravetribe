import type { Comment, Experience, User } from '@prisma/client';

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

export type GoalActionState = {
  error: {
    id?: string[];
    title?: string[];
    deadline?: string[];
    additionalNotes?: string[];
    general?: string;
  };
};

export type ChallengeActionState = {
  error: {
    id?: string[];
    title?: string[];
    description?: string[];
    isCompleted?: string[];
    plannedDate?: string[];
    general?: string;
  };
};

export type ExperienceActionState = {
  error: {
    id?: string[];
    title?: string[];
    story?: string[];
    date?: string[];
    rating?: string[];
    imageUrl?: string[];
    location?: string[];
    challengeId?: string[];
    general?: string;
  };
};

export type LocationObject = {
  name: string;
  lat: number;
  lon: number;
};

export interface UserWithExperiences extends User {
  experiences: Experience[];
}

export interface FullComment extends Comment {
  user: UserWithExperiences;
}
