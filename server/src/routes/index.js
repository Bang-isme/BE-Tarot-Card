const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const tarotReadingRoutes = require('./tarotReading.routes');
const cardsRoutes = require('./cards.routes');

// Use route modules
router.use('/auth', authRoutes);
router.use('/readings', tarotReadingRoutes);
router.use('/cards', cardsRoutes);

module.exports = router; 