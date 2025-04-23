import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  wilaya: string;
  products: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  totalAmount: number;
  shippingCost: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
}

const OrderSchema: Schema = new Schema<IOrder>({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerAddress: { type: String, required: true },
  wilaya: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      size: { type: String },
      color: { type: String }
    }
  ],
  totalAmount: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
