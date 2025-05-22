const db = require('../models');
const TarotCard = db.tarotCards;
const TarotReading = db.tarotReadings;
const TarotReadingCard = db.tarotReadingCards;
const TarotReadingInterpretation = db.tarotReadingInterpretations;
const User = db.users;
const { generateAIResponse } = require('../services/ai.service');

// Lấy tất cả lá bài Tarot
exports.getAllCards = async (req, res, next) => {
  try {
    const { type, suit } = req.query;
    
    // Xây dựng query filter
    const filter = {};
    if (type) filter.type = type;
    if (suit) filter.suit = suit;
    
    const cards = await TarotCard.findAll({
      where: filter,
      order: [
        ['type', 'ASC'],
        ['suit', 'ASC'],
        ['number', 'ASC']
      ]
    });
    
    res.status(200).json({
      status: 'success',
      count: cards.length,
      data: {
        cards
      }
    });
  } catch (error) {
    next(error);
  }
};

// Lấy chi tiết một lá bài
exports.getCardById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const card = await TarotCard.findByPk(id);
    
    if (!card) {
      return res.status(404).json({
        status: 'error',
        message: 'Card not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        card
      }
    });
  } catch (error) {
    next(error);
  }
};

// Lấy lá bài hàng ngày
exports.getDailyCard = async (req, res, next) => {
  try {
    // Lấy ngày hiện tại làm seed để luôn trả về cùng một lá bài trong một ngày
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const seed = dateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Lấy tổng số lá bài
    const cardCount = await TarotCard.count();
    
    // Chọn một lá bài ngẫu nhiên nhưng cố định cho ngày
    const randomIndex = seed % cardCount;
    
    const cards = await TarotCard.findAll({
      order: [
        ['id', 'ASC']
      ],
      offset: randomIndex,
      limit: 1
    });
    
    if (!cards.length) {
      return res.status(404).json({
        status: 'error',
        message: 'No cards found'
      });
    }
    
    // Tạo một giải thích đơn giản
    const card = cards[0];
    const isReversed = (seed % 2) === 1;
    const interpretation = isReversed ? card.reversedMeaning : card.normalMeaning;
    
    res.status(200).json({
      status: 'success',
      data: {
        date: dateString,
        card: {
          ...card.toJSON(),
          isReversed
        },
        interpretation
      }
    });
  } catch (error) {
    next(error);
  }
};

// Lấy ngẫu nhiên các lá bài
exports.getRandomCards = async (req, res, next) => {
  try {
    const { count = 3 } = req.body;
    
    // Giới hạn số lượng lá bài tối đa
    const limit = Math.min(count, 12);
    
    // Lấy tất cả lá bài và trộn ngẫu nhiên
    const allCards = await TarotCard.findAll();
    
    // Trộn mảng lá bài
    const shuffledCards = allCards.sort(() => 0.5 - Math.random());
    
    // Lấy n lá bài đầu tiên
    const selectedCards = shuffledCards.slice(0, limit).map(card => ({
      ...card.toJSON(),
      isReversed: Math.random() > 0.5
    }));
    
    res.status(200).json({
      status: 'success',
      count: selectedCards.length,
      data: {
        cards: selectedCards
      }
    });
  } catch (error) {
    next(error);
  }
};

