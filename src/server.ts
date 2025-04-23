import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;

// Ensure Mongoose does not buffer commands if not connected
mongoose.set('bufferCommands', false);

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
