import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TarotCardDisplay from './TarotCardDisplay';

/**
 * Component hiển thị kết quả đọc bài Tarot
 * @param {Object} props - Component props
 * @param {Object} props.reading - Kết quả đọc bài
 * @param {string} props.interpretation - Phần giải thích
 * @param {boolean} props.isLoading - Trạng thái loading
 * @param {Function} props.onSave - Callback khi lưu kết quả
 * @param {Function} props.onShareClick - Callback khi share kết quả
 */
const ReadingResult = memo(({ 
  reading = {}, 
  interpretation = '', 
  isLoading = false,
  onSave,
  onShareClick
}) => {
  const [allCardsRevealed, setAllCardsRevealed] = useState(false);
  const [revealsCount, setRevealsCount] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Auto reveal cards với delay
  useEffect(() => {
    if (reading && reading.cards && Array.isArray(reading.cards) && reading.cards.length > 0) {
      const revealInterval = setInterval(() => {
        setRevealsCount(prev => {
          const next = prev + 1;
          if (next >= reading.cards.length) {
            clearInterval(revealInterval);
            setAllCardsRevealed(true);
            return reading.cards.length;
          }
          return next;
        });
      }, 1000);
      
      return () => clearInterval(revealInterval);
    } else {
      // Nếu không có cards, đặt allCardsRevealed = true để hiển thị phần giải thích
      setAllCardsRevealed(true);
    }
  }, [reading]);
  
  // Nếu không có kết quả, hiển thị trạng thái không có dữ liệu
  if (!reading || (reading.cards && Array.isArray(reading.cards) && reading.cards.length === 0)) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 md:p-8 text-center">
        <p className="text-gray-300 tracking-vn-tight">Không có kết quả để hiển thị.</p>
        <Link
          to="/tarot-readings"
          className="mt-6 inline-block bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
        >
          Xem bói mới
        </Link>
      </div>
    );
  }
  
  // Xác định loại trải bài và vị trí của từng lá
  const getCardPositions = () => {
    const readingType = reading.readingType || 'general';
    const cardsCount = reading.cards && Array.isArray(reading.cards) ? reading.cards.length : 0;
    
    switch (readingType) {
      case 'three-card':
      case 'love':
      case 'career':
      case 'spiritual':
      case 'decisions':
      case 'health':
        // Vị trí trải 3 lá bài theo hàng ngang
        if (cardsCount === 3) {
          return [
            'left-[20%] top-1/2 -translate-y-1/2',
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'left-[80%] top-1/2 -translate-y-1/2'
          ];
        }
        // Vị trí trải 5 lá bài theo hàng ngang
        return [
          'left-[10%] top-1/2 -translate-y-1/2',
          'left-[30%] top-1/2 -translate-y-1/2',
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'left-[70%] top-1/2 -translate-y-1/2',
          'left-[90%] top-1/2 -translate-y-1/2'
        ];
      case 'celtic-cross':
        return [
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', // Center card
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90', // Crossing card
          'left-1/2 bottom-[20%] -translate-x-1/2', // Below
          'left-1/2 top-[20%] -translate-x-1/2', // Above
          'left-[25%] top-1/2 -translate-y-1/2', // Left
          'right-[25%] top-1/2 -translate-y-1/2', // Right
          'right-[15%] bottom-[20%]', // Position 7
          'right-[15%] bottom-[40%]', // Position 8
          'right-[15%] top-[40%]', // Position 9
          'right-[15%] top-[20%]', // Position 10
        ];
      default:
        // Vị trí mặc định nếu chỉ có 3 lá
        if (cardsCount === 3) {
          return [
            'left-[20%] top-1/2 -translate-y-1/2',
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'left-[80%] top-1/2 -translate-y-1/2'
          ];
        }
        
        // Trường hợp nhiều lá, xếp theo hình tròn
        const positions = [];
        const centralAngle = 2 * Math.PI / cardsCount;
        
        for (let i = 0; i < cardsCount; i++) {
          const angle = i * centralAngle;
          const radius = 40; // % từ trung tâm
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          positions.push(`left-[${x}%] top-[${y}%] -translate-x-1/2 -translate-y-1/2`);
        }
        
        return positions;
    }
  };
  
  const cardPositions = getCardPositions();
  const readingDate = new Date(reading.createdAt || Date.now()).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Sections của lời giải
  let sections = [];
  
  if (interpretation) {
    // Nếu có interpretation, tách nó thành các sections
    try {
      if (typeof interpretation === 'string' && interpretation.trim() !== '') {
        // Try to parse from JSON string
        try {
          const parsedInterpretation = JSON.parse(interpretation);
          sections = parsedInterpretation.sections || [];
        } catch (e) {
          // Nếu parse fail, tạo một section duy nhất
          sections = [{
            title: 'Giải thích tổng quan',
            content: interpretation
          }];
        }
      } else if (interpretation.sections) {
        sections = interpretation.sections;
      } else if (interpretation.interpretation && interpretation.interpretation.sections) {
        sections = interpretation.interpretation.sections;
      }
    } catch (e) {
      // Nếu parse fail, tạo một section duy nhất
      sections = [{
        title: 'Giải thích tổng quan',
        content: 'Không thể hiển thị nội dung giải thích.'
      }];
    }
  } else if (reading.cards && Array.isArray(reading.cards)) {
    // Nếu không có interpretation, tạo sections từ cards
    sections = reading.cards.map((card, index) => ({
      title: `Lá bài ${index + 1}: ${card.name || 'Không tên'}`,
      content: card.meaning || 'Không có thông tin chi tiết.'
    }));
  }
  
  // Nếu vẫn không có sections, tạo một section mặc định
  if (sections.length === 0) {
    sections = [{
      title: 'Giải thích tổng quan',
      content: 'Hãy suy ngẫm về lá bài này và tìm ra ý nghĩa phù hợp với tình huống của bạn.'
    }];
  }
  
  // Toggle section
  const toggleSection = (index) => {
    if (expandedSection === index) {
      setExpandedSection(null);
    } else {
      setExpandedSection(index);
    }
  };
  
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-vn-tight">
          {reading.readingType === 'daily' ? 'Tarot Hàng Ngày' : `Trải bài ${reading.readingType || 'Tarot'}`}
        </h2>
        <div className="flex flex-wrap items-center text-gray-300 text-sm tracking-vn-tight">
          <div className="mr-4 mb-2">{readingDate}</div>
          {reading.question && (
            <div className="mr-4 mb-2 px-2 py-1 bg-[#9370db]/20 rounded-full">
              {reading.question.length > 50 ? `${reading.question.substring(0, 50)}...` : reading.question}
            </div>
          )}
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span>Hoàn thành</span>
          </div>
        </div>
      </div>
      
      {/* Cards Display Section */}
      {reading.cards && Array.isArray(reading.cards) && reading.cards.length > 0 && (
        <div className="relative h-[450px] md:h-[500px] mb-10 bg-gradient-to-br from-[#2a1045]/50 to-[#3a1c5a]/50 rounded-xl overflow-hidden p-4 border border-[#9370db]/20">
          {/* Debug information */}
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute top-2 left-2 text-xs text-white/50 bg-black/30 px-2 py-1 rounded z-50">
              Type: {reading.readingType}, Cards: {reading.cards.length}
            </div>
          )}
          
          {reading.cards.map((card, index) => {
            if (!card || index >= cardPositions.length) return null;
            
            // Log card information for debugging
            console.log(`Card ${index}:`, card, "Position:", cardPositions[index]);
            
            // Đảm bảo card có imageUrl
            const safeCard = {
              ...card,
              imageUrl: card.imageUrl || `/src/assets/images/tarot/${card.id || 'default-card'}.jpg`
            };
            
            return (
              <TarotCardDisplay 
                key={card.id || index}
                card={safeCard}
                isRevealed={index < revealsCount}
                size="medium"
                position={cardPositions[index] || ''}
              />
            );
          })}
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0f051d]/70 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-[#9370db] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-white tracking-vn-tight">Đang giải mã năng lượng từ các lá bài...</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Interpretation Section */}
      {(allCardsRevealed || !reading.cards || reading.cards.length === 0) && !isLoading && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4 tracking-vn-tight">Giải Thích</h3>
          
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-lg overflow-hidden">
                <button 
                  className="w-full px-4 py-3 flex justify-between items-center text-left text-white font-medium tracking-vn-tight"
                  onClick={() => toggleSection(index)}
                >
                  <span>{section.title || `Phần ${index + 1}`}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform ${expandedSection === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === index && (
                  <div className="px-4 py-3 border-t border-purple-900/20 text-gray-300 tracking-vn-tight leading-vn">
                    <p>{section.content || 'Không có nội dung'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {interpretation && interpretation.interpretation && interpretation.interpretation.conclusion && (
            <div className="mt-6 p-4 bg-[#9370db]/10 rounded-lg">
              <p className="text-gray-300 tracking-vn-tight italic">
                "{interpretation.interpretation.conclusion}"
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center md:justify-between">
        <div className="flex gap-3">
          {onSave && (
            <button
              onClick={onSave}
              className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Lưu kết quả
            </button>
          )}
          
          {onShareClick && (
            <button
              onClick={onShareClick}
              className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Chia sẻ
            </button>
          )}
        </div>
        
        <Link
          to="/tarot-readings"
          className="bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
        >
          Xem bói mới
        </Link>
      </div>
    </div>
  );
});

ReadingResult.propTypes = {
  reading: PropTypes.object,
  interpretation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
  onShareClick: PropTypes.func
};

export default ReadingResult; 