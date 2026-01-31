import z, { array, boolean, string } from 'zod';
import { IGenralSchema } from '../types';

export const addPostSchema: IGenralSchema = {
  body: z.object({
    title: z.string().min(5),
    content: z.string(),
    author: string().length(24),
    tag: array(string()),
    published: boolean(),
  }),
};

export const updatePostSchema: IGenralSchema = {
  params: z.object({
    id: z.string().length(24, 'Invalid post id'),
  }),

  body: z
    .object({
      title: z.string().min(5).optional(),
      content: z.string().optional(),
      author: z.string().length(24).optional(),
      tag: z.array(z.string()).optional(),
      published: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    }),
};
