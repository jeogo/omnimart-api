import mongoose, { Schema, Document } from 'mongoose';

export interface IStatistics extends Document {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
}

const StatisticsSchema: Schema = new Schema<IStatistics>({
  totalSales: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  totalUsers: { type: Number, default: 0 },
  totalProducts: { type: Number, default: 0 },
});

export default mongoose.model<IStatistics>('Statistics', StatisticsSchema);
