import catchAsync from '../../utils/catchAsync';
import userServices from './auth.service';

const createUser = catchAsync(async (req, res) => {
    const result = await userServices.createUserIntoDB(req.body);

    // if()
});
