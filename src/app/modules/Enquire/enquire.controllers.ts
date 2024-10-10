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

const getAllEnquires = catchAsync(async (req, res) => {
    const result = await enquireServices.getAllEnquiresFromDB();

    if (result.length > 0) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Enquire retrieved successful',
            data: result,
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'No enquire found',
    });
});

const enquireReply = catchAsync(async (req, res) => {
    const result = await enquireServices.sendEnquireReply(
        req.params.id,
        req.body?.text
    );
    if (result) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Enquire replied successfully',
            data: result,
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Replied failed for enquire',
    });
});

const enquireControllers = { createEnquire, getAllEnquires, enquireReply };

export default enquireControllers;
