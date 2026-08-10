import express from 'express';
import {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getUrlStats
} from '../controllers/urlController.js';

const router = express.Router();

router.post('/', createShortUrl);
router.get('/:shortCode', getOriginalUrl);
router.put('/:shortCode', updateShortUrl);
router.delete('/:shortCode', deleteShortUrl);
router.get('/:shortCode/stats', getUrlStats);

export default router;

