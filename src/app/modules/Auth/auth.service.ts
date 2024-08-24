import httpStatus from 'http-status';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import { TUserLogin } from './auth.interface';
import AppError from '../../errors/AppError';
import bcrypt from 'bcrypt';
import generateToken from './auth.utils';

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
};

const userLogin = async (payload: TUserLogin) => {
    // check is user exists in the database
    const user = await User.findOne({ email: payload.email })
        .select('+password')
        .lean();

    if (!user) {
        throw new AppError(httpStatus.CONFLICT, `Invalid credentials`);
    }

    // check is password matched
    const isPasswordMatched = await bcrypt.compare(
        payload.password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid credentials');
    }

    const token = generateToken({ email: user.email, role: user.role });

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;

    return { token, userData };
};

const userServices = { createUserIntoDB, userLogin };

export default userServices;
