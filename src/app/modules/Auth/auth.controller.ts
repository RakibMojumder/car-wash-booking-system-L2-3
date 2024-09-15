import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import userServices from './auth.service';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
    const result = await userServices.createUserIntoDB(req.body);

    if (!result) {
        sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Failed to create user',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Create user successful',
        data: result,
    });
});

const loginUser = catchAsync(async (req, res) => {
    const result = await userServices.userLogin(req.body);
    const { token, refreshToken, userData } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    sendResponse(res, {
        success: true,
        message: 'User logged in successfully',
        statusCode: httpStatus.OK,
        data: { token, user: userData },
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const token = await userServices.getRefreshToken(refreshToken);

    sendResponse(res, {
        success: true,
        message: 'Access token retrieved successfully',
        statusCode: httpStatus.OK,
        data: { token },
    });
});

const authControllers = { createUser, loginUser, refreshToken };

export default authControllers;
