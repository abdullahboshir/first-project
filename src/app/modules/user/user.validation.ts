import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .max(20, { message: 'Password can not be more then 20 Charaters' })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
