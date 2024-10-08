import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
    serviceValidationSchema,
    updateServiceValidationSchema,
} from './service.validation';
import serviceControllers from './service.controller';
import auth from '../../middlewares/auth';
import upload from '../../utils/multerFileUpload';

const router = Router();

router.post(
    '/',
    auth('admin'),
    validateRequest(serviceValidationSchema),
    serviceControllers.createService
);

router.post(
    '/file-upload',
    auth('admin', 'user'),
    upload.single('file'),
    serviceControllers.fileUpload
);

router.get('/', serviceControllers.getAllServices);
router.get('/:serviceName', serviceControllers.getSingleService);

router.patch(
    '/:id',
    auth('admin'),
    validateRequest(updateServiceValidationSchema),
    serviceControllers.updateService
);

router.delete('/:id', auth('admin'), serviceControllers.deleteService);

const serviceRoute = router;

export default serviceRoute;
