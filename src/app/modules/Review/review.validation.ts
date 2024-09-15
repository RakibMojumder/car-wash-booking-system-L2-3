import { z } from 'zod';

const reviewValidationSchema = z.object({
    review: z.string({
        required_error: 'Review is required',
    }),
    rating: z.number({
        required_error: 'Rating is required',
    }),
});

export default reviewValidationSchema;
