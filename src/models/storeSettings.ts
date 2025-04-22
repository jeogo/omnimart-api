import mongoose, { Schema, Document } from 'mongoose';

export interface IStoreSettings extends Document {
  storeName: string;
  currency: string;
  address: string;
  phone: string;
  email: string;
}

const StoreSettingsSchema: Schema = new Schema<IStoreSettings>({
  storeName: { type: String, required: true },
  currency: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
});

export default mongoose.model<IStoreSettings>('StoreSettings', StoreSettingsSchema);
