import Booking from '../Booking/booking.model';

const updatePaymentStatusIntoDB = async (transactionId: string) => {
    const updateBooking = await Booking.findOneAndUpdate(
        { transactionId },
        { paymentStatus: 'Paid' },
        { upsert: true }
    );

    return updateBooking;
};

const deleteBookingForFailedPaymentFromDB = async (transactionId: string) => {
    const deleteBooking = await Booking.findOneAndDelete({ transactionId });
    return deleteBooking;
};

const paymentServices = {
    updatePaymentStatusIntoDB,
    deleteBookingForFailedPaymentFromDB,
};

export default paymentServices;
