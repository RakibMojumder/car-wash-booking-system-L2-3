import { Router } from 'express';
import reviewControllers from './review.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/add-review', auth('admin', 'user'), reviewControllers.addReview);
router.get('/', reviewControllers.getAllReview);

const reviewRoute = router;

export default reviewRoute;
