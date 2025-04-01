import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import TarotCardDisplay from './TarotCardDisplay';

/**
 * Component hiển thị layout trải bài tarot với animation
 * @param {Object} props - Component props
 * @param {string} props.readingType - Loại trải bài ("three-card", "celtic-cross", "love", "career", etc.)
 * @param {Array} props.cards - Mảng các lá bài
 * @param {boolean} props.isRevealing - Đang trong quá trình lật bài
 * @param {number} props.revealCount - Số lá bài đã lật
 */
const TarotReadingLayout = memo(({ 
  readingType = 'three-card', 
  cards = [], 
  isRevealing = false,
  revealCount = 0
}) => {
  // State quản lý số lá bài đã hiển thị
  const [visibleCards, setVisibleCards] = useState(0);
  const [currentReveal, setCurrentReveal] = useState(0);
  const [layoutReady, setLayoutReady] = useState(false);
  
  // Hiệu ứng xuất hiện dần của các lá bài
  useEffect(() => {
    if (cards && cards.length > 0) {
      const interval = setInterval(() => {
        setVisibleCards(prev => {
          if (prev < cards.length) {
            return prev + 1;
          }
          clearInterval(interval);
          setLayoutReady(true);
          return prev;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [cards]);
  
  // Theo dõi quá trình lật bài
  useEffect(() => {
    setCurrentReveal(revealCount);
  }, [revealCount]);
  
  // Xác định vị trí của từng lá bài dựa vào loại trải bài
  const getLayout = () => {
    switch (readingType) {
      case 'three-card':
        return {
          container: 'h-[300px] md:h-[350px]',
          positions: [
            'left-[15%] top-1/2 -translate-y-1/2',
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'right-[15%] top-1/2 -translate-y-1/2'
          ],
          labels: ['Quá khứ', 'Hiện tại', 'Tương lai']
        };
        
      case 'celtic-cross':
        return {
          container: 'h-[500px] md:h-[550px]',
          positions: [
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', // Center card
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90', // Crossing card
            'left-1/2 bottom-[10%] -translate-x-1/2', // Below
            'left-1/2 top-[10%] -translate-x-1/2', // Above
            'left-[15%] top-1/2 -translate-y-1/2', // Left
            'right-[15%] top-1/2 -translate-y-1/2', // Right
            'right-[5%] bottom-[20%]', // Position 7
            'right-[5%] bottom-[60%]', // Position 8
            'right-[5%] top-[60%]', // Position 9
            'right-[5%] top-[20%]', // Position 10
          ],
          labels: [
            'Hiện tại', 'Thách thức', 'Nền tảng', 'Quá khứ', 
            'Ảnh hưởng sắp tới', 'Tương lai', 'Bản thân', 
            'Môi trường', 'Hy vọng/Sợ hãi', 'Kết quả'
          ]
        };
        
      case 'love':
        return {
          container: 'h-[350px] md:h-[400px]',
          positions: [
            'left-[10%] top-1/2 -translate-y-1/2',
            'left-[30%] top-1/2 -translate-y-1/2',
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'right-[30%] top-1/2 -translate-y-1/2',
            'right-[10%] top-1/2 -translate-y-1/2'
          ],
          labels: [
            'Bạn', 'Cảm xúc của bạn', 'Mối quan hệ', 
            'Cảm xúc của họ', 'Người ấy'
          ]
        };
        
      case 'career':
        return {
          container: 'h-[350px] md:h-[400px]',
          positions: [
            'left-[10%] top-1/2 -translate-y-1/2',
            'left-[30%] top-1/2 -translate-y-1/2',
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'right-[30%] top-1/2 -translate-y-1/2',
            'right-[10%] top-1/2 -translate-y-1/2'
          ],
          labels: [
            'Hiện tại', 'Thách thức', 'Lời khuyên', 
            'Tiềm năng', 'Kết quả'
          ]
        };
        
      default:
        // Circular layout
        const positions = [];
        const labels = [];
        
        if (cards && cards.length > 0) {
          for (let i = 0; i < cards.length; i++) {
            const angle = (i / cards.length) * 2 * Math.PI;
            const radius = cards.length <= 5 ? 35 : 40; // percentage
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            positions.push(`left-[${x}%] top-[${y}%] -translate-x-1/2 -translate-y-1/2`);
            labels.push(`Lá ${i + 1}`);
          }
        }
        
        return {
          container: 'h-[400px] md:h-[450px]',
          positions: positions,
          labels: labels
        };
    }
  };
  
  const layout = getLayout();
  
  // Nếu không có cards, hiển thị trạng thái loading
  if (!cards || cards.length === 0) {
    return (
      <div className="h-[300px] md:h-[350px] bg-gradient-to-br from-[#2a1045]/30 to-[#3a1c5a]/30 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-[#9370db] border-t-transparent animate-spin"></div>
          <p className="text-white tracking-vn-tight">Đang chuẩn bị bài...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative ${layout.container} bg-gradient-to-br from-[#2a1045]/30 to-[#3a1c5a]/30 rounded-xl overflow-hidden mb-10`}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/images/tarot-pattern.png')] bg-repeat opacity-5"></div>
      
      {/* Center glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#9370db]/20 rounded-full filter blur-3xl"></div>
      
      {/* Cards */}
      {cards && cards.map((card, index) => {
        // Đảm bảo card là đối tượng hợp lệ và có vị trí trong layout
        if (!card || index >= (layout.positions ? layout.positions.length : 0) || index >= visibleCards) {
          return null;
        }
        
        return (
          <div key={card.id || `card-${index}`} className="absolute z-10">
            <TarotCardDisplay 
              card={card}
              isRevealed={isRevealing && index < currentReveal}
              size="medium"
              position={layout.positions[index] || ''}
            />
            
            {/* Position label */}
            {layoutReady && layout.labels && layout.labels[index] && (
              <div className={`absolute ${
                readingType === 'celtic-cross' && index === 1 
                  ? 'left-1/2 -translate-x-1/2 -bottom-10' 
                  : 'left-1/2 -translate-x-1/2 -top-8'
              }`}>
                <div className="px-2 py-1 bg-[#9370db]/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs text-white opacity-80 tracking-vn-tight">
                    {layout.labels[index] || `Lá ${index + 1}`}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Loading or instruction overlay */}
      {(!layoutReady || (isRevealing && cards && currentReveal < cards.length)) && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0f051d]/50 backdrop-blur-sm z-20">
          <div className="text-center">
            {!layoutReady ? (
              <>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-[#9370db] border-t-transparent animate-spin"></div>
                <p className="text-white tracking-vn-tight">Đang trải bài...</p>
              </>
            ) : (
              <p className="text-white tracking-vn-tight">Lật từng lá bài để xem kết quả...</p>
            )}
          </div>
        </div>
      )}
      
      {/* Mystic elements */}
      <div className="absolute left-5 top-5 w-10 h-10 text-2xl animate-float opacity-30">✨</div>
      <div className="absolute right-10 bottom-10 w-8 h-8 text-xl animate-float opacity-30 animation-delay-1000">🌙</div>
      <div className="absolute right-5 top-1/4 w-8 h-8 text-xl animate-float opacity-30 animation-delay-2000">⭐</div>
      <div className="absolute left-10 bottom-1/4 w-6 h-6 text-lg animate-float opacity-30 animation-delay-3000">✨</div>
    </div>
  );
});

TarotReadingLayout.propTypes = {
  readingType: PropTypes.string,
  cards: PropTypes.array,
  isRevealing: PropTypes.bool,
  revealCount: PropTypes.number
};

export default TarotReadingLayout; 