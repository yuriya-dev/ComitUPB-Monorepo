import { Request, Response, NextFunction } from 'express';
import { AppError, NotFoundError } from '../utils/errors';

// 404 Route Not Found Middleware
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Endpoint tidak ditemukan: ${req.method} ${req.originalUrl}`);
  next(error);
};

// Global Error Handler Middleware
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : (err.statusCode || 500);
  const message = err.message || 'Terjadi kesalahan pada server.';

  console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${statusCode}: ${message}`);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { error: err.message, stack: err.stack })
  });
};
