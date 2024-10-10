import { z } from 'zod';

export const enquireValidationSchema = z.object({
    body: z.object({
        firstName: z
            .string({
                required_error: 'first name is required field',
            })
            .min(1),
        lastName: z
            .string({
                required_error: 'last name is required field',
            })
            .min(1),
        phone: z
            .string({
                required_error: 'phone is required field',
            })
            .min(1),
        email: z
            .string({
                required_error: 'email is required field',
            })
            .min(1),
        services: z.string().array().optional(),
        question: z
            .string({
                required_error: 'question plage is required field',
            })
            .min(1),
    }),
});
