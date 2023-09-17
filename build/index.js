import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import movieRouter from './routers/movieRouter.js';
import userAuthRouter from './routers/userAuthRouter.js';
import userRouter from './routers/userRouter.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
const app = express();
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 7878;
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use(fileUpload());
app.use('/api', movieRouter);
app.use('/api', userAuthRouter);
app.use('/api', userRouter);
app.use(express.json());
app.use(errorMiddleware);
const startApp = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(MONGO_URI);
        console.log('Successfully connected to db');
        app.listen(PORT, () => {
            if (process.env.NODE_ENV === 'prod') {
                console.log(`Server is running in production mode on port ${PORT}`);
            }
            else {
                console.log(`Server is running in development mode on port ${PORT}`);
            }
        });
    }
    catch (err) {
        console.log('Error connecting to database', err);
    }
};
startApp();
//# sourceMappingURL=index.js.map