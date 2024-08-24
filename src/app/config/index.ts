import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    database_url: process.env.MONGODB_URI,
};
