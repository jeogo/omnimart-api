import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  discount?: mongoose.Types.ObjectId;
  stock: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);
