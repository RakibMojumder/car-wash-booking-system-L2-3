import { TUser } from '../User/user.interface';
import User from '../User/user.model';

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
};

const userServices = { createUserIntoDB };

export default userServices;
