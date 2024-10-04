import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import paymentServices from './payment.service';

const updatePaymentStatus = catchAsync(async (req, res) => {
    const { transactionId } = req.query;
    const result = await paymentServices.updatePaymentStatusIntoDB(
        transactionId as string
    );

    if (result) {
        return res.redirect(
            `${config.client_url}/payment-success/${transactionId}`
        );
    }
});

const deleteBookingForFailedPayment = catchAsync(async (req, res) => {
    const { transactionId } = req.query;
    const result = await paymentServices.deleteBookingForFailedPaymentFromDB(
        transactionId as string
    );

    if (result) {
        return res.redirect(`${config.client_url}/payment-failed`);
    }
});

const paymentControllers = {
    updatePaymentStatus,
    deleteBookingForFailedPayment,
};

export default paymentControllers;
