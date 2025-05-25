const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const socialAuthController = require('../controllers/social.auth.controller');
const { validate } = require('../middleware/validator');

// User registration
router.post(
  '/register',
  [
    body('username').trim().isLength({ min: 3, max: 100 }).withMessage('Username must be between 3 and 100 characters'),
    body('email').trim().isEmail().withMessage('Must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validate
  ],
  authController.register
);

// User login
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
  ],
  authController.login
);

// Refresh token
router.post('/refresh-token', authController.refreshToken);

// Logout
router.post('/logout', authController.logout);

// Facebook login
router.post('/facebook/token', socialAuthController.facebookLogin);

module.exports = router; 