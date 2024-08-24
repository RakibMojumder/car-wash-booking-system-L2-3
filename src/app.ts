import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
    res.send('hello from api');
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
