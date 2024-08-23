import { z } from 'zod';
import { UserRole } from './user.constants';

export const userRoleSchema = z.enum(UserRole as [string, ...string[]]);

export const userSchemaValidation = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required field',
        }),
        email: z
            .string({
                required_error: 'Email is required field',
            })
            .email('Invalid email address'),
        password: z
            .string({
                required_error: 'Password is required field',
            })
            .min(6, { message: 'Password must be at least 6 characters long' }),
        phone: z
            .string({
                required_error: 'Phone number is required field',
            })
            .min(11, {
                message: 'Phone number must be at least 11 digits long',
            }),
        role: userRoleSchema,
        address: z.string({
            required_error: 'Address is required field',
        }),
    }),
});

// export type TUser = z.infer<typeof TUserSchemaValidation>['body'];
