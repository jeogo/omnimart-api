import mongoose, { Schema, Document } from 'mongoose';

export interface IDiscount extends Document {
  code: string;
  percentage: number;
  expiresAt: Date;
}

const DiscountSchema: Schema = new Schema<IDiscount>({
  code: { type: String, required: true },
  percentage: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<IDiscount>('Discount', DiscountSchema);
