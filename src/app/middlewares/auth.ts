import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import User from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized !'
            );
        }

        // check if the token is valid
        const decoded = jwt.verify(
            token,
            config.jwt_access_token as string
        ) as JwtPayload;

        const { email, role } = decoded;

        // check if the user is exists
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized!'
            );
        }

        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;
