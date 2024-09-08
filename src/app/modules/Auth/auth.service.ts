import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import { TUserLogin } from './auth.interface';
import AppError from '../../errors/AppError';
import bcrypt from 'bcrypt';
import generateToken from './auth.utils';
import config from '../../config';

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

    const tokenData = {
        email: user.email,
        role: user.role,
        id: user._id,
    };

    const token = generateToken(
        tokenData,
        config.jwt_access_token as string,
        config.jwt_access_expires_in as string
    );

    const refreshToken = generateToken(
        tokenData,
        config.jwt_refresh_token as string,
        config.jwt_refresh_expires_in as string
    );

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;

    return { token, refreshToken, userData };
};

const getRefreshToken = async (token: string) => {
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    // check if the token is valid
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_token as string
    ) as JwtPayload;

    const { email, role } = decoded;

    // check if the user is exists
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
    }

    if (role !== user.role) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const tokenData = {
        email: user.email,
        role: user.role,
        id: user._id,
    };

    const accessToken = generateToken(
        tokenData,
        config.jwt_access_token as string,
        config.jwt_access_expires_in as string
    );

    return accessToken;
};

const userServices = { createUserIntoDB, userLogin, getRefreshToken };

export default userServices;
