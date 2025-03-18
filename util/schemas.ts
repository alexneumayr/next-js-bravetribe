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
