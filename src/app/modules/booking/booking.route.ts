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
    bookingControllers.createBooking
);

router.get('/my-bookings', auth('user'), bookingControllers.getMyBookings);
router.get('/', auth('admin'), bookingControllers.getAllBooking);
router.get(
    '/recent-booking',
    auth('admin'),
    bookingControllers.getRecentBookings
);
router.get(
    '/user-recent-booking',
    auth('user'),
    bookingControllers.getUserRecentBookings
);
router.get('/:transactionId', bookingControllers.getSingleBookingDB);

const bookingRoute = router;

export default bookingRoute;
