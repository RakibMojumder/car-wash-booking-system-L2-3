import jwt from 'jsonwebtoken';
import { TJwtPayloadData } from './auth.interface';

const generateToken = (
    payload: TJwtPayloadData,
    accessToken: string,
    expiresIn: string
) => {
    return jwt.sign(payload, accessToken, {
        expiresIn,
    });
};

export default generateToken;
