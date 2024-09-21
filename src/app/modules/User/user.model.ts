import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { UserRole } from './user.constants';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
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
            select: 0,
        },
        phone: {
            type: String,
            required: true,
            minlength: 11,
        },
        profile: {
            type: String,
            default: 'https://github.com/shadcn.png',
        },
        address: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: UserRole,
            default: 'user',
            required: true,
        },
    },
    { timestamps: true }
);

// check if user already exits in the database
userSchema.pre('save', async function (next) {
    const isUserExist = await User.findOne({ email: this.email });

    if (isUserExist) {
        throw new AppError(
            httpStatus.CONFLICT,
            `${this.email} is already exists`
        );
    }

    next();
});

// hashed user password before save in the database
userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
    );
    this.password = hashedPassword;
    next();
});

// remove password from doc after saving doc
userSchema.post('save', async function (doc, next) {
    doc.password = '';
    next();
});

// userSchema.pre('insertMany', async function (next, docs) {
//     try {
//         const promise = docs.map(async (doc: TUser) => {
//             const hashedPassword = await bcrypt.hash(
//                 doc.password,
//                 Number(config.bcrypt_salt_rounds)
//             );
//             doc.password = hashedPassword;
//             return doc;
//         });

//         await Promise.all(promise);

//         next();
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//         console.log(error);
//         next(error);
//     }
// });

const User = model<TUser>('users', userSchema);

export default User;
