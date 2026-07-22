import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes';
import { globalErrorHandler, notFoundHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount API Routes
app.use('/api', apiRouter);

// 404 Route Not Found Handler
app.use(notFoundHandler);

// Global Error Handler Middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🚀 ComitUPB Backend Express Server running on http://localhost:${PORT}`);
});
