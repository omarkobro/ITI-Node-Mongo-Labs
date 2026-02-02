import { z } from 'zod';
import { IGenralSchema, Role } from '../types';

export const createUserSchema: IGenralSchema = {
  body: z.object({
    name: z.string().min(3),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    email: z.string().email('Invalid email address'),
    // repeatPassword: z.string().min(8, "Password must be at least 8 characters long"),
    age: z.number().min(18).max(100),
  }),
  // .refine((data) => data.password === data.repeatPassword, {
  //     path: ["repeatPassword"],
  //     message: "Passwords do not match",
  // })
};

export const signUpSchema: IGenralSchema = {
  body: z
    .object({
      name: z.string().min(3).max(30),

      email: z.string().email({ message: 'Invalid email address' }),

      password: z
        .string()
        .min(8)
        .max(30)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
          'Password must include uppercase, lowercase, number, and special character',
        ),

      repeatPassword: z.string(),

      age: z.number().min(18).max(150),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: 'Passwords do not match',
      path: ['repeatPassword'],
    }),
};

export const signInSchema: IGenralSchema = {
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),

    password: z.string().min(8).max(30),
  }),
};
