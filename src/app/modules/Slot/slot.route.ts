import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { slotValidationSchema } from './slot.validation';
import slotControllers from './slot.controller';

const router = Router();

router.post(
    '/',
    validateRequest(slotValidationSchema),
    slotControllers.createSlot
);

const slotRoute = router;

export default slotRoute;