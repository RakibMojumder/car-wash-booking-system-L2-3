import { UserRole } from './user.constants';

export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: TUserRole;
    address: string;
}

export type TUserRole = keyof typeof UserRole;
