import { z } from 'zod';

export const userLoginSchemaValidation = z.object({
    body: z.object({
        email: z
            .string({
                required_error: 'Email is required field',
            })
            .email('Invalid email address'),
        password: z
            .string({
                required_error: 'Password is required field',
            })
            .min(6, { message: 'Password must be at least 6 characters long' }),
    }),
});
