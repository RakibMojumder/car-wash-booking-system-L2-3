import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import serviceServices from './service.service';

const createService = catchAsync(async (req, res) => {
    const result = await serviceServices.createServiceIntoDB(req.body);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Failed to create service',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Service created successfully',
        data: result,
    });
});

const getAllServices = catchAsync(async (req, res) => {
    const result = await serviceServices.getAllServicesFromDB();

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Services not found',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'All services retrieved successfully',
        data: result,
    });
});

const getSingleService = catchAsync(async (req, res) => {
    const result = await serviceServices.getSingleServiceFromDB(req.params.id);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Service not found',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Service retrieved successfully',
        data: result,
    });
});

const updateService = catchAsync(async (req, res) => {
    const result = await serviceServices.updateServiceIntoDB(
        req.params.id,
        req.body
    );

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Failed to update service',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Service updated successfully',
        data: result,
    });
});

const deleteService = catchAsync(async (req, res) => {
    const result = await serviceServices.deleteServiceFromDB(req.params.id);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Failed to delete service',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Service deleted successfully',
        data: result,
    });
});

const serviceControllers = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};

export default serviceControllers;
