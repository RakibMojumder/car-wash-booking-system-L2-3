import { TUser } from './user.interface';
import User from './user.model';

const getAllUserFromDB = async () => {
    const result = await User.find();
    return result;
};

const getLoginUserFromDB = async (id: string) => {
    const result = await User.findById(id);
    return result;
};

const updateUserIntoDB = async (payload: Partial<TUser>, id: string) => {
    const result = await User.findByIdAndUpdate(id, payload, { upsert: true });
    return result;
};

const userServices = { getAllUserFromDB, getLoginUserFromDB, updateUserIntoDB };

export default userServices;
