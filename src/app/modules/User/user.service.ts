import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';
import Booking from '../Booking/booking.model';

const getAllUserFromDB = async (page: number) => {
    const users = await User.find({ isDeleted: { $ne: true } })
        .skip(page * 10)
        .limit(10);

    const totalUsers = await User.find({}).countDocuments();
    return { users, totalUsers };
};

const getLoginUserFromDB = async (id: string) => {
    const result = await User.findById(id);
    return result;
};

const updateUserIntoDB = async (payload: Partial<TUser>, id: string) => {
    // check if user exits
    const isUserExist = await User.findById(id);

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const result = await User.findByIdAndUpdate(id, payload, { upsert: true });
    return result;
};

const makeAdminIntoDB = async (id: string, role: string) => {
    // check if user exits
    const isUserExist = await User.findById(id);

    if (!isUserExist) {
        return new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const result = User.findByIdAndUpdate(id, { role }, { new: true });
    return result;
};

const deleteUserIntoDB = async (id: string) => {
    // check if user exits
    const isUserExist = await User.findById(id);

    if (!isUserExist) {
        return new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const result = await User.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};

const getAdminOverviewDataFromDB = async () => {
    const revenue = await Booking.aggregate([
        { $match: {} },
        {
            $lookup: {
                from: 'services',
                foreignField: '_id',
                localField: 'service',
                as: 'service',
            },
        },
        { $unwind: '$service' },
        { $group: { _id: null, totalRevenue: { $sum: '$service.price' } } },
        { $project: { _id: 0 } },
    ]);

    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({
        bookingStatus: 'Pending',
    });

    return {
        revenue: revenue[0].totalRevenue,
        totalBookings,
        totalUsers,
        activeBookings,
    };
};

const getUserOverviewDataFromDB = async (id: string) => {
    const totalBookings = await Booking.countDocuments({ customer: id });
    const completeBookings = await Booking.countDocuments({
        customer: id,
        bookingStatus: 'Completed',
    });
    const activeBookings = await Booking.countDocuments({
        customer: id,
        bookingStatus: 'Pending',
    });

    return { totalBookings, completeBookings, activeBookings };
};

const userServices = {
    getAllUserFromDB,
    getLoginUserFromDB,
    updateUserIntoDB,
    makeAdminIntoDB,
    deleteUserIntoDB,
    getAdminOverviewDataFromDB,
    getUserOverviewDataFromDB,
};

export default userServices;
