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

// App creation
const app = express();

// Setting connection to database
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 7878;
// Enabling requests from any origin
app.use(cors({origin: '*'}));
// Setting parser for incoming JSON data
app.use(bodyParser.json());
// Setting static files directory
app.use(express.static('static'));
// Enabling handler for file uploads
app.use(fileUpload());
// Setting app routers
app.use('/api', movieRouter);
app.use('/api', userAuthRouter);
app.use('/api', userRouter);
// Setting data format
app.use(express.json());
// Setting app error handle
app.use(errorMiddleware)
// App starter
const startApp = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URI);
    console.log('Successfully connected to db')
    // Start server
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'prod') {
        console.log(`Server is running in production mode on port ${PORT}`);
      } else {
        console.log(`Server is running in development mode on port ${PORT}`);
      }
    });
  } catch (err) {
    console.log('Error connecting to database', err);
  }
}
startApp();