import { model, Schema } from 'mongoose';
import { TService } from './service.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const serviceSchema = new Schema<TService>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});

// check if that service already exists before create a new one
serviceSchema.pre('save', async function (next) {
    const isServiceExists = await Service.findOne({ name: this.name });

    if (isServiceExists) {
        throw new AppError(
            httpStatus.CONFLICT,
            `${this.name} service already exists`
        );
    }

    next();
});

// prevent to get deleted service
serviceSchema.pre('find', async function (next) {
    this.find({ isDeleted: false });
    next();
});

// prevent to get deleted service
serviceSchema.pre('findOne', async function (next) {
    this.findOne({ isDeleted: false });
    next();
});

const Service = model<TService>('services', serviceSchema);

export default Service;
