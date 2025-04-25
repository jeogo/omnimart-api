import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  category?: mongoose.Types.ObjectId | string;
  categoryId?: string;
  stock?: number;
  images?: string[];
  features?: string[];
  material?: string;
  care?: string;
  sizes?: string[];
  colors?: { name: string; value: string }[];
  isNewProduct?: boolean;
  discountId?: string | null;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

const ProductSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  categoryId: { type: String },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  features: [{ type: String }],
  material: { type: String },
  care: { type: String },
  sizes: [{ type: String }],
  colors: [{ name: String, value: String }],
  isNewProduct: { type: Boolean, default: false },
  discountId: { type: String, default: null },
  imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);
