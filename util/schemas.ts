import type { LocationObject } from '@/types/types';
import { z } from 'zod';

export const registrationSchema = z
  .object({
    username: z.string().min(1, {
      message: 'Please choose a username',
    }),
    email: z
      .string()
      .email({ message: 'Please type in a correct email address' }),
    password: z.string().regex(/^(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/, {
      message:
        'Password must be at least 8 characters long and include a number and a special character',
    }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Passwords do not match',
    path: ['confirmPasswordMatch'],
  });

export const signinSchema = z.object({
  username: z.string().min(1, {
    message: 'Please enter your username',
  }),
  password: z.string().min(1, {
    message: 'Please enter your password',
  }),
});

export const goalSchema = z.object({
  id: z
    .string({ message: 'Incorrect goal ID transmitted' })
    .length(25, { message: 'Incorrect goal ID transmitted' }),
  title: z.string().min(3, {
    message: 'Please type in your goal',
  }),
  deadline: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === 'invalid_date'
          ? 'Please choose a correct date'
          : defaultError,
    }),
  }),
  additionalNotes: z.string(),
});

export const challengeSchema = z.object({
  id: z
    .string({ message: 'Incorrect challenge ID transmitted' })
    .length(25, { message: 'Incorrect challenge ID transmitted' }),
  title: z.string().min(3, {
    message: 'Please type in a challenge title',
  }),
  description: z.string().min(3, {
    message: 'Please type in a challenge description',
  }),
  plannedDate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === 'invalid_date'
          ? 'Please choose a correct date'
          : defaultError,
    }),
  }),
  isCompleted: z.boolean(),
});

export const experienceSchema = z.object({
  id: z
    .string({ message: 'Incorrect experience ID transmitted' })
    .length(25, { message: 'Incorrect experience ID transmitted' }),
  title: z.string().min(3, {
    message: 'Please type in a challenge title',
  }),
  story: z.string().min(3, {
    message: 'Please write something about your experience',
  }),
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === 'invalid_date'
          ? 'Please choose a correct date'
          : defaultError,
    }),
  }),
  rating: z.coerce
    .number()
    .gte(1, { message: 'Please rate your experience from 1 to 5 stars' })
    .lte(5, { message: 'Please rate your experience from 1 to 5 stars' }),
  imageUrl: z
    .string({ message: 'Problem with image Url' })
    .url()
    .optional()
    .or(z.literal('')),
  location: z.custom<LocationObject>().optional(),
  challengeId: z
    .string({ message: 'Challenge ID has the wrong datatype' })
    .length(25, { message: 'Incorrect challenge ID transmitted' }),
});

export const commentSchema = z.object({
  id: z
    .string({ message: 'Incorrect comment ID transmitted' })
    .length(25, { message: 'Incorrect comment ID transmitted' }),
  content: z.string().min(1, {
    message: 'Please write a comment',
  }),
  experienceId: z
    .string()
    .length(25, { message: 'Incorrect challenge ID transmitted' }),
});

export const likeSchema = z.object({
  id: z
    .string({ message: 'Incorrect like ID transmitted' })
    .length(25, { message: 'Incorrect like ID transmitted' }),
  experienceId: z
    .string()
    .length(25, { message: 'Incorrect experience ID transmitted' }),
});

export const userSchema = z.object({
  id: z
    .string({ message: 'Incorrect user ID transmitted' })
    .length(25, { message: 'Incorrect user ID transmitted' }),
  username: z
    .string()
    .min(1, {
      message: 'Please choose a username',
    })
    .optional()
    .nullable(),
  email: z
    .string()
    .email({ message: 'Please type in a correct email address' })
    .optional()
    .nullable(),
  aboutDescription: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  avatarImageUrl: z
    .string({ message: 'Problem with image Url' })
    .url()
    .optional()
    .or(z.literal(''))
    .nullable(),
  areExperiencesPublic: z.boolean().optional().nullable(),
});

export const changeUserPasswordSchema = z
  .object({
    id: z
      .string({ message: 'Incorrect user ID transmitted' })
      .length(25, { message: 'Incorrect user ID transmitted' }),
    currentPassword: z
      .string()
      .min(1, { message: 'Please type in your current password' }),
    newPassword: z.string().regex(/^(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/, {
      message:
        'Password must be at least 8 characters long and include a number and a special character',
    }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: 'Passwords do not match',
    path: ['confirmPasswordMatch'],
  });

export const deleteUserSchema = z.object({
  id: z
    .string({ message: 'Incorrect user ID transmitted' })
    .length(25, { message: 'Incorrect user ID transmitted' }),
  deleteConfirmation: z.literal('DELETE', {
    errorMap: () => ({
      message: 'Type "DELETE" to proceed with account deletion.',
    }),
  }),
});

export const createFriendRequestSchema = z.object({
  receiverUserId: z
    .string({ message: 'Incorrect receiver user ID transmitted' })
    .length(25, { message: 'Incorrect receiver user ID transmitted' }),
});

export const manageFriendRequestSchema = z.object({
  requestId: z
    .string({ message: 'Incorrect friend request ID transmitted' })
    .length(25, { message: 'Incorrect friend request ID transmitted' }),
});

export const deleteFriendSchema = z.object({
  friendId: z
    .string({ message: 'Incorrect friend user ID transmitted' })
    .length(25, { message: 'Incorrect friend user ID transmitted' }),
});
