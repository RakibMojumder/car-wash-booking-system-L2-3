import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { slotValidationSchema } from './slot.validation';
import slotControllers from './slot.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
    '/',
    auth('admin'),
    validateRequest(slotValidationSchema),
    slotControllers.createSlot
);

router.get('/availability', slotControllers.getAvailableSlots);

const slotRoute = router;

export default slotRoute;
