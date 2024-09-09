import { model, Schema } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
    {
        service: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'services',
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Slot = model<TSlot>('slots', slotSchema);

export default Slot;
