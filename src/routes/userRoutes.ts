import { Router, RequestHandler } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById as RequestHandler);
router.post('/', createUser);
router.put('/:id', updateUser as RequestHandler);
router.delete('/:id', deleteUser as RequestHandler);

export default router;
