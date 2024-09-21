import { Router } from 'express';
import userControllers from './user.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', auth('admin'), userControllers.getAllUsers);

router.get('/login-user', auth('admin', 'user'), userControllers.getLoginUser);

router.patch('/', auth('user', 'admin'), userControllers.updateUser);

const userRoute = router;

export default userRoute;
