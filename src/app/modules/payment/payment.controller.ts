import catchAsync from '../../utils/catchAsync';
import paymentServices from './payment.service';

const updatePaymentStatus = catchAsync(async (req, res) => {
    const { transactionId } = req.query;
    const result = await paymentServices.updatePaymentStatusIntoDB(
        transactionId as string
    );

    if (result) {
        return res.redirect('http://localhost:5173/');
    }
});

const deleteBookingForFailedPayment = catchAsync(async (req, res) => {
    const { transactionId } = req.query;
    const result = await paymentServices.deleteBookingForFailedPaymentFromDB(
        transactionId as string
    );

    if (result) {
        return res.redirect('http://localhost:5173/');
    }
});

const paymentControllers = {
    updatePaymentStatus,
    deleteBookingForFailedPayment,
};

export default paymentControllers;
