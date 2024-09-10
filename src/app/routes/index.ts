import { Router } from 'express';
import authRouter from '../modules/Auth/auth.route';
import serviceRouter from '../modules/Service/service.route';
import slotRoute from '../modules/Slot/slot.route';
import bookingRoute from '../modules/Booking/booking.route';
import paymentRoute from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/services',
        route: serviceRouter,
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
