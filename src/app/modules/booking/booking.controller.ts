import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import bookingServices from './booking.service';

const createBooking = catchAsync(async (req, res) => {
    const payload = { ...req.body, customer: req.user.id };
    const result = await bookingServices.createBookingIntoDB(payload);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Failed to create booking',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'booking created successfully',
        data: result,
    });
});

const getAllBooking = catchAsync(async (req, res) => {
    const result = await bookingServices.getAllBookingsFromDB();

    if (result.length < 0) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'No bookings found',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});

const getMyBookings = catchAsync(async (req, res) => {
    const result = await bookingServices.getMyBookingsFromDB(req.user.id);

    if (result.length < 0) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'No bookings found',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});

const bookingControllers = { createBooking, getAllBooking, getMyBookings };

export default bookingControllers;
