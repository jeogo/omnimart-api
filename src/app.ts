import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import categoryRoutes from './routes/categoryRoutes';
import discountRoutes from './routes/discountRoutes';
import userRoutes from './routes/userRoutes';
import statisticsRoutes from './routes/statisticsRoutes';
import storeSettingsRoutes from './routes/storeSettingsRoutes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/users', userRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/store-settings', storeSettingsRoutes);

// Base route for API testing
app.get('/', (req, res) => {
  res.send('OmniMart API is running');
});

// Error Handler
app.use(errorHandler);

export default app;
