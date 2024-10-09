import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import userServices from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
    const result = await userServices.getAllUserFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
});

const getLoginUser = catchAsync(async (req, res) => {
    const result = await userServices.getLoginUserFromDB(req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });
});

const updateUser = catchAsync(async (req, res) => {
    const result = await userServices.updateUserIntoDB(req.body, req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User update successfully',
        data: result,
    });
});

const makeAdmin = catchAsync(async (req, res) => {
    const result = await userServices.makeAdminIntoDB(
        req.params.id,
        req.body.role
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Make admin successfully',
        data: result,
    });
});

const userControllers = { getAllUsers, getLoginUser, updateUser, makeAdmin };

export default userControllers;
