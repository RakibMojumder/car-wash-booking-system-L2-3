import {
    TBookingStatus,
    TPaymentStatus,
    TVehicleType,
} from './booking.interface';

export const PaymentStatus: TPaymentStatus[] = ['Paid', 'Pending', 'Failed'];
export const BookingStatus: TBookingStatus[] = [
    'Pending',
    'Completed',
    'Canceled',
];

const VehicleType: TVehicleType[] = [
    'car',
    'truck',
    'suv',
    'van',
    'motorcycle',
    'bus',
    'electric vehicle',
    'hybrid vehicle',
    'bicycle',
    'tractor',
];

export default VehicleType;
