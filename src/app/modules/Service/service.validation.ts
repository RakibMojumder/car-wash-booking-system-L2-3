import { z } from 'zod';

export const serviceValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required field',
        }),
        title: z.string({
            required_error: 'Title is required field',
        }),
        shortTitle: z.string({
            required_error: 'Short title is required field',
        }),
        video: z.string({
            required_error: 'Video title is required field',
        }),
        image: z.string({
            required_error: 'Image title is required field',
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
