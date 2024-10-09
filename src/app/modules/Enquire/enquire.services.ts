import { TEnquireTypes } from './enquire.interface';
import Enquire from './enquire.model';

const createEnquireIntoDB = async (payload: TEnquireTypes) => {
    const result = await Enquire.create(payload);
    return result;
};

const getAllEnquiresFromDB = async () => {
    const result = await Enquire.find({});
    return result;
};

const enquireServices = { createEnquireIntoDB, getAllEnquiresFromDB };

export default enquireServices;
