import nodemailer from 'nodemailer';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

type TPayload = {
    to: string;
    subject: string;
    text: string;
};

const auth = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: config.sender_email,
        pass: config.email_pass,
    },
});

export const sendMail = async (payload: TPayload) => {
    const receiver = {
        from: config.sender_email,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
    };

    try {
        const res = await auth.sendMail(receiver);
        return res.messageId;
    } catch (error) {
        console.log(error);
        throw new AppError(httpStatus.BAD_REQUEST, 'something went wrong');
    }
};
