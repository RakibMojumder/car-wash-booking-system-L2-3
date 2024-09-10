import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Service from '../Service/service.model';
import { TBooking } from './booking.interface';
import Booking from './booking.model';
import Slot from '../Slot/slot.model';
import { v4 as uuidv4 } from 'uuid';
import { initiatePayment, TPaymentPayload } from '../payment/payment.utils';
import User from '../User/user.model';

const createBookingInfoDB = async (payload: TBooking) => {
    // check if the service is exists in the database
    const service = await Service.findById(payload.service);
    const user = await User.findById(payload.customer);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
    }

    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service is not found');
    }

    // check if the slot is available
    const slot = await Slot.findOne({
        _id: payload.slot,
    });

    if (!slot) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Cloud not find slot');
    }

    const transactionId = uuidv4();

    await Booking.create({ ...payload, transactionId });

    const paymentData = {
        customerName: `${user?.firstName} ${user?.lastName}`,
        customerEmail: user?.email,
        customerAddress: user?.address,
        customerPhone: user?.phone,
        amount: service.price,
        transactionId,
    } as TPaymentPayload;

    const paymentSession = await initiatePayment(paymentData);

    return paymentSession;
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
    createBookingInfoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB,
};

export default bookingServices;
