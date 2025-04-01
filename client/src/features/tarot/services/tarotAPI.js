import apiClient from '../../../shared/utils/api/apiClient';

// Mock data for cards
const MOCK_CARDS = [
  {
    id: 1,
    name: 'The Fool',
    imageUrl: 'https://raw.githubusercontent.com/ronniekram/tarot-cards/master/src/images/cards/major/the-fool.jpg',
    type: 'Major Arcana',
    meaning: 'New beginnings, innocence, spontaneity. The Fool represents taking a leap of faith and embarking on a new journey.',
    keywords: 'innocence,new beginnings,free spirit,spontaneity,adventure'
  },
  {
    id: 2,
    name: 'The Magician',
    imageUrl: 'https://raw.githubusercontent.com/ronniekram/tarot-cards/master/src/images/cards/major/the-magician.jpg', 
    type: 'Major Arcana',
    meaning: 'Manifestation, resourcefulness, power. The Magician represents your ability to utilize the elements at your disposal to create your reality.',
    keywords: 'manifestation,creativity,power,skill,action'
  },
  {
    id: 3,
    name: 'The High Priestess',
    imageUrl: 'https://raw.githubusercontent.com/ronniekram/tarot-cards/master/src/images/cards/major/the-high-priestess.jpg',
    type: 'Major Arcana',
    meaning: 'Intuition, sacred knowledge, divine feminine. The High Priestess represents the bridge between the conscious and unconscious mind.',
    keywords: 'intuition,mystery,spirituality,inner voice,subconscious'
  },
  {
    id: 4,
    name: 'The Empress',
    imageUrl: 'https://raw.githubusercontent.com/ronniekram/tarot-cards/master/src/images/cards/major/the-empress.jpg',
    type: 'Major Arcana',
    meaning: 'Abundance, nurturing, fertility. The Empress represents the abundant, nurturing mother who brings life and encourages growth.',
    keywords: 'nurturing,abundance,fertility,creation,mother figure'
  },
  {
    id: 5,
    name: 'The Emperor',
    imageUrl: 'https://raw.githubusercontent.com/ronniekram/tarot-cards/master/src/images/cards/major/the-emperor.jpg',
    type: 'Major Arcana',
    meaning: 'Authority, structure, control. The Emperor represents masculine energy, leadership and the establishment of structure and rules.',
    keywords: 'leadership,authority,structure,control,father figure'
  },
  {
    id: 6,
    name: 'The Hierophant',
    imageUrl: 'https://raw.githubusercontent.com/ronniekram/tarot-cards/master/src/images/cards/major/the-hierophant.jpg',
    type: 'Major Arcana',
    meaning: 'Tradition, conformity, morality. The Hierophant represents connection to traditional values and institutions that provide structure in society.',
    keywords: 'tradition,conformity,education,belief,guidance'
  },
  {
    id: 7,
    name: 'The Lovers',
    imageUrl: 'https://raw.githubusercontent.com/ronniekram/tarot-cards/master/src/images/cards/major/the-lovers.jpg',
    type: 'Major Arcana',
    meaning: 'Relationships, choices, alignment of values. The Lovers represents connections and the choices we make based on our personal value system.',
    keywords: 'love,choice,harmony,relationships,values'
  }
];

// Simulated delay for mock responses
const mockDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get a random subset of cards
const getRandomCards = (count) => {
  const shuffled = [...MOCK_CARDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() < 0.2 // 20% chance of being reversed
  }));
};

// Mock getAIInterpretation
const mockGetAIInterpretation = (cards, question, readingType) => {
  let interpretationText = '';
  
  if (readingType === 'three-card') {
    interpretationText = `Quá khứ: ${cards[0].name} - ${cards[0].meaning}\n
    Hiện tại: ${cards[1].name} - ${cards[1].meaning}\n
    Tương lai: ${cards[2].name} - ${cards[2].meaning}\n
    
    Câu hỏi của bạn: "${question || 'Không có câu hỏi cụ thể'}"\n
    
    Những lá bài cho thấy bạn đang trải qua một quá trình chuyển đổi quan trọng. Quá khứ đã đặt nền móng, hiện tại bạn đang đối mặt với những thách thức, nhưng tương lai hứa hẹn sự phát triển và thành công nếu bạn giữ vững niềm tin.`;
  } else {
    interpretationText = `Lá bài chính: ${cards[0].name} - ${cards[0].meaning}\n
    
    Câu hỏi của bạn: "${question || 'Không có câu hỏi cụ thể'}"\n
    
    Lá bài này xuất hiện cho thấy bạn đang ở trong giai đoạn quan trọng của cuộc sống. Hãy lắng nghe trực giác và tin tưởng vào con đường bạn đã chọn.`;
  }
  
  // Format interpretation as an object with sections for better UI display
  return {
    interpretation: {
      summary: "Dưới đây là giải thích chi tiết cho trải bài của bạn.",
      sections: cards.map((card, index) => ({
        title: `Lá bài ${index + 1}: ${card.name} ${card.isReversed ? '(Ngược)' : ''}`,
        content: card.isReversed 
          ? `Khi xuất hiện ở vị trí ngược, lá bài này cảnh báo về ${card.keywords.split(',')[0]} quá mức hoặc thiếu ${card.keywords.split(',')[1]}. ${card.meaning}`
          : card.meaning
      })),
      conclusion: question 
        ? `Liên quan đến câu hỏi "${question}" của bạn, trải bài này gợi ý rằng bạn nên tin tưởng vào trực giác và tiếp tục con đường đã chọn.`
        : "Hãy suy ngẫm về những thông điệp từ các lá bài và áp dụng chúng vào tình huống hiện tại của bạn."
    }
  };
};

