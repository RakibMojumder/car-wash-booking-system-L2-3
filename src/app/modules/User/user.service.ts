import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';

const getAllUserFromDB = async () => {
    const result = await User.find({ isDeleted: { $ne: true } });
    return result;
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

const userServices = {
    getAllUserFromDB,
    getLoginUserFromDB,
    updateUserIntoDB,
    makeAdminIntoDB,
    deleteUserIntoDB,
};

export default userServices;
