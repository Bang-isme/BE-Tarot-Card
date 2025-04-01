import { Op } from 'sequelize';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Card, Reading, ReadingCard, DailyTarot } from '../models/index.js';

/**
 * @desc    Lấy tất cả các lá bài
 * @route   GET /api/tarot/cards
 * @access  Public
 */
export const getAllCards = asyncHandler(async (req, res, next) => {
  // Xử lý các tham số query
  const { arcana, suit } = req.query;
  const whereCondition = {};

  if (arcana) {
    whereCondition.arcana = arcana;
  }

  if (suit) {
    whereCondition.suit = suit;
  }

  const cards = await Card.findAll({
    where: whereCondition,
    order: [
      ['arcana', 'ASC'],
      ['suit', 'ASC'],
      ['number', 'ASC']
    ]
  });

  res.status(200).json({
    success: true,
    count: cards.length,
    data: cards
  });
});

/**
 * @desc    Lấy thông tin một lá bài
 * @route   GET /api/tarot/cards/:id
 * @access  Public
 */
export const getCard = asyncHandler(async (req, res, next) => {
  const card = await Card.findByPk(req.params.id);

  if (!card) {
    return next(new ErrorResponse(`Không tìm thấy lá bài với ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: card
  });
});

/**
 * @desc    Lấy lá bài Tarot ngày
 * @route   GET /api/tarot/daily
 * @access  Public
 */
export const getDailyTarot = asyncHandler(async (req, res, next) => {
  // Lấy ngày hiện tại
  const today = new Date().toISOString().split('T')[0];

  // Tìm bài Tarot ngày cho hôm nay
  let dailyTarot = await DailyTarot.findOne({
    where: { date: today },
    include: [{ model: Card, as: 'card' }]
  });

  // Nếu chưa có, tạo một lá bài ngẫu nhiên cho hôm nay
  if (!dailyTarot) {
    // Lấy số lượng lá bài trong database
    const cardCount = await Card.count();
    
    // Chọn lá bài ngẫu nhiên
    const randomCardId = Math.floor(Math.random() * cardCount) + 1;
    const randomCard = await Card.findByPk(randomCardId);
    
    // Ngẫu nhiên lá bài xuôi hay ngược
    const isReversed = Math.random() > 0.5;
    
    // Tạo thông điệp và lời khuyên
    const message = isReversed 
      ? `Hôm nay bạn nhận được lá ${randomCard.name} ở trạng thái ngược. ${randomCard.reversed}`
      : `Hôm nay bạn nhận được lá ${randomCard.name}. ${randomCard.upright}`;
    
    const advice = isReversed
      ? `Hãy chú ý đến những khía cạnh ${randomCard.reversedKeywords.join(', ')} trong ngày hôm nay.`
      : `Hãy tập trung vào những khía cạnh ${randomCard.uprightKeywords.join(', ')} trong ngày hôm nay.`;
    
    // Tạo bản ghi DailyTarot mới
    dailyTarot = await DailyTarot.create({
      cardId: randomCard.id,
      date: today,
      isReversed,
      message,
      advice
    });
    
    // Lấy thông tin đầy đủ kèm Card
    dailyTarot = await DailyTarot.findByPk(dailyTarot.id, {
      include: [{ model: Card, as: 'card' }]
    });
  }

  res.status(200).json({
    success: true,
    data: dailyTarot
  });
});

/**
 * @desc    Tạo một trải bài mới
 * @route   POST /api/tarot/readings
 * @access  Private
 */
export const createReading = asyncHandler(async (req, res, next) => {
  // Thêm userId từ người dùng đã đăng nhập
  req.body.userId = req.user.id;
  
  const { userId, type, question, cards } = req.body;
  
  // Tạo reading
  const reading = await Reading.create({
    userId,
    type,
    question,
    cards, // Array của card IDs và positions
    date: new Date()
  });
  
  // Nếu có mảng các lá bài, lưu vào bảng join
  if (Array.isArray(cards) && cards.length > 0) {
    for (const cardData of cards) {
      await ReadingCard.create({
        readingId: reading.id,
        cardId: cardData.cardId,
        position: cardData.position,
        isReversed: cardData.isReversed || false,
        positionMeaning: cardData.positionMeaning,
        interpretation: cardData.interpretation
      });
    }
  }
  
  // Lấy reading kèm theo thông tin cards
  const readingWithCards = await Reading.findByPk(reading.id, {
    include: [
      {
        model: Card,
        as: 'cards',
        through: {
          attributes: ['position', 'isReversed', 'positionMeaning', 'interpretation']
        }
      }
    ]
  });

  res.status(201).json({
    success: true,
    data: readingWithCards
  });
});

/**
 * @desc    Lấy thông tin một trải bài
 * @route   GET /api/tarot/readings/:id
 * @access  Private
 */
export const getReading = asyncHandler(async (req, res, next) => {
  const reading = await Reading.findByPk(req.params.id, {
    include: [
      {
        model: Card,
        as: 'cards',
        through: {
          attributes: ['position', 'isReversed', 'positionMeaning', 'interpretation']
        }
      }
    ]
  });

  if (!reading) {
    return next(new ErrorResponse(`Không tìm thấy trải bài với ID ${req.params.id}`, 404));
  }

  // Kiểm tra người dùng có quyền xem trải bài này không
  if (reading.userId !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Không được phép xem trải bài này', 403));
  }

  res.status(200).json({
    success: true,
    data: reading
  });
});

/**
 * @desc    Lấy tất cả trải bài của người dùng
 * @route   GET /api/tarot/readings
 * @access  Private
 */
export const getUserReadings = asyncHandler(async (req, res, next) => {
  const readings = await Reading.findAll({
    where: { userId: req.user.id },
    order: [['date', 'DESC']],
    include: [
      {
        model: Card,
        as: 'cards',
        through: {
          attributes: ['position', 'isReversed']
        }
      }
    ]
  });

  res.status(200).json({
    success: true,
    count: readings.length,
    data: readings
  });
}); 