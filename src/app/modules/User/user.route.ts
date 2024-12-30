import { Router } from 'express';
import userControllers from './user.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', auth('admin'), userControllers.getAllUsers);
router.get('/login-user', auth('admin', 'user'), userControllers.getLoginUser);
router.get(
    '/admin-overview',
    auth('admin'),
    userControllers.getAdminOverviewData
);
router.get('/user-overview', auth('user'), userControllers.getUserOverviewData);

router.patch('/make-admin/:id', auth('admin'), userControllers.makeAdmin);
router.patch('/:id', auth('user', 'admin'), userControllers.updateUser);

router.delete('/:id', auth('admin'), userControllers.deleteUser);

const userRoute = router;

export default userRoute;
