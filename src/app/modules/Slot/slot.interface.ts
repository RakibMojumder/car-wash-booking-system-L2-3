// service: Reference to the specific service being booked.
// date: Date of the booking.
// startTime: Start time of the slot.
// endTime: Approximate end time of the slot.
// isBooked: Status of the slot (available, booked, canceled).

import { Types } from 'mongoose';

export type TIsBooked = 'available' | 'booked' | 'canceled';

export interface TSlot {
    service: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: TIsBooked;
}
