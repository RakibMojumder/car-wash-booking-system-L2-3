import { UserRole } from './user.constants';

export interface TUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    profile?: string;
    role: TUserRole;
    address: string;
    isDeleted: boolean;
}

export type TUserRole = keyof typeof UserRole;
