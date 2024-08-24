import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import userServices from './auth.service';

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

    sendResponse(res, {
        success: true,
        message: 'User logged in successfully',
        statusCode: httpStatus.OK,
        token: result.token,
        data: result.userData,
    });
});

const authControllers = { createUser, loginUser };

export default authControllers;
