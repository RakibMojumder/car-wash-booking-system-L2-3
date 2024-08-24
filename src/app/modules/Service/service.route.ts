import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
    serviceValidationSchema,
    updateServiceValidationSchema,
} from './service.validation';
import serviceControllers from './service.controller';
import serviceServices from './service.service';

const router = Router();

router.post(
    '/',
    validateRequest(serviceValidationSchema),
    serviceControllers.createService
);

router.get('/', serviceControllers.getAllServices);
router.get('/:id', serviceControllers.getSingleService);

router.patch(
    '/:id',
    validateRequest(updateServiceValidationSchema),
    serviceControllers.updateService
);

router.delete('/:id', serviceControllers.deleteService);

const serviceRouter = router;

export default serviceRouter;
