export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: TUserRole;
    address: string;
}

export type TUserRole = 'admin' | 'user';
