import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';
import VehicleType from './booking.constant';

const bookingSchema = new Schema<TBooking>(
    {
        customer: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        service: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'services',
        },
        slot: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'slots',
        },
        date: {
            type: String,
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
            enum: VehicleType,
        },
        vehicleBrand: {
            type: String,
            required: true,
        },
        vehicleModel: {
            type: String,
            required: true,
        },
        manufacturingYear: {
            type: Number,
            required: true,
        },
        registrationPlate: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Booking = model<TBooking>('bookings', bookingSchema);

export default Booking;
