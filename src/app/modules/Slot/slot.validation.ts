import { z } from 'zod';

export const slotValidationSchema = z.object({
    body: z.object({
        service: z.string(),
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
    }),
});
