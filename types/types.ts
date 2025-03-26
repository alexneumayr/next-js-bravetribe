import type { Comment, Experience, User } from '@prisma/client';

export type RegisterActionState = {
  success: boolean;
  error?: {
    confirmPasswordMatch?: string[];
    email?: string[];
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string;
  };
};

export type LoginActionState = {
  success: boolean;
  error?: {
    username?: string[];
    password?: string[];
    general?: string;
  };
};

export type LogoutActionState = {
  success: boolean;
  error?: {
    general?: string;
  };
};

export type GoalActionState = {
  success: boolean;
  error?: {
    id?: string[];
    title?: string[];
    deadline?: string[];
    additionalNotes?: string[];
    general?: string;
  };
};

export type ChallengeActionState = {
  success: boolean;
  error?: {
    id?: string[];
    title?: string[];
    description?: string[];
    isCompleted?: string[];
    plannedDate?: string[];
    general?: string;
  };
};

export type ExperienceActionState = {
  success: boolean;
  error?: {
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

export type CommentActionState = {
  success: boolean;
  error?: {
    id?: string[];
    content?: string[];
    experienceId?: string[];
    general?: string;
  };
};

export type LikeActionState = {
  success: boolean;
  error?: {
    id?: string[];
    experienceId?: string[];
    general?: string;
  };
};

export type UserActionState = {
  success: boolean;
  error?: {
    id?: string[];
    username?: string[];
    email?: string[];
    aboutDescription?: string[];
    gender?: string[];
    location?: string[];
    avatarImageUrl?: string[];
    deleteConfirmation?: string[];
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
    confirmPasswordMatch?: string[];
    areExperiencesPublic?: string[];
    general?: string;
  };
};
