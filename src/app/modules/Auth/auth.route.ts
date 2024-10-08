import { Router } from 'express';
import authControllers from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userSchemaValidation } from '../User/user.validation';
import { userLoginSchemaValidation } from './auth.validation';

const router = Router();

router.post(
    '/create-user',
    validateRequest(userSchemaValidation),
    authControllers.createUser
);

router.post(
    '/login',
    validateRequest(userLoginSchemaValidation),
    authControllers.loginUser
);

router.post('/refresh-token', authControllers.refreshToken);

const authRoute = router;

export default authRoute;
