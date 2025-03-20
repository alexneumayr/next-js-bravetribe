import type { LocationObject } from '@/app/main/experiences/newexperience/NewExperienceForm';
import { z } from 'zod';

export const registrationSchema = z
  .object({
    username: z.string().min(5, {
      message: 'Please choose a username with minimum 5 characters',
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
  username: z.string().min(3, {
    message: 'Please enter your username',
  }),
  password: z.string().min(3, {
    message: 'Please enter your password',
  }),
});

export const goalSchema = z.object({
  id: z.string().length(25, { message: 'Incorrect ID transmitted' }),
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
  id: z.string().length(25, { message: 'Incorrect ID transmitted' }),
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
  id: z.string().length(25, { message: 'Incorrect ID transmitted' }),
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
  imageUrl: z.string().url().optional().or(z.literal('')),
  location: z.custom<LocationObject>().optional(),
  challengeId: z
    .string()
    .length(25, { message: 'Incorrect challenge ID transmitted' }),
});
