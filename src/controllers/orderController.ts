import { Request, Response, NextFunction } from 'express';
import Order from '../models/order';

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('products.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Order API req.body:', JSON.stringify(req.body, null, 2));
  try {
    // Validate products array and product field
    if (!Array.isArray(req.body.products) || req.body.products.length === 0) {
      return res.status(400).json({ message: 'products array is required and cannot be empty.' });
    }
    for (const [i, item] of req.body.products.entries()) {
      if (!item.product || typeof item.product !== 'string' || item.product.length < 10) {
        return res.status(400).json({ message: `products[${i}].product is required and must be a valid product ObjectId.` });
      }
    }
    req.body.products = req.body.products.map((item: any) => {
      if (item.product && typeof item.product === 'object' && item.product._id) {
        return { ...item, product: item.product._id };
      }
      return item;
    });
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    next(err);
  }
};
