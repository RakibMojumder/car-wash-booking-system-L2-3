import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import userServices from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
    const page = Number(req.query.page);
    const { users, totalUsers } = await userServices.getAllUserFromDB(page);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: { users, totalUsers },
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

const deleteUser = catchAsync(async (req, res) => {
    const result = await userServices.deleteUserIntoDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
});

const getAdminOverviewData = catchAsync(async (req, res) => {
    const result = await userServices.getAdminOverviewDataFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully retrieved overview data',
        data: result,
    });
});

const getUserOverviewData = catchAsync(async (req, res) => {
    const result = await userServices.getUserOverviewDataFromDB(req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully retrieved overview data',
        data: result,
    });
});

const userControllers = {
    getAllUsers,
    getLoginUser,
    updateUser,
    makeAdmin,
    deleteUser,
    getAdminOverviewData,
    getUserOverviewData,
};

export default userControllers;
