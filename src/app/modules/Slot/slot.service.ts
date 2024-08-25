import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Service from '../Service/service.model';
import { TSlot } from './slot.interface';
import generateSlots from './slot.utils';
import Slot from './slot.model';

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

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
    const result = await Slot.find({
        isBooked: 'available',
        date: query.date,
        service: query.serviceId,
    }).populate('service');

    return result;
};

const slotServices = { createSlotIntoDB, getAvailableSlotsFromDB };

export default slotServices;
