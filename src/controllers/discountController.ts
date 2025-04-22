import { Request, Response, NextFunction } from 'express';
import Discount from '../models/discount';

export const getDiscounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (err) {
    next(err);
  }
};

export const getDiscountById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) return res.status(404).json({ message: 'Discount not found' });
    res.json(discount);
  } catch (err) {
    next(err);
  }
};

export const createDiscount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json(discount);
  } catch (err) {
    next(err);
  }
};

export const updateDiscount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!discount) return res.status(404).json({ message: 'Discount not found' });
    res.json(discount);
  } catch (err) {
    next(err);
  }
};

export const deleteDiscount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) return res.status(404).json({ message: 'Discount not found' });
    res.json({ message: 'Discount deleted' });
  } catch (err) {
    next(err);
  }
};
