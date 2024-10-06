import { z } from 'zod';
import VehicleType from './booking.constant';

export const bookingValidationSchema = z.object({
    body: z.object({
        service: z
            .string({
                required_error: 'service is required field',
            })
            .min(1),
        slot: z
            .string({
                required_error: 'slot is required field',
            })
            .min(1),
        date: z
            .string({
                required_error: 'date is required field',
            })
            .min(1),
        vehicleType: z.enum(VehicleType as [string, ...string[]]),
        vehicleBrand: z
            .string({
                required_error: 'vehicle brand is required field',
            })
            .min(1),
        registrationPlate: z
            .string({
                required_error: 'registration plage is required field',
            })
            .min(1),
    }),
});
