import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Service from '../Service/service.model';
import { TBooking } from './booking.interface';
import Booking from './booking.model';
import Slot from '../Slot/slot.model';

const bookingServiceIntoDB = async (payload: TBooking) => {
    // check if the service is exists in the database
    const service = await Service.findById(payload.service);

    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service is not found');
    }

    // check if the slot is available
    const slot = await Slot.findOne({
        _id: payload.slot,
        isBooked: 'available',
    });

    if (!slot) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Slot is not available');
    }

    // booked the slot
    const bookingSlot = await Slot.findByIdAndUpdate(
        payload.slot,
        { isBooked: 'booked' },
        { new: true }
    );

    if (!bookingSlot) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to booked slot');
    }

    const result = (await Booking.create(payload)).populate(
        'customer service slot'
    );
    return result;
};

const getAllBookingsFromDB = async () => {
    const result = await Booking.find().populate('customer service slot');
    return result;
};

const getMyBookingsFromDB = async (id: string) => {
    const result = await Booking.find({ customer: id });
    return result;
};

const bookingServices = {
    bookingServiceIntoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB,
};

export default bookingServices;
