import { RequestHandler, Router } from 'express';
import {
  getDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount
} from '../controllers/discountController';

const router = Router();

router.get('/', getDiscounts);
router.get('/:id', getDiscountById as RequestHandler);
router.post('/', createDiscount);
router.put('/:id', updateDiscount as RequestHandler);
router.delete('/:id', deleteDiscount as RequestHandler);

export default router;
