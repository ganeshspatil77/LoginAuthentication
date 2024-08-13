import express from 'express';
import { loginRouter } from './routes/login';
import { userRouter } from './routes/user';
import { authMiddleware } from './middelwares/auth';
import { Response, Request, NextFunction, Errback } from 'express';
const app = express();

// (async () => {
//     await connectToMysql();
// })();


app.use(express.json());

app.use('/user', loginRouter);
app.use('/user', loginRouter);
app.use(authMiddleware);
app.use('/user', userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send('Something broke!')
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server is on port ${port}.`);
})