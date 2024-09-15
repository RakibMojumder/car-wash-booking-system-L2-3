import { TReview } from './review.interface';
import Review from './review.model';

const addReviewIntoDB = async (payload: TReview) => {
    const result = await Review.create(payload);
    return result;
};

const getAllReviewsFromDB = async () => {
    const result = await Review.find({}).populate({
        path: 'user',
        select: 'firstName lastName profile -_id',
    });
    return result;
};

const reviewServices = { addReviewIntoDB, getAllReviewsFromDB };

export default reviewServices;
