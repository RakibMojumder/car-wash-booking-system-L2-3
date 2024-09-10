import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import slotServices from './slot.service';

const createSlot = catchAsync(async (req, res) => {
    const result = await slotServices.createSlotIntoDB(req.body);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Failed to create slot',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Slots created successfully',
        data: result,
    });
});

const getAvailableSlots = catchAsync(async (req, res) => {
    const result = await slotServices.getAvailableSlotsFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Available slots retrieved successfully',
        data: result,
    });
});

const slotControllers = { createSlot, getAvailableSlots };

export default slotControllers;