// Mock implementation of API functions
// Toggle to use mock data when real API is not available
const USE_MOCK_API = true;

// Get all cards
export const getAllCards = async () => {
  try {
    if (USE_MOCK_API) {
      await mockDelay();
      return MOCK_CARDS;
    }
    
    const response = await apiClient.get('/cards');
    return response.data;
  } catch (error) {
    if (USE_MOCK_API) {
      return MOCK_CARDS;
    }
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get card by id
export const getCardById = async (cardId) => {
  try {
    if (USE_MOCK_API) {
      await mockDelay();
      const card = MOCK_CARDS.find(c => c.id === Number(cardId));
      if (!card) throw { message: 'Card not found' };
      return card;
    }
    
    const response = await apiClient.get(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    if (USE_MOCK_API && MOCK_CARDS.some(c => c.id === Number(cardId))) {
      return MOCK_CARDS.find(c => c.id === Number(cardId));
    }
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get daily tarot card
export const getDailyTarot = async () => {
  try {
    if (USE_MOCK_API) {
      await mockDelay();
      // Get a random card for daily reading
      const randomIndex = Math.floor(Math.random() * MOCK_CARDS.length);
      return {
        ...MOCK_CARDS[randomIndex],
        date: new Date().toISOString(),
        isReversed: Math.random() < 0.2
      };
    }
    
    const response = await apiClient.get('/readings/daily');
    return response.data;
  } catch (error) {
    if (USE_MOCK_API) {
      const randomIndex = Math.floor(Math.random() * MOCK_CARDS.length);
      return {
        ...MOCK_CARDS[randomIndex],
        date: new Date().toISOString(),
        isReversed: Math.random() < 0.2
      };
    }
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Create new reading
export const createReading = async (readingData) => {
  try {
    if (USE_MOCK_API) {
      await mockDelay(1200);
      const { readingType, numCards = 3, question } = readingData;
      
      // Generate random cards for the reading
      const cards = getRandomCards(numCards);
      
      return {
        id: `mock-${Date.now()}`,
        readingType,
        question,
        cards,
        createdAt: new Date().toISOString()
      };
    }
    
    const response = await apiClient.post('/readings', readingData);
    return response.data;
  } catch (error) {
    if (USE_MOCK_API) {
      const { readingType, numCards = 3, question } = readingData;
      return {
        id: `mock-${Date.now()}`,
        readingType,
        question,
        cards: getRandomCards(numCards),
        createdAt: new Date().toISOString()
      };
    }
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get reading by id
export const getReadingById = async (readingId) => {
  try {
    if (USE_MOCK_API) {
      await mockDelay();
      // Since we don't have persistent storage for mock readings, generate a new one
      return {
        id: readingId,
        readingType: 'three-card',
        cards: getRandomCards(3),
        createdAt: new Date().toISOString()
      };
    }
    
    const response = await apiClient.get(`/readings/${readingId}`);
    return response.data;
  } catch (error) {
    if (USE_MOCK_API) {
      return {
        id: readingId,
        readingType: 'three-card',
        cards: getRandomCards(3),
        createdAt: new Date().toISOString()
      };
    }
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get user readings history
export const getUserReadings = async (params = {}) => {
  try {
    if (USE_MOCK_API) {
      await mockDelay();
      // Generate some mock reading history
      const readings = Array.from({ length: 5 }, (_, i) => ({
        id: `mock-history-${i}`,
        readingType: ['three-card', 'celtic-cross', 'love', 'career'][Math.floor(Math.random() * 4)],
        cards: getRandomCards(3),
        createdAt: new Date(Date.now() - i * 86400000).toISOString() // 1 day apart
      }));
      
      return {
        readings,
        totalCount: readings.length,
        page: params.page || 1,
        limit: params.limit || 10
      };
    }
    
    const response = await apiClient.get(`/readings/user`, { params });
    return response.data;
  } catch (error) {
    if (USE_MOCK_API) {
      const readings = Array.from({ length: 5 }, (_, i) => ({
        id: `mock-history-${i}`,
        readingType: ['three-card', 'celtic-cross', 'love', 'career'][Math.floor(Math.random() * 4)],
        cards: getRandomCards(3),
        createdAt: new Date(Date.now() - i * 86400000).toISOString()
      }));
      
      return {
        readings,
        totalCount: readings.length,
        page: params.page || 1,
        limit: params.limit || 10
      };
    }
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get AI interpretation
export const getAIInterpretation = async (cards, question, readingType) => {
  try {
    if (USE_MOCK_API) {
      await mockDelay(1500);
      return mockGetAIInterpretation(cards, question, readingType);
    }
    
    const response = await apiClient.post('/ai/interpret', {
      cards,
      question,
      readingType
    });
    return response.data;
  } catch (error) {
    if (USE_MOCK_API) {
      return mockGetAIInterpretation(cards, question, readingType);
    }
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
}; 