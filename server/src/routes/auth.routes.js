import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes không cần xác thực
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);

// Routes cần xác thực
router.use(protect);
router.get('/logout', logout);
router.get('/me', getMe);
router.put('/update-details', updateDetails);
router.put('/update-password', updatePassword);

export default router; 