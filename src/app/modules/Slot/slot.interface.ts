import { Types } from 'mongoose';

// export type TIsBooked = 'available' | 'booked' | 'canceled';

export interface TSlot {
    service: Types.ObjectId;
    startTime: string;
    endTime: string;
}
