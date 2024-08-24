import { Router } from 'express';
import authRouter from '../modules/Auth/auth.route';
import serviceRouter from '../modules/Service/service.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
