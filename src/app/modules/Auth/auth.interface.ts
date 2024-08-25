import { Types } from 'mongoose';
import { TUserRole } from '../User/user.interface';

export interface TUserLogin {
    email: string;
    password: string;
}

export interface TJwtPayloadData {
    id: Types.ObjectId;
    email: string;
    role: TUserRole;
}
