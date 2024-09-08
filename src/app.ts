import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(
    cors({
        origin: ['https://glossy-wheels.vercel.app', 'http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
    res.send('hello from api');
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
