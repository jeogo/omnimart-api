import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import categoryRoutes from './routes/categoryRoutes';
import discountRoutes from './routes/discountRoutes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Production Middleware
app.set('trust proxy', 1); // إذا كنت تستخدم بروكسي (مثل Nginx أو Heroku)
app.use(helmet()); // تأمين الهيدر
app.use(compression()); // ضغط الاستجابات
app.use(cors({ origin: '*', credentials: true })); // السماح بالوصول من أي مكان
app.use(morgan('combined')); // لوج أكثر تفصيلًا
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 1000, // عدد الطلبات المسموح بها لكل IP
});
app.use(limiter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI as string, {
    // يمكن إضافة خيارات مثل useNewUrlParser حسب إصدار mongoose
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // إنهاء العملية إذا فشل الاتصال
  });

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/discounts', discountRoutes);

// Health check
app.get('/', (_req, res) => {
  res.status(200).json({ status: 'OmniMart API is running 🚀' });
});

// Error handler
app.use(errorHandler);

export default app;
