import { UserRole } from './user.constants';

export interface TUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: TUserRole;
    address: string;
}

export type TUserRole = keyof typeof UserRole;
