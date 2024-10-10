import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { sendMail } from '../../utils/sendMail';
import { TEnquireTypes } from './enquire.interface';
import Enquire from './enquire.model';

const createEnquireIntoDB = async (payload: TEnquireTypes) => {
    const result = await Enquire.create(payload);
    return result;
};

const getAllEnquiresFromDB = async () => {
    const result = await Enquire.find().sort('-createdAt');
    return result;
};

const sendEnquireReply = async (id: string, text: string) => {
    if (!text) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Text is required field');
    }

    // check if enquire exists
    const enquire = await Enquire.findById(id);

    if (!enquire) {
        throw new AppError(httpStatus.NOT_FOUND, 'Enquire not found');
    }

    await sendMail({
        to: enquire.email,
        subject: 'Reply to your concern',
        text,
    });

    const updateEnquire = await Enquire.findByIdAndUpdate(
        id,
        { replied: true },
        { new: true }
    );
    return updateEnquire;
};

const enquireServices = {
    createEnquireIntoDB,
    getAllEnquiresFromDB,
    sendEnquireReply,
};

export default enquireServices;
