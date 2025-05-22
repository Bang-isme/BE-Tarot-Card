const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const tarotReadingController = require('../controllers/tarotReading.controller');
const middleware = require('../middleware');
const { authenticate, restrictTo } = middleware.auth;
const { validate } = middleware.validator;
const { authJwt } = middleware;
const tarotController = require('../controllers/tarot.controller');

// Get recent readings (public - limited data)
router.get('/recent', tarotReadingController.getRecentReadings);

// Protected routes
router.use(authenticate);

// Get user's readings
router.get('/my-readings', tarotReadingController.getUserReadings);

// Create a new standard reading
router.post(
  '/',
  [
    body('topic_id').isInt().withMessage('Topic ID must be an integer'),
    body('spread_id').isInt().withMessage('Spread ID must be an integer'),
    body('question').optional().isString().withMessage('Question must be a string'),
    validate
  ],
  tarotReadingController.createReading
);

// Create a new AI reading
router.post(
  '/ai',
  [
    body('topicId').isInt().withMessage('Topic ID must be an integer'),
    body('spreadId').isInt().withMessage('Spread ID must be an integer'),
    body('question').optional().isString().withMessage('Question must be a string'),
    body('selectedCards').isArray().withMessage('Selected cards must be an array'),
    validate
  ],
  tarotReadingController.performAIReading
);

// Get a specific reading by ID
router.get('/:id', tarotReadingController.getReadingById);

// Generate AI interpretation for a reading
router.post(
  '/:id/interpretations',
  [authJwt.verifyToken],
  tarotReadingController.generateInterpretation
);

// Get all interpretations for a reading
router.get(
  '/:id/interpretations',
  [authJwt.verifyToken],
  tarotReadingController.getReadingInterpretations
);

// Routes for admin users
router.use(restrictTo('admin'));

// Get all readings (admin only)
router.get('/', tarotReadingController.getAllReadings);

// Update a reading (admin only)
router.put('/:id', tarotReadingController.updateReading);

// Delete a reading (admin only)
router.delete('/:id', tarotReadingController.deleteReading);

// Get readings for a user
router.get(
  '/user/:userId',
  [authJwt.verifyToken],
  tarotReadingController.getUserReadings
);

// Public routes - không cần đăng nhập

// Lấy danh sách lá bài Tarot
router.get('/cards', tarotController.getAllCards);

// Xem chi tiết một lá bài
router.get('/cards/:id', tarotController.getCardById);

// Lấy bài Tarot hàng ngày
router.get('/daily', tarotController.getDailyCard);

// Lấy ngẫu nhiên các lá bài
router.post('/random', tarotController.getRandomCards);

// Protected routes - cần đăng nhập

// Tạo kết quả bói bài mới
router.post(
  '/readings',
  [
    authJwt.verifyToken,
    body('type').notEmpty().withMessage('Reading type is required'),
    body('cards').isArray().withMessage('Cards must be an array'),
    body('question').optional(),
    body('domain').optional(),
    validate
  ],
  tarotController.createReading
);

// Lấy danh sách lịch sử bói bài
router.get(
  '/readings',
  authJwt.verifyToken,
  tarotController.getUserReadings
);

// Xem chi tiết một lần bói
router.get(
  '/readings/:id',
  authJwt.verifyToken,
  tarotController.getReadingById
);

// Premium routes - cần đăng nhập và tài khoản Premium

// Tạo kết quả bói bài với AI
router.post(
  '/ai-reading',
  [
    authJwt.verifyToken,
    // Custom middleware để kiểm tra người dùng premium
    (req, res, next) => {
      if (!req.user || !req.user.is_premium) {
        return res.status(403).json({
          status: 'error',
          message: 'Premium feature - Premium account required'
        });
      }
      next();
    },
    body('type').notEmpty().withMessage('Reading type is required'),
    body('cards').isArray().withMessage('Cards must be an array'),
    body('question').notEmpty().withMessage('Question is required for AI reading'),
    body('domain').optional(),
    validate
  ],
  tarotController.createAIReading
);

module.exports = router; 