import express from 'express';
import {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getUrlStats,
  getMyUrls
} from '../controllers/urlController.js';

import { protect , optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', optionalAuth , createShortUrl);
router.get('/', protect, getMyUrls);
router.get('/:shortCode', getOriginalUrl);
router.put('/:shortCode', protect , updateShortUrl);
router.delete('/:shortCode', protect , deleteShortUrl);
router.get('/:shortCode/stats', protect , getUrlStats);

export default router;

