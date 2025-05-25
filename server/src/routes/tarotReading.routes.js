const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const tarotReadingController = require('../controllers/tarotReading.controller');
const middleware = require('../middleware');
const { authenticate, restrictTo } = middleware.auth;
const { validate } = middleware.validator;
const { authJwt } = middleware;

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

module.exports = router; 