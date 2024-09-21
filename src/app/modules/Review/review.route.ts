import { Router } from 'express';
import reviewControllers from './review.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import reviewValidationSchema from './review.validation';

const router = Router();

router.post(
    '/add-review',
    auth('user'),
    validateRequest(reviewValidationSchema),
    reviewControllers.addReview
);
router.get('/', reviewControllers.getAllReview);

const reviewRoute = router;

export default reviewRoute;
