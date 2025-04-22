import { Request, Response, NextFunction } from 'express';

// أنواع الخطأ
interface ErrorResponse {
  message: string;
  stack?: string;
  statusCode?: number;
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: ErrorResponse = {
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  };

  console.error(`${err.name}: ${err.message}`);

  // خطأ المصادقة من mongoose (حقل فريد مكرر)
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    error.message = 'البيانات المدخلة موجودة بالفعل';
    res.status(400).json(error);
    return;
  }

  // خطأ التحقق من Mongoose
  if (err.name === 'ValidationError') {
    error.message = 'خطأ في البيانات المدخلة';
    res.status(400).json(error);
    return;
  }

  // خطأ ObjectId غير صالح
  if (err.name === 'CastError') {
    error.message = 'معرّف العنصر غير صالح';
    res.status(400).json(error);
    return;
  }

  res.status(500).json(error);
};

export default errorHandler;