// Tạo kết quả bói bài mới
exports.createReading = async (req, res, next) => {
  try {
    const { type, cards, question, domain } = req.body;
    const userId = req.user.id;
    
    // Kiểm tra các lá bài tồn tại
    const cardIds = cards.map(card => card.id);
    const existingCards = await TarotCard.findAll({
      where: {
        id: cardIds
      }
    });
    
    if (existingCards.length !== cardIds.length) {
      return res.status(400).json({
        status: 'error',
        message: 'One or more cards do not exist'
      });
    }
    
    // Bắt đầu transaction
    const transaction = await db.sequelize.transaction();
    
    try {
      // Tạo reading mới
      const reading = await TarotReading.create({
        user_id: userId,
        type,
        question: question || null,
        domain: domain || null
      }, { transaction });
      
      // Tạo bản ghi cho từng lá bài
      const readingCards = [];
      
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        const readingCard = await TarotReadingCard.create({
          reading_id: reading.id,
          card_id: card.id,
          position: i + 1,
          is_reversed: !!card.isReversed
        }, { transaction });
        
        readingCards.push(readingCard);
      }
      
      // Tạo giải thích cơ bản
      const cardDetails = await Promise.all(
        readingCards.map(async (rc) => {
          const card = await TarotCard.findByPk(rc.card_id, { transaction });
          return {
            ...card.toJSON(),
            position: rc.position,
            isReversed: rc.is_reversed
          };
        })
      );
      
      // Tạo giải thích đơn giản
      let interpretationText = `Reading Type: ${type}\n\n`;
      
      if (question) {
        interpretationText += `Question: ${question}\n\n`;
      }
      
      if (domain) {
        interpretationText += `Domain: ${domain}\n\n`;
      }
      
      interpretationText += "Cards Interpretation:\n\n";
      
      cardDetails.forEach(card => {
        interpretationText += `Card ${card.position}: ${card.name} ${card.isReversed ? '(Reversed)' : ''}\n`;
        interpretationText += card.isReversed ? card.reversedMeaning : card.normalMeaning;
        interpretationText += '\n\n';
      });
      
      // Lưu giải thích
      const interpretation = await TarotReadingInterpretation.create({
        reading_id: reading.id,
        content: interpretationText,
        ai_generated: false
      }, { transaction });
      
      // Cập nhật thống kê người dùng
      await db.userStats.increment('readings_count', {
        where: { user_id: userId },
        transaction
      });
      
      // Commit transaction
      await transaction.commit();
      
      // Trả về kết quả
      res.status(201).json({
        status: 'success',
        data: {
          reading: {
            id: reading.id,
            type,
            question,
            domain,
            created_at: reading.created_at,
            cards: cardDetails,
            interpretation: interpretationText
          }
        }
      });
    } catch (error) {
      // Rollback nếu có lỗi
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách đọc bài của người dùng
exports.getUserReadings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { limit = 10, offset = 0, type, domain } = req.query;
    
    // Xây dựng điều kiện tìm kiếm
    const where = { user_id: userId };
    if (type) where.type = type;
    if (domain) where.domain = domain;
    
    // Đếm tổng số kết quả
    const total = await TarotReading.count({ where });
    
    // Lấy kết quả với phân trang
    const readings = await TarotReading.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
      include: [{
        model: TarotReadingCard,
        as: 'cards',
        include: [{
          model: TarotCard,
          as: 'card'
        }]
      }]
    });
    
    // Định dạng kết quả trả về
    const formattedReadings = readings.map(reading => {
      const formattedCards = reading.cards.map(rc => ({
        id: rc.card.id,
        name: rc.card.name,
        position: rc.position,
        isReversed: rc.is_reversed,
        imageUrl: rc.card.imageUrl
      }));
      
      return {
        id: reading.id,
        type: reading.type,
        question: reading.question,
        domain: reading.domain,
        created_at: reading.created_at,
        cards: formattedCards
      };
    });
    
    res.status(200).json({
      status: 'success',
      count: readings.length,
      total,
      data: {
        readings: formattedReadings
      }
    });
  } catch (error) {
    next(error);
  }
};

