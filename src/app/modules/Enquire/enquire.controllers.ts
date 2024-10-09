import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import enquireServices from './enquire.services';

const createEnquire = catchAsync(async (req, res) => {
    const result = await enquireServices.createEnquireIntoDB(req.body);

    if (result) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Enquire submitted successful',
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Failed to submit enquire',
    });
});

const enquireControllers = { createEnquire };

export default enquireControllers;
