import { Router } from 'express';
import authRouter from '../modules/Auth/auth.route';
import serviceRouter from '../modules/Service/service.route';
import slotRoute from '../modules/Slot/slot.route';
import bookingRoute from '../modules/booking/booking.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
