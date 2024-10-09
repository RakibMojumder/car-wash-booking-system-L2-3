/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// sslcommerz-lts.d.ts
declare module 'sslcommerz-lts' {
    interface PaymentInitResponse {
        GatewayPageURL: string;
        [key: string]: any; // To allow other fields
    }

    class SSLCommerzPayment {
        constructor(storeId: string, storePass: string, isLive: boolean);
        init(paymentData: any): Promise<PaymentInitResponse>;
    }

    export default SSLCommerzPayment;
}
