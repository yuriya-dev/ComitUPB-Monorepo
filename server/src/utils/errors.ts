export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource tidak ditemukan') {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Permintaan tidak valid') {
    super(message, 400);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Terjadi kesalahan pada server') {
    super(message, 500);
  }
}
