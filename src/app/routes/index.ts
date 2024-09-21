import { Router } from 'express';
import authRoute from '../modules/Auth/auth.route';
import serviceRoute from '../modules/Service/service.route';
import slotRoute from '../modules/Slot/slot.route';
import bookingRoute from '../modules/Booking/booking.route';
import paymentRoute from '../modules/payment/payment.route';
import reviewRoute from '../modules/Review/review.route';
import userRoute from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/services',
        route: serviceRoute,
    },
    {
        path: '/slots',
        route: slotRoute,
    },
    {
        path: '/bookings',
        route: bookingRoute,
    },
    {
        path: '/payment',
        route: paymentRoute,
    },
    {
        path: '/reviews',
        route: reviewRoute,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
