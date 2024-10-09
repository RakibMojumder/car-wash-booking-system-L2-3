import { Router } from 'express';
import paymentControllers from './payment.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
    '/success',
    auth('admin', 'user'),
    paymentControllers.updatePaymentStatus
);
router.post(
    '/failed',
    auth('admin', 'user'),
    paymentControllers.deleteBookingForFailedPayment
);

const paymentRoute = router;

export default paymentRoute;
