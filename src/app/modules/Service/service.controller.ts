/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import serviceServices from './service.service';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { TCloudinaryFileUpload } from './service.interface';
import fs from 'fs';

const createService = catchAsync(async (req, res) => {
    const result = await serviceServices.createServiceIntoDB(req.body);
    console.log(result);

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

const fileUpload = async (req: Request, res: Response) => {
    try {
        const image = req.file;
        const resource_type = image?.mimetype.split(
            '/'
        )[0] as TCloudinaryFileUpload;

        cloudinary.uploader.upload(
            image?.path as string,
            {
                folder: 'glossywheels',
                resource_type,
            },
            (error: any, result: UploadApiResponse | undefined) => {
                if (error) {
                    return sendResponse(res, {
                        statusCode: httpStatus.BAD_REQUEST,
                        success: false,
                        message: 'Could not upload file to cloudinary',
                    });
                }

                fs.unlink(image?.path as string, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('File is deleted.');
                    }
                });

                sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'file uploaded successfully',
                    data: result?.secure_url,
                });
            }
        );
    } catch (error: any) {
        console.log(error);
        sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: 'Could not upload file to cloudinary',
        });
    }
};

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
    const result = await serviceServices.getSingleServiceFromDB(
        req.params.serviceName
    );

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
    fileUpload,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};

export default serviceControllers;
