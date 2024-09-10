import { Types } from 'mongoose';

export type TVehicleType =
    | 'car'
    | 'truck'
    | 'suv'
    | 'van'
    | 'motorcycle'
    | 'bus'
    | 'electric vehicle'
    | 'hybrid vehicle'
    | 'bicycle'
    | 'tractor';

export type TPaymentStatus = 'Paid' | 'Pending' | 'Failed';
export type TBookingStatus = 'Pending' | 'Completed' | 'Canceled';

export interface TBooking {
    customer: Types.ObjectId;
    service: Types.ObjectId;
    date: string;
    slot: Types.ObjectId;
    vehicleType: TVehicleType;
    vehicleBrand: string;
    registrationPlate: string;
    paymentStatus: TPaymentStatus;
    bookingStatus: TBookingStatus;
    transactionId: string;
}
