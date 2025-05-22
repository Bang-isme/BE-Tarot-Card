const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const db = require('../models');
const TarotReading = db.tarotReadings;
const TarotReadingCard = db.tarotReadingCards;
const TarotCard = db.tarotCards;
const TarotTopic = db.tarotTopics;
const TarotReadingInterpretation = db.tarotReadingInterpretations;

// Khởi tạo Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = 'gemini-2.0-flash';

  /**
 * Dịch vụ xử lý diễn giải bài tarot sử dụng AI
 */
const aiInterpretationService = {
  /**
   * Tạo diễn giải cho một kết quả đọc bài tarot
   * @param {number} readingId - ID của lần đọc bài
   * @returns {Promise<Object>} - Kết quả diễn giải
   */
  generateInterpretation: async (readingId) => {
    try {
      // Lấy thông tin chi tiết về lần đọc bài
      const reading = await TarotReading.findByPk(readingId, {
        include: [
          {
            model: TarotTopic,
            attributes: ['name', 'description']
          },
          {
            model: TarotReadingCard,
            include: [{
              model: TarotCard,
              attributes: ['name', 'arcana', 'suit', 'image_url', 'upright_meaning', 'reversed_meaning', 'description']
            }]
          }
        ]
      });
      
      if (!reading) {
        throw new Error('Reading not found');
      }

      // Tạo prompt cho AI
      const topic = reading.TarotTopic ? reading.TarotTopic.name : 'Tổng quát';
      const question = reading.question || '';
      
      let cardsInfo = [];
      reading.TarotReadingCards.forEach((readingCard, index) => {
        const card = readingCard.TarotCard;
        const position = index + 1;
        let positionName = '';
        
        // Xác định tên vị trí dựa vào số thứ tự
        if (position === 1) positionName = 'Bản thân';
        else if (position === 2) positionName = 'Hoàn cảnh';
        else if (position === 3) positionName = 'Lời khuyên';
        else positionName = `Vị trí ${position}`;
        
        cardsInfo.push({
          position,
          positionName,
          cardName: card.name,
          arcana: card.arcana,
          suit: card.suit,
          isReversed: readingCard.is_reversed,
          meaning: readingCard.is_reversed ? card.reversed_meaning : card.upright_meaning,
          description: card.description
        });
      });

      const prompt = `
        Bạn là một chuyên gia về Tarot với kiến thức sâu rộng về ý nghĩa các lá bài và khả năng diễn giải.
        Hãy phân tích kết quả trải bài Tarot dưới đây và đưa ra diễn giải chi tiết, mang tính cá nhân hóa.
        
        THÔNG TIN TRẢI BÀI:
        - Chủ đề: ${topic}
        - Câu hỏi: ${question || 'Không có câu hỏi cụ thể'}
        
        CÁC LÁ BÀI:
        ${cardsInfo.map(card => `
          Vị trí ${card.position} (${card.positionName}):
          - Lá bài: ${card.cardName} (${card.arcana}${card.suit ? ', ' + card.suit : ''})
          - Trạng thái: ${card.isReversed ? 'Ngược' : 'Xuôi'}
          - Ý nghĩa: ${card.meaning}
          - Mô tả: ${card.description}
        `).join('\n')}
        
        YÊU CẦU:
        1. Phân tích ý nghĩa của từng lá bài trong vị trí của nó
        2. Phân tích mối quan hệ giữa các lá bài
        3. Đưa ra diễn giải tổng thể về tình huống
        4. Đề xuất lời khuyên hoặc hướng đi
        5. Đưa ra kết luận tóm tắt
        
        Định dạng kết quả dưới dạng JSON với cấu trúc sau:
        {
          "sections": [
            {
              "title": "Phân tích tổng quan",
              "content": "Nội dung phân tích..."
            },
            {
              "title": "Vị trí 1: Bản thân",
              "content": "Diễn giải chi tiết cho vị trí 1..."
            },
            ...
            {
              "title": "Diễn giải tổng thể",
              "content": "Diễn giải mối liên hệ giữa các lá bài..."
            },
            {
              "title": "Lời khuyên",
              "content": "Những lời khuyên cụ thể..."
            }
          ],
          "summary": "Tóm tắt ngắn gọn (không quá 100 từ)"
        }
      `;

      // Gọi API Gemini
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      // Tạo bản ghi lưu kết quả diễn giải
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(response);
      } catch (error) {
        console.error('Error parsing AI response:', error);
        parsedResponse = {
          sections: [
            {
              title: 'Diễn giải',
              content: response
            }
          ],
          summary: 'Không có tóm tắt'
        };
      }
      
      // Lưu kết quả diễn giải vào database
      const interpretation = await TarotReadingInterpretation.create({
        reading_id: readingId,
        content: JSON.stringify(parsedResponse),
        created_at: new Date()
      });

      return {
        interpretationId: interpretation.id,
        content: parsedResponse
      };
    } catch (error) {
      console.error('Error in AI interpretation:', error);
      throw error;
    }
  },

  /**
   * Lấy tất cả diễn giải cho một lần đọc bài
   * @param {number} readingId - ID của lần đọc bài
   * @returns {Promise<Array>} - Danh sách các diễn giải
   */
  getInterpretations: async (readingId) => {
    try {
      const interpretations = await TarotReadingInterpretation.findAll({
        where: { reading_id: readingId },
        order: [['created_at', 'DESC']]
      });
      
      return interpretations.map(interpretation => {
        let content;
        try {
          content = JSON.parse(interpretation.content);
        } catch (e) {
          content = { sections: [{ title: 'Diễn giải', content: interpretation.content }] };
        }
        
        return {
          id: interpretation.id,
          readingId: interpretation.reading_id,
          content,
          createdAt: interpretation.created_at
        };
      });
    } catch (error) {
      console.error('Error fetching interpretations:', error);
      throw error;
  }
  }
};

module.exports = aiInterpretationService; 