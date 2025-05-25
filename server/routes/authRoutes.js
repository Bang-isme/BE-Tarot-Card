/**
 * Routes xử lý xác thực
 */
const express = require('express');
const router = express.Router();
const { facebookLogin, googleLogin, googleExchangeCode } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// API cung cấp cấu hình auth cho frontend
router.get('/config', (req, res) => {
  res.json({
    success: true,
    data: {
      googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
      authCallbackUrl: 'http://localhost:3000'
    }
  });
});

// Đăng nhập xã hội
router.post('/social/facebook', facebookLogin);
router.post('/social/google', googleLogin);
router.post('/social/google/exchange', googleExchangeCode);

// Kiểm tra xác thực (route này để kiểm tra token có hợp lệ không)
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user.id,
        name: req.user.display_name || req.user.username,
        email: req.user.email,
        avatar: req.user.avatar_url,
        role: req.user.role,
        isAdmin: req.user.role === 'admin'
      }
    }
  });
});

module.exports = router; 