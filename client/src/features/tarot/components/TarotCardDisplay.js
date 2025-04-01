import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Component hiển thị lá bài Tarot với animation
 * @param {Object} props - Component props
 * @param {Object} props.card - Thông tin lá bài
 * @param {boolean} props.isRevealed - Trạng thái lá bài (đã lật hay chưa)
 * @param {Function} props.onCardClick - Callback khi click vào lá bài
 * @param {boolean} props.isSelectable - Có thể select lá bài hay không
 * @param {boolean} props.isSelected - Lá bài đã được chọn hay chưa
 * @param {string} props.size - Kích thước lá bài ("small", "medium", "large")
 * @param {string} props.position - Vị trí lá bài trong trải bài
 */
const TarotCardDisplay = memo(({ 
  card = {}, 
  isRevealed = false, 
  onCardClick, 
  isSelectable = false,
  isSelected = false,
  size = 'medium',
  position = ''
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReversal, setIsReversal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Xác định lá bài ngược dựa vào dữ liệu card hoặc random
  useEffect(() => {
    if (card && card.isReversed !== undefined) {
      setIsReversal(card.isReversed);
    } else {
      // 20% cơ hội lá bài sẽ ngược
      setIsReversal(Math.random() < 0.2);
    }
  }, [card]);

  // Flip animation khi isRevealed thay đổi
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsFlipped(false);
    }
  }, [isRevealed]);

  // Xác định kích thước của lá bài
  const sizeClasses = {
    small: 'w-24 h-36',
    medium: 'w-32 h-48',
    large: 'w-40 h-60',
  };

  // Handler khi hover vào lá bài
  const handleMouseEnter = () => {
    if (isSelectable) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Handler khi click vào lá bài
  const handleCardClick = () => {
    if (isSelectable && onCardClick) {
      onCardClick(card);
    }
  };

  // Fallback cho các hình ảnh không load được
  const generateFallbackImage = (cardName) => {
    // Tạo URL placeholder với tên lá bài
    const encodedName = encodeURIComponent(cardName || 'Tarot Card');
    return `https://via.placeholder.com/600x900/2a1045/9370db?text=${encodedName}`;
  };

  if (!card) {
    // Trả về card rỗng nếu card là null hoặc undefined
    return (
      <div 
        className={`absolute ${position} transition-transform duration-300`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div 
          className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden ${
            size === 'small' ? 'w-24 h-36' : 
            size === 'medium' ? 'w-32 h-48' : 
            'w-40 h-60'
          }`} 
        />
      </div>
    );
  }

  // Animation variants
  const cardVariants = {
    hidden: {
      rotateY: 0
    },
    visible: {
      rotateY: 180,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  
  const cardBackVariants = {
    hidden: {
      opacity: 1
    },
    visible: {
      opacity: 0,
      transition: {
        duration: 0.25,
        delay: 0.25
      }
    }
  };
  
  const cardFrontVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.25,
        delay: 0.25
      }
    }
  };
  
  // Default card back image
  const defaultCardBack = '/src/assets/images/tarot-card-back.jpg';
  const fallbackCardBack = 'https://via.placeholder.com/600x900/2a1045/9370db?text=Tarot';
  
  return (
    <div 
      className={`absolute ${position} transition-transform duration-300`}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        className={`relative ${sizeClasses[size] || sizeClasses.medium} cursor-pointer perspective-500`}
        initial="hidden"
        animate={isRevealed ? "visible" : "hidden"}
        variants={cardVariants}
        onClick={handleCardClick}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-lg shadow-lg overflow-hidden"
          variants={cardBackVariants}
        >
          <img 
            src={defaultCardBack} 
            alt="Card Back" 
            className="w-full h-full object-cover object-center"
            onError={e => {
              console.error("Error loading card back image:", e);
              e.target.src = fallbackCardBack;
            }}
          />
        </motion.div>
        
        {/* Card Front */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-lg shadow-lg overflow-hidden rotateY-180"
          variants={cardFrontVariants}
        >
          <div className={`w-full h-full relative ${card.isReversed ? 'rotate-180' : ''}`}>
            <img 
              src={card.imageUrl || generateFallbackImage(card.name)}
              alt={card.name || 'Tarot Card'} 
              className="w-full h-full object-cover object-center"
              onError={e => {
                console.error("Error loading card image:", e, card);
                e.target.src = generateFallbackImage(card.name);
              }}
            />
            
            {/* Card Name */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-2">
              <p className="text-white text-center text-xs md:text-sm font-medium truncate">
                {card.name || 'Tarot Card'}
                {card.isReversed && ' (Reversed)'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

TarotCardDisplay.propTypes = {
  card: PropTypes.object,
  isRevealed: PropTypes.bool,
  onCardClick: PropTypes.func,
  isSelectable: PropTypes.bool,
  isSelected: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  position: PropTypes.string
};

export default TarotCardDisplay; 