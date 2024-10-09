import { Router } from 'express';
import enquireControllers from './enquire.controllers';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/', enquireControllers.createEnquire);

router.get('/', auth('admin'), enquireControllers.getAllEnquires);

const enquireRoute = router;

export default enquireRoute;
