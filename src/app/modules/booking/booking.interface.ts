import { Types } from 'mongoose';

export type TVehicleType =
    | 'car'
    | 'truck'
    | 'SUV'
    | 'van'
    | 'motorcycle'
    | 'bus'
    | 'electricVehicle'
    | 'hybridVehicle'
    | 'bicycle'
    | 'tractor';

export interface TBooking {
    customer: Types.ObjectId;
    service: Types.ObjectId;
    date: string;
    slot: Types.ObjectId;
    vehicleType: TVehicleType;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: number;
    registrationPlate: string;
}
