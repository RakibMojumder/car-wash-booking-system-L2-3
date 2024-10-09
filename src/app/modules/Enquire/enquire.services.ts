import { TEnquireTypes } from './enquire.interface';
import Enquire from './enquire.model';

const createEnquireIntoDB = async (payload: TEnquireTypes) => {
    const result = await Enquire.create(payload);
    return result;
};

const enquireServices = { createEnquireIntoDB };

export default enquireServices;
