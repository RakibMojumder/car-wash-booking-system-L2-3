import jwt from 'jsonwebtoken';
import { TJwtPayloadData } from './auth.interface';
import config from '../../config';

const generateToken = (payload: TJwtPayloadData) => {
    return jwt.sign(payload, config.jwt_access_token as string, {
        expiresIn: config.jwt_access_expires_in,
    });
};

export default generateToken;
