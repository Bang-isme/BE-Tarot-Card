/**
 * Service xử lý gọi API AI (Google Gemini)
 */
const axios = require('axios');

/**
 * Gọi API AI để tạo phản hồi
 * @param {string} prompt - Nội dung prompt gửi cho AI
 * @returns {Promise<string>} - Phản hồi từ AI
 */
exports.generateAIResponse = async (prompt) => {
  try {
    // Kiểm tra API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing Gemini API key');
    }

    // Cấu hình request
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey}`;
    
    const data = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.95,
        topK: 40
      }
    };

    // Gọi API với timeout 30 giây
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    // Xử lý kết quả
    if (response.data && 
        response.data.candidates && 
        response.data.candidates.length > 0 &&
        response.data.candidates[0].content &&
        response.data.candidates[0].content.parts &&
        response.data.candidates[0].content.parts.length > 0) {
      return response.data.candidates[0].content.parts[0].text;
    }

    // Nếu không có kết quả hợp lệ
    throw new Error('Invalid response format from AI API');
  } catch (error) {
    console.error('AI API error:', error);
    
    // Nếu là lỗi timeout
    if (error.code === 'ECONNABORTED') {
      return 'The AI service is currently taking too long to respond. Please try again later.';
    }
    
    // Nếu là lỗi từ API
    if (error.response) {
      console.error('AI API error response:', error.response.data);
      return `AI service error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`;
    }
    
    // Fallback response
    return 'The AI service is currently unavailable. Please try again later.';
  }
}; 