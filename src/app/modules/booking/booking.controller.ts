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
    const page = Number(req.query.page);
    const { bookings, totalBookings } =
        await bookingServices.getAllBookingsFromDB(page);

    if (bookings.length < 0) {
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
        data: { bookings, totalBookings },
    });
});

const getMyBookings = catchAsync(async (req, res) => {
    const page = Number(req.query.page);
    const { bookings, totalBookings } =
        await bookingServices.getMyBookingsFromDB(req.user.id, page);

    if (bookings.length < 0) {
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
        data: { bookings, totalBookings },
    });
});

const getSingleBookingDB = catchAsync(async (req, res) => {
    const transactionId = req.params.transactionId;
    const result = await bookingServices.getSingleBookingFromDB(transactionId);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Booking not found',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking retrieved successfully',
        data: result,
    });
});

const getRecentBookings = catchAsync(async (req, res) => {
    const result = await bookingServices.getRecentBookingsFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Recent Booking retrieved successfully',
        data: result,
    });
});

const getUserRecentBookings = catchAsync(async (req, res) => {
    const result = await bookingServices.getUserRecentBookingsFromDB(
        req.user.id
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Recent Booking retrieved successfully',
        data: result,
    });
});

const updateBookingStatus = catchAsync(async (req, res) => {
    const result = await bookingServices.updateBookingStatusIntoDB(
        req.params.id,
        req.body.status
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking status update successfully',
        data: result,
    });
});

const bookingControllers = {
    createBooking,
    getAllBooking,
    getMyBookings,
    getSingleBookingDB,
    getRecentBookings,
    getUserRecentBookings,
    updateBookingStatus,
};

export default bookingControllers;
