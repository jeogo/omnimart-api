import { Router } from 'express';
import {
  getStoreSettings,
  updateStoreSettings
} from '../controllers/storeSettingsController';

const router = Router();

router.get('/', getStoreSettings);
router.put('/', updateStoreSettings);

export default router;
