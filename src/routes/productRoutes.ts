import { RequestHandler, Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById as RequestHandler);
router.post('/', createProduct);
router.put('/:id', updateProduct as RequestHandler);
router.delete('/:id', deleteProduct as RequestHandler);

export default router;
