import { model, Schema } from 'mongoose';
import { TSlot } from './slot.interface';
import { IsBooked } from './slot.constant';

const slotSchema = new Schema<TSlot>(
    {
        service: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'services',
        },
        date: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        isBooked: {
            type: String,
            enum: IsBooked,
        },
    },
    { timestamps: true }
);

const Slot = model<TSlot>('slots', slotSchema);

export default Slot;
