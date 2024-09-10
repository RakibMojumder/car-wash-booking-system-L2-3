import config from '../../config';
import axios from 'axios';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export type TPaymentPayload = {
    transactionId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    customerPhone: string;
};

export const initiatePayment = async (payload: TPaymentPayload) => {
    try {
        const paymentData = {
            store_id: config.amar_pay_store_id as string,
            signature_key: config.amar_pay_signature_key as string,
            tran_id: payload.transactionId,
            success_url: `${config.server_url}/payment/success?transactionId=${payload.transactionId}`,
            fail_url: `${config.server_url}/payment/failed?transactionId=${payload.transactionId}`,
            cancel_url: `${config.client_url}`,
            amount: payload.amount,
            currency: 'BDT',
            desc: 'Merchant Registration Payment',
            cus_name: payload.customerName,
            cus_email: payload.customerEmail,
            cus_add1: payload.customerAddress,
            cus_add2: 'Mohakhali DOHS',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1206',
            cus_country: 'Bangladesh',
            cus_phone: payload.customerPhone,
            type: 'json',
        };

        const res = await axios.post(
            config.amar_pay_base_url as string,
            paymentData
        );

        if (!res.data.result) {
            throw new AppError(httpStatus.BAD_REQUEST, res.data);
        }

        return res.data;
    } catch (error) {
        console.log(error);
        throw new AppError(httpStatus.BAD_REQUEST, 'Payment initiate failed');
    }
};
