import { Request, Response, NextFunction } from 'express';
import Statistics from '../models/statistics';

export const getStatistics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // يمكن تخصيص هذا لاحقًا ليحسب الإحصائيات مباشرة من قواعد البيانات
    const stats = await Statistics.findOne();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

export const updateStatistics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await Statistics.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
