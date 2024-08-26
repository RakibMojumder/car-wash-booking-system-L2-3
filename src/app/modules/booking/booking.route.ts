import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidationSchema } from './booking.validation';
import bookingControllers from './booking.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
    '/',
    auth('user'),
    validateRequest(bookingValidationSchema),
    bookingControllers.bookingService
);

router.get('/my-bookings', auth('user'), bookingControllers.getMyBookings);
router.get('/', auth('admin'), bookingControllers.getAllBooking);

const bookingRoute = router;

export default bookingRoute;
