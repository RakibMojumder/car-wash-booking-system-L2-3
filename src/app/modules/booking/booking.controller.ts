import catchAsync from '../../utils/catchAsync';
import bookingServices from './booking.service';

const bookingService = catchAsync(async (req, res) => {
    const payload = { ...req.body, customer: req.user.id };
    const result = await bookingServices.bookingServiceIntoDB(payload);
    res.json(result);
});

const bookingControllers = { bookingService };

export default bookingControllers;
