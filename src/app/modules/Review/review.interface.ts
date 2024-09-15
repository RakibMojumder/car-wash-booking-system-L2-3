import { Types } from 'mongoose';

export type TReview = {
    user: Types.ObjectId;
    review: string;
    rating: number;
};
