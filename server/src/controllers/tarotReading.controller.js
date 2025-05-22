const db = require('../models');
const TarotReading = db.tarotReadings;
const ReadingCard = db.readingCards;
const TarotCard = db.tarotCards;
const TarotTopic = db.tarotTopics;
const TarotSpread = db.tarotSpreads;
const TarotCardMeaning = db.tarotCardMeanings;
const User = db.users;
const UserStats = db.userStats;
const TarotReadingCard = db.tarotReadingCards;
const TarotReadingInterpretation = db.tarotReadingInterpretations;
const aiInterpretationService = require('../services/aiInterpretation.service');

// Get all readings (admin only)
exports.getAllReadings = async (req, res, next) => {
  try {
    const readings = await TarotReading.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: TarotTopic,
          attributes: ['id', 'name']
        },
        {
          model: TarotSpread,
          attributes: ['id', 'name']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      results: readings.length,
      data: {
        readings
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get recent readings (public)
exports.getRecentReadings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const readings = await TarotReading.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: TarotTopic,
          attributes: ['id', 'name']
        },
        {
          model: TarotSpread,
          attributes: ['id', 'name']
        }
      ],
      order: [['created_at', 'DESC']],
      limit
    });

    res.status(200).json({
      status: 'success',
      results: readings.length,
      data: {
        readings
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user's readings
exports.getUserReadings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const readings = await TarotReading.findAll({
      where: { user_id: userId },
      include: [
        {
          model: TarotTopic,
          attributes: ['id', 'name']
        },
        {
          model: TarotSpread,
          attributes: ['id', 'name']
        },
        {
          model: ReadingCard,
          include: [{
            model: TarotCard,
            attributes: ['id', 'name', 'arcana', 'suit', 'image_url']
          }]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      results: readings.length,
      data: {
        readings
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get reading by ID
exports.getReadingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const reading = await TarotReading.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: TarotTopic,
          attributes: ['id', 'name']
        },
        {
          model: TarotSpread,
          attributes: ['id', 'name']
        },
        {
          model: ReadingCard,
          include: [{
            model: TarotCard,
            attributes: ['id', 'name', 'arcana', 'suit', 'image_url'],
            include: [{
              model: TarotCardMeaning,
              where: { topic_id: db.sequelize.col('tarot_reading.topic_id') },
              required: false
            }]
          }]
        }
      ]
    });

    if (!reading) {
      return res.status(404).json({
        status: 'error',
        message: 'Reading not found'
      });
    }

    // Check if user is authorized to view this reading
    if (reading.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to view this reading'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        reading
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create a new reading
exports.createReading = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const { topic_id, spread_id, question, cards } = req.body;
    const userId = req.user.id;

    // Validate that topic and spread exist
    const topic = await TarotTopic.findByPk(topic_id);
    if (!topic) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Topic not found'
      });
    }

    const spread = await TarotSpread.findByPk(spread_id);
    if (!spread) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Spread not found'
      });
    }

    // Create reading
    const reading = await TarotReading.create({
      user_id: userId,
      topic_id,
      spread_id,
      question: question || null
    }, { transaction });

    // Add cards to reading
    const readingCards = await Promise.all(
      cards.map((card, index) => 
        TarotReadingCard.create({
          reading_id: reading.id,
          card_id: card.id,
          position: index + 1,
          is_reversed: card.is_reversed || false
        }, { transaction })
      )
    );

    // Generate AI interpretation if requested
    let interpretation = null;
    if (req.body.generate_interpretation) {
      interpretation = await aiInterpretationService.generateInterpretation(reading.id);
    }

    // Update user stats
    await UserStats.increment('readings_count', {
      by: 1,
      where: { user_id: userId },
      transaction
    });

    await UserStats.update(
      { last_reading_date: new Date() },
      { where: { user_id: userId }, transaction }
    );

    await transaction.commit();

    // Fetch the complete reading with associations
    const completeReading = await TarotReading.findByPk(reading.id, {
      include: [
        {
          model: TarotTopic,
          attributes: ['id', 'name']
        },
        {
          model: TarotSpread,
          attributes: ['id', 'name']
        },
        {
          model: ReadingCard,
          include: [{
            model: TarotCard,
            attributes: ['id', 'name', 'arcana', 'suit', 'image_url']
          }]
        }
      ]
    });

    res.status(201).json({
      status: 'success',
      message: 'Reading created successfully',
      data: {
        reading: completeReading,
        cards: readingCards,
        interpretation
      }
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// Update a reading (admin only)
exports.updateReading = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topic_id, spread_id, question } = req.body;

    const reading = await TarotReading.findByPk(id);
    if (!reading) {
      return res.status(404).json({
        status: 'error',
        message: 'Reading not found'
      });
    }

    // Update reading
    await reading.update({
      topic_id: topic_id || reading.topic_id,
      spread_id: spread_id || reading.spread_id,
      question: question || reading.question
    });

    res.status(200).json({
      status: 'success',
      message: 'Reading updated successfully',
      data: {
        reading
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete a reading (admin only)
exports.deleteReading = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const { id } = req.params;

    const reading = await TarotReading.findByPk(id);
    if (!reading) {
      await transaction.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Reading not found'
      });
    }

    // Delete associated reading cards
    await ReadingCard.destroy({
      where: { reading_id: id },
      transaction
    });

    // Delete reading
    await reading.destroy({ transaction });

    await transaction.commit();

    res.status(200).json({
      status: 'success',
      message: 'Reading deleted successfully'
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// Get a tarot reading by ID
exports.getReading = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reading = await TarotReading.findByPk(id, {
      include: [
        {
          model: TarotTopic,
          attributes: ['id', 'name', 'description']
        },
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: TarotReadingCard,
          include: [{ model: TarotCard }]
        },
        {
          model: TarotReadingInterpretation,
          required: false,
          order: [['created_at', 'DESC']],
          limit: 1
        }
      ]
    });

    if (!reading) {
      return res.status(404).json({ message: 'Reading not found' });
    }

    res.json(reading);
  } catch (error) {
    console.error('Error getting reading:', error);
    res.status(500).json({ message: 'Failed to retrieve reading', error: error.message });
  }
};

// Perform AI-based reading
exports.performAIReading = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { selectedCards, question, topicId, spreadId } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!selectedCards || !Array.isArray(selectedCards) || selectedCards.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Selected cards are required'
      });
    }

    if (!topicId) {
      return res.status(400).json({
        status: 'error',
        message: 'Topic ID is required'
      });
    }

    if (!spreadId) {
      return res.status(400).json({
        status: 'error',
        message: 'Spread ID is required'
      });
    }

    // Create reading
    const reading = await TarotReading.create({
      user_id: userId,
      topic_id: topicId,
      spread_id: spreadId,
      question: question || null,
      reading_type: 'ai'
    }, { transaction });

    // Add cards to reading
    await Promise.all(
      selectedCards.map((card, index) => 
        TarotReadingCard.create({
          reading_id: reading.id,
          card_id: card.id,
          position: index + 1,
          is_reversed: card.isReversed || false
        }, { transaction })
      )
    );

    // Generate AI interpretation
    const interpretation = await aiInterpretationService.generateInterpretation(reading.id);

    // Update user stats
    await UserStats.increment('readings_count', {
      by: 1,
      where: { user_id: userId },
      transaction
    });

    await UserStats.update(
      { last_reading_date: new Date() },
      { where: { user_id: userId }, transaction }
    );

    await transaction.commit();

    // Fetch complete reading with cards and interpretation
    const completeReading = await TarotReading.findByPk(reading.id, {
      include: [
        {
          model: TarotTopic,
          attributes: ['id', 'name']
        },
        {
          model: TarotSpread,
          attributes: ['id', 'name', 'position_labels']
        },
        {
          model: ReadingCard,
          include: [{
            model: TarotCard,
            attributes: ['id', 'name', 'arcana', 'suit', 'image_url', 'upright_meaning', 'reversed_meaning', 'description']
          }]
        }
      ]
    });

    // Format the response
    const formattedReading = {
      id: completeReading.id,
      userId: completeReading.user_id,
      question: completeReading.question,
      topic: completeReading.TarotTopic.name,
      spread: completeReading.TarotSpread.name,
      createdAt: completeReading.created_at,
      selectedCards: completeReading.ReadingCards.map(rc => ({
        id: rc.TarotCard.id,
        name: rc.TarotCard.name,
        arcana: rc.TarotCard.arcana,
        suit: rc.TarotCard.suit,
        imageUrl: rc.TarotCard.image_url,
        position: rc.position,
        isReversed: rc.is_reversed,
        meaning: rc.is_reversed ? rc.TarotCard.reversed_meaning : rc.TarotCard.upright_meaning
      })),
      interpretation: interpretation.content
    };

    res.status(201).json({
      status: 'success',
      data: {
        reading: formattedReading
      }
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// Generate AI interpretation for an existing reading
exports.generateInterpretation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if reading exists
    const reading = await TarotReading.findByPk(id);
    if (!reading) {
      return res.status(404).json({
        status: 'error',
        message: 'Reading not found'
      });
    }
    
    // Check if user is authorized to access this reading
    if (reading.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to access this reading'
      });
    }

    // Generate interpretation
    const interpretation = await aiInterpretationService.generateInterpretation(id);

    res.status(200).json({
      status: 'success',
      data: {
        interpretation: interpretation.content,
        interpretationId: interpretation.interpretationId
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all interpretations for a reading
exports.getReadingInterpretations = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if reading exists
    const reading = await TarotReading.findByPk(id);
    if (!reading) {
      return res.status(404).json({
        status: 'error',
        message: 'Reading not found'
      });
    }
    
    // Check if user is authorized to access this reading
    if (reading.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to access this reading'
      });
    }
    
    // Get interpretations
    const interpretations = await aiInterpretationService.getInterpretations(id);
    
    res.status(200).json({
      status: 'success',
      results: interpretations.length,
      data: {
        interpretations
      }
    });
  } catch (error) {
    next(error);
  }
}; 