import { Request, Response, NextFunction } from 'express';
import StoreSettings from '../models/storeSettings';

export const getStoreSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await StoreSettings.findOne();
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

export const updateStoreSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await StoreSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(settings);
  } catch (err) {
    next(err);
  }
};
