import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Service from '../Service/service.model';
import { TSlot } from './slot.interface';
import generateSlots from './slot.utils';
import Slot from './slot.model';
import mongoose from 'mongoose';

const createSlotIntoDB = async (payload: TSlot) => {
    // check is service exists
    const service = await Service.findOne({ _id: payload.service });

    if (!service) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service id is invalid');
    }

    const totalDuration =
        (Number(payload.endTime.split(':')[0]) -
            Number(payload.startTime.split(':')[0])) *
        60;

    const totalSlot = totalDuration / service.duration;
    const totalDurationForOneSlot = totalDuration / totalSlot;

    const slots = generateSlots(
        payload.startTime,
        payload.endTime,
        totalDurationForOneSlot
    );

    // crete slots in the database
    const result = await Promise.all(
        slots.map(async (slot) => {
            const data = {
                ...payload,
                startTime: slot.StartTime,
                endTime: slot.EndTime,
            };
            return await Slot.create(data);
        })
    );

    return result;
};

const getAllSlotsFromDB = async () => {
    const slots = await Slot.aggregate([
        {
            $match: {},
        },
        {
            $lookup: {
                from: 'services',
                foreignField: '_id',
                localField: 'service',
                as: 'service',
            },
        },
        {
            $unwind: '$service',
        },
        {
            $group: { _id: '$service.name', allSlots: { $push: '$$ROOT' } },
        },
        {
            $unwind: '$allSlots',
        },
        {
            $project: { 'allSlots.service': 0 },
        },
        {
            $group: { _id: '$_id', slots: { $push: '$allSlots' } },
        },
    ]);

    return slots;
};

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
    const service = new mongoose.Types.ObjectId(query.serviceId as string);
    const availableSlots = Slot.aggregate([
        { $match: { service } },
        {
            $lookup: {
                from: 'bookings',
                foreignField: 'slot',
                localField: '_id',
                as: 'bookingInfo',
            },
        },
        {
            $match: {
                'bookingInfo.date': { $ne: query.date },
            },
        },
        { $project: { startTime: 1, endTime: 1 } },
    ]);

    return availableSlots;
};

const slotServices = {
    createSlotIntoDB,
    getAllSlotsFromDB,
    getAvailableSlotsFromDB,
};

export default slotServices;
