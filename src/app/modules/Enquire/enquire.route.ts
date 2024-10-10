import { Router } from 'express';
import enquireControllers from './enquire.controllers';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/', enquireControllers.createEnquire);
router.post('/send-reply/:id', auth('admin'), enquireControllers.enquireReply);

router.get('/', auth('admin'), enquireControllers.getAllEnquires);

const enquireRoute = router;

export default enquireRoute;