// Lấy chi tiết một lần đọc bài
exports.getReadingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Lấy thông tin reading
    const reading = await TarotReading.findOne({
      where: {
        id,
        user_id: userId
      },
      include: [
        {
          model: TarotReadingCard,
          as: 'cards',
          include: [{
            model: TarotCard,
            as: 'card'
          }]
        },
        {
          model: TarotReadingInterpretation,
          as: 'interpretation'
        }
      ]
    });
    
    if (!reading) {
      return res.status(404).json({
        status: 'error',
        message: 'Reading not found or does not belong to you'
      });
    }
    
    // Định dạng kết quả trả về
    const formattedCards = reading.cards.map(rc => ({
      id: rc.card.id,
      name: rc.card.name,
      type: rc.card.type,
      suit: rc.card.suit,
      number: rc.card.number,
      position: rc.position,
      isReversed: rc.is_reversed,
      imageUrl: rc.card.imageUrl,
      meaning: rc.is_reversed ? rc.card.reversedMeaning : rc.card.normalMeaning
    }));
    
    const result = {
      id: reading.id,
      type: reading.type,
      question: reading.question,
      domain: reading.domain,
      created_at: reading.created_at,
      cards: formattedCards,
      interpretation: reading.interpretation?.content || ""
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        reading: result
      }
    });
  } catch (error) {
    next(error);
  }
};

// Tạo đọc bài sử dụng AI
exports.createAIReading = async (req, res, next) => {
  try {
    const { type, cards, question, domain } = req.body;
    const userId = req.user.id;
    
    // Kiểm tra người dùng có Premium
    if (!req.user.is_premium) {
      return res.status(403).json({
        status: 'error',
        message: 'Premium feature - upgrade to Premium to use AI readings'
      });
    }
    
    // Kiểm tra các lá bài tồn tại
    const cardIds = cards.map(card => card.id);
    const existingCards = await TarotCard.findAll({
      where: {
        id: cardIds
      }
    });
    
    if (existingCards.length !== cardIds.length) {
      return res.status(400).json({
        status: 'error',
        message: 'One or more cards do not exist'
      });
    }
    
    // Bắt đầu transaction
    const transaction = await db.sequelize.transaction();
    
    try {
      // Tạo reading mới
      const reading = await TarotReading.create({
        user_id: userId,
        type,
        question,
        domain: domain || null
      }, { transaction });
      
      // Tạo bản ghi cho từng lá bài
      const readingCards = [];
      
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        const readingCard = await TarotReadingCard.create({
          reading_id: reading.id,
          card_id: card.id,
          position: i + 1,
          is_reversed: !!card.isReversed
        }, { transaction });
        
        readingCards.push(readingCard);
      }
      
      // Lấy thông tin chi tiết các lá bài
      const cardDetails = await Promise.all(
        readingCards.map(async (rc) => {
          const card = await TarotCard.findByPk(rc.card_id, { transaction });
          return {
            ...card.toJSON(),
            position: rc.position,
            isReversed: rc.is_reversed
          };
        })
      );
      
      // Tạo prompt cho AI
      let aiPrompt = `Provide a tarot reading interpretation for a ${type} spread.`;
      aiPrompt += `\nQuestion: ${question}`;
      if (domain) aiPrompt += `\nDomain: ${domain}`;
      aiPrompt += `\n\nCards in the spread:`;
      
      cardDetails.forEach(card => {
        aiPrompt += `\n${card.position}. ${card.name} ${card.isReversed ? '(Reversed)' : ''}`;
        aiPrompt += `\n   Meaning: ${card.isReversed ? card.reversedMeaning : card.normalMeaning}`;
      });
      
      aiPrompt += `\n\nProvide a detailed interpretation of this spread, explaining the significance of each card position, how the cards relate to each other, and how they address the question. Include both practical advice and spiritual insights.`;
      
      // Gọi API AI để tạo phản hồi
      const aiResponse = await generateAIResponse(aiPrompt);
      
      // Lưu giải thích AI
      const interpretation = await TarotReadingInterpretation.create({
        reading_id: reading.id,
        content: aiResponse,
        ai_generated: true
      }, { transaction });
      
      // Cập nhật thống kê người dùng
      await db.userStats.increment('readings_count', {
        where: { user_id: userId },
        transaction
      });
      
      // Commit transaction
      await transaction.commit();
      
      // Trả về kết quả
      res.status(201).json({
        status: 'success',
        data: {
          reading: {
            id: reading.id,
            type,
            question,
            domain,
            created_at: reading.created_at,
            cards: cardDetails,
            interpretation: aiResponse
          }
        }
      });
    } catch (error) {
      // Rollback nếu có lỗi
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
}; 