import { Router } from 'express';
import paymentControllers from './payment.controller';

const router = Router();

router.post('/success', paymentControllers.updatePaymentStatus);
router.post('/failed', paymentControllers.deleteBookingForFailedPayment);

const paymentRoute = router;

export default paymentRoute;
