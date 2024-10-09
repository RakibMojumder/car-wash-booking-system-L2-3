/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Service from '../Service/service.model';
import { TBooking } from './booking.interface';
import Booking from './booking.model';
import Slot from '../Slot/slot.model';
import { v4 as uuidv4 } from 'uuid';
import User from '../User/user.model';
import formattedDate from './booking.utils';
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';

const is_live = false;

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

        const paymentData = {
            total_amount: service.price,
            currency: 'BDT',
            tran_id: transactionId,
            success_url: `${config.server_url}/payment/success?transactionId=${transactionId}`,
            fail_url: `${config.server_url}/payment/fail?transactionId=${transactionId}`,
            cancel_url: `${config.server_url}/payment/cancel?transactionId=${transactionId}`,
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: `${user?.firstName} ${user?.lastName}`,
            cus_email: user?.email,
            cus_add1: user?.address,
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: 643,
            cus_country: 'Bangladesh',
            cus_phone: user?.phone,
            cus_fax: '01711111111',
            ship_name: user?.firstName,
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(
            config.store_id as string,
            config.store_pass as string,
            is_live
        );

        const apiResponse = await sslcz.init(paymentData);

        if (apiResponse.GatewayPageURL) {
            await Booking.create({
                ...payload,
                date,
                transactionId,
            });
        }

        const GatewayPageURL = apiResponse.GatewayPageURL;

        return GatewayPageURL;

        // await Booking.create({
        //     ...payload,
        //     date,
        //     transactionId,
        // });

        // const paymentData = {
        //     customerName: `${user?.firstName} ${user?.lastName}`,
        //     customerEmail: user?.email,
        //     customerAddress: user?.address,
        //     customerPhone: user?.phone,
        //     amount: service.price,
        //     transactionId,
        // } as TPaymentPayload;

        // const paymentSession = await initiatePayment(paymentData);

        // return paymentSession;
    } catch (error) {
        console.log(error);
        throw new AppError(httpStatus.BAD_REQUEST, 'something is wrong');
    }
};

const getAllBookingsFromDB = async () => {
    const result = await Booking.find()
        .populate('customer service slot')
        .sort('-createdAt');
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

const getRecentBookingsFromDB = async () => {
    const result = await Booking.find({})
        .populate({
            path: 'service',
            select: 'price name image -_id',
        })
        .populate({
            path: 'slot',
            select: 'startTime endTime _id',
        })
        .select('service slot date createdAt')
        .sort('-createdAt')
        .limit(6);
    return result;
};

const getUserRecentBookingsFromDB = async (id: string) => {
    const result = await Booking.find({ customer: id })
        .populate({
            path: 'service',
            select: 'price name image -_id',
        })
        .populate({
            path: 'slot',
            select: 'startTime endTime _id',
        })
        .select('service slot date createdAt')
        .sort('-createdAt')
        .limit(6);
    return result;
};

const updateBookingStatusIntoDB = async (id: string, status: string) => {
    const result = await Booking.findOneAndUpdate(
        { _id: id },
        { bookingStatus: status },
        { new: true }
    );
    return result;
};

const bookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB,
    getSingleBookingFromDB,
    getRecentBookingsFromDB,
    getUserRecentBookingsFromDB,
    updateBookingStatusIntoDB,
};

export default bookingServices;
