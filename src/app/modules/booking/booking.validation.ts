import { z } from 'zod';
import VehicleType from './booking.constant';

export const bookingValidationSchema = z.object({
    body: z.object({
        service: z.string(),
        slot: z.string(),
        vehicleType: z.enum(VehicleType as [string, ...string[]]),
        vehicleBrand: z.string(),
        vehicleModel: z.string(),
        manufacturingYear: z.number(),
        registrationPlate: z.string(),
    }),
});
