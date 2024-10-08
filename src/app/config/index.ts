import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    server_url: process.env.SERVER_URL,
    client_url: process.env.CLIENT_URL,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    database_url: process.env.MONGODB_URI,
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_api_secret: process.env.CLOUD_API_SECRET,
    amar_pay_base_url: process.env.AMAR_PAY_BASE_URL,
    amar_pay_store_id: process.env.AMAR_PAY_STORE_ID,
    amar_pay_signature_key: process.env.AMAR_PAY_SIGNATURE_KEY,
    store_id: process.env.STORE_ID,
    store_pass: process.env.STORE_PASSWORD,
    sender_email: process.env.SENDER_EMAIL,
    email_pass: process.env.EMAIL_PASS,
};
