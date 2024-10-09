import { Router } from 'express';
import enquireControllers from './enquire.controllers';

const router = Router();

router.post('/', enquireControllers.createEnquire);

const enquireRoute = router;

export default enquireRoute;
