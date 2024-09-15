import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import reviewServices from './review.service';

const addReview = catchAsync(async (req, res) => {
    const payload = { ...req.body, user: req.user.id };
    const result = await reviewServices.addReviewIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Review added successfully',
        data: result,
    });
});

const getAllReview = catchAsync(async (req, res) => {
    const result = await reviewServices.getAllReviewsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review retrieved successfully',
        data: result,
    });
});

const reviewControllers = { addReview, getAllReview };

export default reviewControllers;
