import { z } from 'zod';

export const slotValidationSchema = z.object({
    body: z.object({
        service: z.string(),
        startTime: z.string(),
        endTime: z.string(),
    }),
});
