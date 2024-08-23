import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { UserRole } from './user.constants';

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        phone: {
            type: String,
            required: true,
            minlength: 11,
        },
        address: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: UserRole,
            required: true,
        },
    },
    { timestamps: true }
);

const User = model<TUser>('users', userSchema);

export default User;
