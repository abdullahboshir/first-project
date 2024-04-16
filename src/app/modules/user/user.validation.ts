import { z } from 'zod';
import { UserStatus } from './user.constant';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .max(20, { message: 'Password can not be more then 20 Charaters' })
    .optional(),
});

export const changeStatusValidation = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const userValidation = {
  userValidationSchema,
};
