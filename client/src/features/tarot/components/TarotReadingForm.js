import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { performReading } from '../slices/tarotSlice';

const ReadingTypeCard = memo(({ type, selected, onClick, icon, description }) => (
  <div 
    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 
    ${selected 
      ? 'bg-gradient-to-r from-[#9370db] to-[#8a2be2] shadow-lg transform scale-[1.02]' 
      : 'bg-white/5 backdrop-blur-sm border border-purple-900/20 hover:bg-white/10'}`}
    onClick={() => onClick(type.id)}
  >
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-[#2a1045] flex items-center justify-center mr-4">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-1 tracking-vn-tight">{type.name}</h3>
        <p className="text-sm text-gray-300 tracking-vn-tight">{description}</p>
      </div>
    </div>
  </div>
));

/**
 * Form để bắt đầu một phiên đọc bài Tarot 
 * @param {Object} props - Component props
 * @param {Function} props.onStart - Callback khi bắt đầu trải bài
 * @param {Array} props.readingTypes - Danh sách các loại trải bài
 * @param {boolean} props.isLoading - Trạng thái loading
 */
const TarotReadingForm = memo(({ onStart, readingTypes = [], isLoading = false }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(null);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  
  // Các loại trải bài mặc định nếu không có data
  const defaultReadingTypes = [
    { id: 'three-card', name: 'Trải bài 3 lá', cards: 3, description: 'Quá khứ, hiện tại và tương lai' },
    { id: 'celtic-cross', name: 'Celtic Cross', cards: 10, description: 'Phân tích chi tiết tình huống' },
    { id: 'love', name: 'Tình yêu', cards: 5, description: 'Tập trung vào tình yêu và mối quan hệ' },
    { id: 'career', name: 'Sự nghiệp', cards: 5, description: 'Tập trung vào công việc và sự nghiệp' }
  ];
  
  const types = readingTypes.length > 0 ? readingTypes : defaultReadingTypes;
  
  // Icons cho các loại trải bài
  const typeIcons = {
    'three-card': '🃏',
    'celtic-cross': '✝️',
    'love': '❤️',
    'career': '💼',
    'health': '🩺',
    'spiritual': '✨',
    'yearly': '📅',
    'daily': '🌞'
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    if (!selectedType) {
      setError('Vui lòng chọn loại trải bài');
      return;
    }
    
    if (!question.trim()) {
      setError('Vui lòng nhập câu hỏi của bạn');
      return;
    }
    
    setError('');
    
    // Tìm type đã chọn
    const selectedReadingType = types.find(type => type.id === selectedType);
    
    // Tạo dữ liệu reading
    const readingData = {
      readingType: selectedType,
      question: question.trim(),
      numCards: selectedReadingType?.cards || 3
    };
    
    // Dispatch action
    dispatch(performReading(readingData));
    
    // Gọi callback
    if (onStart) {
      onStart(readingData);
    }
  };
  
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-6 tracking-vn-tight">Bắt Đầu Trải Bài Tarot</h2>
      
      {error && (
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-white tracking-vn-tight">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-white text-lg font-medium mb-4 tracking-vn-tight">
            Chọn loại trải bài:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {types.map((type) => (
              <ReadingTypeCard
                key={type.id}
                type={type}
                selected={selectedType === type.id}
                onClick={setSelectedType}
                icon={typeIcons[type.id] || '🔮'}
                description={type.description}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <label htmlFor="question" className="block text-white text-lg font-medium mb-2 tracking-vn-tight">
            Câu hỏi của bạn:
          </label>
          <div className="relative">
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Nhập câu hỏi hoặc mối quan tâm của bạn..."
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-purple-900/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#9370db] transition-colors tracking-vn-tight min-h-[120px]"
            />
            <div className="text-xs text-gray-400 mt-2 tracking-vn-tight flex justify-between">
              <span>Để trống nếu bạn muốn một đọc bài tổng quát</span>
              <span>{question.length}/200 ký tự</span>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white py-3 px-6 rounded-lg font-medium text-lg hover:shadow-lg transition-shadow tracking-vn-tight
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </div>
          ) : (
            'Bắt Đầu Trải Bài'
          )}
        </button>
      </form>
    </div>
  );
});

TarotReadingForm.propTypes = {
  onStart: PropTypes.func,
  readingTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cards: PropTypes.number.isRequired,
      description: PropTypes.string
    })
  ),
  isLoading: PropTypes.bool
};

ReadingTypeCard.propTypes = {
  type: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default TarotReadingForm; 