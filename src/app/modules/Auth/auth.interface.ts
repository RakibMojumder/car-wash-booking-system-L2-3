import { TUserRole } from '../User/user.interface';

export interface TUserLogin {
    email: string;
    password: string;
}

export interface TJwtPayloadData {
    email: string;
    role: TUserRole;
}
