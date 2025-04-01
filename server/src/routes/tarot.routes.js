import express from 'express';
import {
  getAllCards,
  getCard,
  getDailyTarot,
  createReading,
  getReading,
  getUserReadings
} from '../controllers/tarot.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/cards', getAllCards);
router.get('/cards/:id', getCard);
router.get('/daily', getDailyTarot);

// Protected routes
router.use('/readings', protect);
router.route('/readings')
  .post(createReading)
  .get(getUserReadings);
router.get('/readings/:id', getReading);

export default router; 