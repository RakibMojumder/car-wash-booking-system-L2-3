import { z } from 'zod';

export const serviceValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required field',
        }),
        description: z.string({
            required_error: 'Description is required field',
        }),
        price: z.number({
            required_error: 'Price is required field',
        }),
        duration: z.number({
            required_error: 'Duration is required field',
        }),
    }),
});

export const updateServiceValidationSchema = z.object({
    body: z.object({
        name: z
            .string({
                required_error: 'Name is required field',
            })
            .optional(),
        description: z
            .string({
                required_error: 'Description is required field',
            })
            .optional(),
        price: z
            .number({
                required_error: 'Price is required field',
            })
            .optional(),
        duration: z
            .number({
                required_error: 'Duration is required field',
            })
            .optional(),
    }),
});
