import { Router } from 'express';
import {
  getStatistics,
  updateStatistics
} from '../controllers/statisticsController';

const router = Router();

router.get('/', getStatistics);
router.put('/', updateStatistics);

export default router;
