import { RequestHandler, Router } from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById as RequestHandler);
router.post('/', createCategory);
router.put('/:id', updateCategory as RequestHandler);
router.delete('/:id', deleteCategory as RequestHandler);

export default router;
