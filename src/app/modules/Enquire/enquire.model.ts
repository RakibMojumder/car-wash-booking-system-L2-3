import { model, Schema } from 'mongoose';
import { TEnquireTypes } from './enquire.interface';

const enquireSchema = new Schema<TEnquireTypes>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    services: {
        type: [String],
        required: false,
    },
    question: {
        type: String,
        required: false,
    },
});

const Enquire = model<TEnquireTypes>('enquires', enquireSchema);

export default Enquire;
