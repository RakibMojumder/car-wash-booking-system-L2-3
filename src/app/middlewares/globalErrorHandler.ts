/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorMessages } from '../interface/error';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';

    let errorMessages: TErrorMessages = [
        {
            path: '',
            message: 'something went wrong',
        },
    ];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (err.name === 'CastError') {
        const simplifiedError = handleCastError(err);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (err.code === 11000) {
        // Extract value within double quotes using regex
        const match = err.message.match(/"([^"]*)"/);

        // The extracted value will be in the first capturing group
        const extractedMessage = match && match[1];
        message = `${extractedMessage} is Already exists`;
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = [
            {
                path: '',
                message: err.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err.message;
        message = err.message;
        errorMessages = [
            {
                path: '',
                message: err.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        // err,
        errorMessages: errorMessages,
        stack: config.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default globalErrorHandler;
