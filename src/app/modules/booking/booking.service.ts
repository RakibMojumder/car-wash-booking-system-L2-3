import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Service from '../Service/service.model';
import { TBooking } from './booking.interface';
import Booking from './booking.model';
import Slot from '../Slot/slot.model';
import { v4 as uuidv4 } from 'uuid';
import { initiatePayment, TPaymentPayload } from '../payment/payment.utils';
import User from '../User/user.model';
import formattedDate from './booking.utils';

const createBookingIntoDB = async (payload: TBooking) => {
    try {
        // check if the service is exists in the database
        const service = await Service.findById(payload.service);
        const user = await User.findById(payload.customer);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
        }

        if (!service) {
            throw new AppError(httpStatus.NOT_FOUND, 'Service is not found');
        }

        // // check if the slot is available
        const slot = await Slot.findOne({
            _id: payload.slot,
        });

        if (!slot) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Cloud not find slot');
        }

        const transactionId = uuidv4();
        const date = formattedDate(payload.date);

        await Booking.create({
            ...payload,
            date,
            transactionId,
        });

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
    } catch (error) {
        console.log(error);
        throw new AppError(httpStatus.BAD_REQUEST, 'something is wrong');
    }
};

const getAllBookingsFromDB = async () => {
    const result = await Booking.find().populate('customer service slot');
    return result;
};

const getMyBookingsFromDB = async (id: string) => {
    const result = await Booking.find({ customer: id })
        .populate('service slot')
        .sort('date');
    return result;
};

const getSingleBookingFromDB = async (transactionId: string) => {
    const result = await Booking.findOne({ transactionId })
        .populate({
            path: 'customer',
            select: 'email -_id',
        })
        .populate({
            path: 'service',
            select: 'price -_id',
        })
        .select('transactionId');

    return result;
};

const bookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB,
    getSingleBookingFromDB,
};

export default bookingServices;
