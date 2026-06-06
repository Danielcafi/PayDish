import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRouter from './routes/auth';
import menuRouter from './routes/menu';
import paymentRouter from './routes/payment';
import qrRouter from './routes/qr';
import healthRouter from './routes/health';
import { json } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(json());

app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/qr', qrRouter);
app.use('/health', healthRouter);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => console.error('Error during Data Source initialization:', error));
