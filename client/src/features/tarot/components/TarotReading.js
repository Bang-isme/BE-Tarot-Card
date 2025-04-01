import React, { useState, useEffect, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllCards, performReading, getInterpretation, clearSelectedCards } from '../slices/tarotSlice';
import TarotReadingForm from './TarotReadingForm';
import ReadingResult from './ReadingResult';
import TarotReadingLayout from './TarotReadingLayout';

/**
 * Component chính kết hợp form và kết quả đọc bài Tarot
 */
const TarotReading = memo(() => {
  const dispatch = useDispatch();
  const { cards, selectedCards, currentReading, interpretation, loading, error } = useSelector(state => state.tarot);
  const [readingStarted, setReadingStarted] = useState(false);
  const [readingStep, setReadingStep] = useState('form'); // 'form', 'shuffling', 'result'
  const [revealCount, setRevealCount] = useState(0);
  const [readingData, setReadingData] = useState(null);
  const [selectedDeckType, setSelectedDeckType] = useState('rider-waite');
  const [selectedReadingType, setSelectedReadingType] = useState('love');
  const [showIntro, setShowIntro] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isDealingCards, setIsDealingCards] = useState(false);
  const [tableCards, setTableCards] = useState([]);
  const [userSelectedCards, setUserSelectedCards] = useState([]);
  const [deckPosition, setDeckPosition] = useState({ x: 0, y: 0 });
  const [dealedCount, setDealedCount] = useState(0);

  // Fetch tất cả cards khi component mount
  useEffect(() => {
    if (!cards || cards.length === 0) {
      dispatch(fetchAllCards());
    }
    
    // Đặt timer để ẩn intro sau 3 giây
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    
    return () => clearTimeout(introTimer);
  }, [dispatch, cards]);
  
  // Xử lý khi bắt đầu trải bài
  useEffect(() => {
    if (isDealingCards && tableCards.length > 0) {
      // Reset dealedCount khi bắt đầu trải bài
      setDealedCount(0);
      
      // Trải bài tuần tự, 1 lá sau 1 lá
      const dealInterval = setInterval(() => {
        setDealedCount(prevCount => {
          const newCount = prevCount + 1;
          
          if (newCount >= tableCards.length) {
            clearInterval(dealInterval);
            // Đợi một chút sau khi trải hết bài rồi mới ẩn trạng thái trải bài
            setTimeout(() => {
              setIsDealingCards(false);
            }, 1000);
          }
          return newCount;
        });
      }, 150); // Cách nhau 150ms mỗi lá
      
      return () => clearInterval(dealInterval);
    }
  }, [isDealingCards, tableCards.length]);
  
  // Bắt đầu xáo bài
  const handleShuffleCards = useCallback(() => {
    setIsShuffling(true);
    setReadingStep('shuffling');
    
    // Lưu vị trí trung tâm của deck để tính toán animation
    const deckCenter = document.getElementById('deck-center');
    if (deckCenter) {
      const rect = deckCenter.getBoundingClientRect();
      setDeckPosition({ 
        x: window.innerWidth / 2 - rect.left - rect.width / 2,
        y: window.innerHeight / 2 - rect.top - rect.height / 2
      });
    }
    
    // Animation xốc bài mạnh (thay vì xáo bài thông thường)
    setTimeout(() => {
      setIsShuffling(false);
      
      // Lấy ngẫu nhiên 12 lá bài để trải ra bàn
      if (cards && cards.length > 0) {
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5).slice(0, 12);
        
        // Đặt tất cả các lá bài vào state nhưng chưa hiển thị
        setTableCards(shuffledCards);
        
        // Bắt đầu trải bài sau khi bộ bài đã di chuyển vào góc
        setTimeout(() => {
          setIsDealingCards(true);
        }, 1000);
      }
    }, 2500);
  }, [cards]);
  
  // Chọn một lá bài từ bàn
  const handleCardSelect = useCallback((card, index) => {
    if (!card || !card.id || userSelectedCards.length >= 3) return;
    
    // Kiểm tra xem lá bài đã được chọn chưa
    if (userSelectedCards.some(c => c && c.id === card.id)) {
      return;
    }
    
    // Thêm lá bài vào danh sách đã chọn
    setUserSelectedCards(prev => [...prev, { ...card, position: index }]);
    
    // Nếu đã chọn đủ 3 lá, tiến hành xem kết quả
    if (userSelectedCards.length === 2) {
      // Đợi một chút để hiển thị animation lá bài thứ 3 được chọn
      setTimeout(() => {
        setReadingData({
          readingType: selectedReadingType,
          numCards: 3
        });
      }, 1000);
    }
  }, [userSelectedCards, selectedReadingType]);
  
  // Hiển thị kết quả sau khi đã chọn đủ 3 lá bài
  const handleShowResult = useCallback(() => {
    setReadingStep('result');
    
    // Chuẩn bị dữ liệu đọc bài
    const readingCards = userSelectedCards.map(card => ({
      ...card,
      position: ['past', 'present', 'future'][card.position % 3]
    }));
    
    // Dispatch action để lấy kết quả đọc bài
    dispatch(getInterpretation({
      cards: readingCards,
      readingType: selectedReadingType
    }));
  }, [userSelectedCards, selectedReadingType, dispatch]);
  
  // Xử lý khi lưu kết quả
  const handleSaveReading = useCallback(() => {
    // Hiển thị thông báo thành công
    alert('Đã lưu kết quả thành công!');
    // Trong thực tế sẽ gọi API để lưu
  }, []);
  
  // Xử lý khi chia sẻ kết quả
  const handleShareReading = useCallback(() => {
    // Hiển thị modal chia sẻ
    alert('Chức năng chia sẻ đang được phát triển!');
    // Trong thực tế sẽ hiển thị modal với các options chia sẻ
  }, []);
  
  // Xử lý khi bắt đầu lại
  const handleRestart = useCallback(() => {
    setReadingStarted(false);
    setReadingStep('form');
    setRevealCount(0);
    setReadingData(null);
    setIsShuffling(false);
    setIsDealingCards(false);
    setTableCards([]);
    setUserSelectedCards([]);
    dispatch(clearSelectedCards());
  }, [dispatch]);

  // Hiệu ứng và biến thể animation
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };
  
  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({ 
      y: 0, 
      opacity: 1, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -10, 
      boxShadow: "0 10px 25px rgba(147, 112, 219, 0.3)",
      transition: { duration: 0.3 }
    }
  };
  
  const deckVariants = {
    initial: { scale: 1 },
    shuffling: {
      rotate: [0, 5, -5, 3, -3, 0],
      x: [0, 20, -20, 10, -10, 0],
      y: [0, -10, 0, -5, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    },
    // Xốc bài mạnh hơn
    shaking: {
      rotate: [0, 8, -8, 5, -5, 3, -3, 0],
      x: [0, 30, -30, 20, -20, 10, -10, 0],
      y: [0, -15, -5, -10, 0, -5, 0, 0],
      scale: [1, 1.05, 1, 1.03, 1, 1.02, 1, 1],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        times: [0, 0.1, 0.3, 0.4, 0.6, 0.7, 0.9, 1]
      }
    },
    // Bộ bài di chuyển vào góc trên bên trái theo đánh dấu đỏ
    corner: {
      x: -220,
      y: -210,
      scale: 0.65,
      rotate: [0, 3],
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    compact: {
      scale: 0.85,
      y: -100,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const tableCardVariants = {
    initial: { scale: 0, opacity: 0, rotateY: 180 },
    inDeck: { 
      x: deckPosition.x,
      y: deckPosition.y,
      scale: 0.7,
      opacity: 0,
      rotateY: 180 
    },
    // Lấy lá bài từ bộ bài ở góc và trải theo hình quạt gấp cân đối
    deal: (i) => {
      // Tính toán vị trí trong hình quạt gấp
      const totalCards = 12;
      const middleIndex = (totalCards - 1) / 2;
      
      // Góc quạt từ -35 đến 35 độ
      const fanAngle = -35 + (70 * i) / (totalCards - 1);
      // Tính toán góc radian
      const angle = (fanAngle * Math.PI) / 180;
      
      // Xác định bán kính của quạt
      const radius = 320;
      // Tính khoảng cách giữa các lá bài theo vị trí cung tròn
      const x = Math.sin(angle) * radius;
      const y = -Math.cos(angle) * radius * 0.3 + 60; // Thu nhỏ theo chiều dọc
      
      // Để các lá bài chồng mép lên nhau một phần, điều chỉnh z-index
      const zIndex = i < middleIndex ? i : totalCards - i;
      
      return {
        x: x,
        y: y,
        scale: 1,
        opacity: 1,
        rotateY: 0,
        rotate: fanAngle, // Xoay lá bài theo góc quạt
        zIndex: zIndex,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: i * 0.12
        }
      };
    },
    selected: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 15px 30px rgba(147, 112, 219, 0.3)",
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Render trang intro
  if (showIntro) {
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1a0933] to-[#2a1045]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="text-6xl mb-4"
            animate={{ 
              rotate: [0, 5, -5, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨🔮✨
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-vn-tight">
            Bói Tarot Online
          </h1>
          <p className="text-xl text-[#9370db] tracking-vn-tight">
            Khám phá tương lai của bạn...
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // Render theo các bước của quá trình bói bài
  return (
    <AnimatePresence mode="wait">
      {readingStep === 'form' && (
        <motion.div 
          className="space-y-8"
          key="form"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariants}
        >
          {error && (
            <motion.div
              className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 mb-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white tracking-vn-tight">{error}</p>
            </motion.div>
          )}
          
          {/* Header với minh họa */}
          <motion.div 
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-vn-tight">
              Trải Bài Tarot
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto tracking-vn-tight">
              Chọn bộ bài, loại trải bài và để năng lượng vũ trụ dẫn dắt bạn. Hãy đặt tâm trí vào câu hỏi của bạn khi chọn bài.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Lựa chọn bộ bài */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 hover:border-[#9370db]/40 transition-colors"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-medium text-white mb-4 tracking-vn-tight flex items-center">
                <span className="text-2xl mr-2">🎴</span> Chọn Bộ Bài
              </h2>
              <div className="space-y-3">
                {['rider-waite', 'thoth', 'marseille', 'wild-unknown'].map((deck) => (
                  <motion.button 
                    key={deck}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-base tracking-vn-tight flex items-center justify-between transition-all ${
                      selectedDeckType === deck 
                        ? 'bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white shadow-lg shadow-[#9370db]/20' 
                        : 'bg-white/10 text-gray-200 hover:bg-white/15'
                    }`}
                    onClick={() => setSelectedDeckType(deck)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>
                      {deck === 'rider-waite' ? 'Rider Waite Smith' : 
                       deck === 'thoth' ? 'Thoth Tarot' : 
                       deck === 'marseille' ? 'Tarot of Marseilles' :
                       'The Wild Unknown'}
                    </span>
                    {selectedDeckType === deck && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Lựa chọn loại đọc bài */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 hover:border-[#9370db]/40 transition-colors"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-medium text-white mb-4 tracking-vn-tight flex items-center">
                <span className="text-2xl mr-2">🔮</span> Chọn Loại Bói Bài
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'love', name: 'Tình Yêu & Mối Quan Hệ', icon: '❤️' },
                  { id: 'career', name: 'Sự Nghiệp & Tài Chính', icon: '💼' },
                  { id: 'spiritual', name: 'Phát Triển Bản Thân', icon: '✨' },
                  { id: 'health', name: 'Sức Khỏe & Tinh Thần', icon: '🧘‍♀️' },
                  { id: 'decisions', name: 'Giải Quyết Vấn Đề', icon: '🔍' }
                ].map((type) => (
                  <motion.button 
                    key={type.id}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-base tracking-vn-tight flex items-center justify-between transition-all ${
                      selectedReadingType === type.id 
                        ? 'bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white shadow-lg shadow-[#9370db]/20' 
                        : 'bg-white/10 text-gray-200 hover:bg-white/15'
                    }`}
                    onClick={() => setSelectedReadingType(type.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{type.icon}</span>
                      {type.name}
                    </span>
                    {selectedReadingType === type.id && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Nút bắt đầu bói bài */}
          <motion.div 
            className="text-center mt-10 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white py-4 px-12 rounded-lg font-semibold text-lg shadow-lg shadow-[#9370db]/20 tracking-vn-tight"
              onClick={handleShuffleCards}
              whileHover={{ 
                y: -3,
                boxShadow: "0 10px 25px rgba(147, 112, 219, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: ["0 5px 15px rgba(147, 112, 219, 0.3)", "0 8px 25px rgba(147, 112, 219, 0.5)", "0 5px 15px rgba(147, 112, 219, 0.3)"],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <span className="flex items-center">
                <span className="mr-2">✨</span>
                BẮT ĐẦU BÓI BÀI
                <span className="ml-2">✨</span>
              </span>
            </motion.button>
            
            <motion.p 
              className="text-gray-400 text-sm mt-3 tracking-vn-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hãy tập trung vào câu hỏi của bạn trước khi bắt đầu
            </motion.p>
          </motion.div>
        </motion.div>
      )}
      
      {readingStep === 'shuffling' && (
        <motion.div 
          className="space-y-8"
          key="shuffling"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariants}
        >
          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 tracking-vn-tight text-center">
              <span className="text-[#9370db] mr-2">✨</span>
              {isShuffling ? "Đang Xáo Bài..." : isDealingCards ? "Đang Trải Bài..." : "Chọn 3 Lá Bài"}
              <span className="text-[#9370db] ml-2">✨</span>
            </h2>
            
            {(isShuffling || (!isDealingCards && tableCards.length === 0)) && (
              <p className="text-gray-300 text-center mb-8 tracking-vn-tight">
                Hãy tập trung vào câu hỏi của bạn trong khi bài đang được xáo...
              </p>
            )}
            
            {!isShuffling && isDealingCards && tableCards.length > 0 && (
              <p className="text-gray-300 text-center mb-8 tracking-vn-tight">
                Bài đang được trải ra...
              </p>
            )}
            
            {!isShuffling && !isDealingCards && tableCards.length > 0 && (
              <p className="text-gray-300 text-center mb-8 tracking-vn-tight">
                Hãy chọn {3 - userSelectedCards.length} lá bài để xem kết quả
              </p>
            )}
            
            <div className="relative min-h-[400px]">
              {/* Animation xáo bài */}
              <div id="deck-center" className="relative h-[300px] max-w-md mx-auto">
                <motion.div 
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  variants={deckVariants}
                  initial="initial"
                  animate={isShuffling ? "shaking" : isDealingCards || tableCards.length > 0 ? "corner" : "initial"}
                >
                  {/* Bộ bài */}
                  <div className="relative h-[220px] w-[150px]">
                    {Array.from({ length: 20 }).map((_, index) => (
                      <motion.div
                        key={`shuffle-${index}`}
                        className="absolute h-[220px] w-[150px] bg-gradient-to-br from-[#2a1045] to-[#3a1c5a] rounded-lg border border-[#9370db]/30 shadow-lg"
                        style={{ 
                          zIndex: 20 - index,
                          top: `${index * 0.5}px`, 
                          left: `${index * 0.5}px`,
                          transform: `rotate(${index % 2 === 0 ? index * 0.2 : index * -0.2}deg)`
                        }}
                        animate={{
                          rotate: isShuffling ? 
                            [index % 2 === 0 ? index * 0.2 : index * -0.2, 
                             index % 2 === 0 ? index * -0.5 : index * 0.5, 
                             index % 2 === 0 ? index * 0.2 : index * -0.2] : 
                            [index % 2 === 0 ? index * 0.2 : index * -0.2],
                          // Thêm hiệu ứng rung lắc khi xốc bài
                          y: isShuffling ? 
                            [0, index % 3 === 0 ? -3 : (index % 3 === 1 ? 2 : -1), 0] : 
                            0,
                          x: isShuffling ? 
                            [0, index % 2 === 0 ? 2 : -2, 0] : 
                            0,
                        }}
                        transition={{
                          duration: 2,
                          repeat: isShuffling ? 5 : 0,
                          repeatType: "reverse"
                        }}
                      >
                        <div className="h-full w-full bg-[url('/src/assets/images/tarot-card-back.jpg')] bg-cover bg-center rounded-lg"></div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Bài đã được trải ra bàn theo hình quạt gấp */}
              {tableCards.length > 0 && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative w-full h-[350px] max-w-4xl">
                    {tableCards.map((card, index) => {
                      const isSelected = userSelectedCards.some(c => c && c.id === card.id);
                      // Tính toán z-index để các lá bài hiển thị đúng thứ tự chồng lên nhau
                      const totalCards = tableCards.length;
                      const middleIndex = Math.floor((totalCards - 1) / 2);
                      const zIndex = index < middleIndex ? index : (totalCards - index);
                      
                      return (
                        <motion.div
                          key={`table-${index}`}
                          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isSelected ? 'pointer-events-none' : ''}`}
                          style={{ zIndex: isSelected ? 50 : 20 + zIndex }}
                          variants={tableCardVariants}
                          custom={index}
                          initial="inDeck"
                          animate={isDealingCards ? 
                                    (index < dealedCount ? "deal" : "inDeck") : 
                                    isSelected ? "selected" : "deal"}
                          whileHover={(!isDealingCards && !isSelected) ? { y: '-10px', scale: 1.05, transition: { duration: 0.2 } } : {}}
                          onClick={() => !isDealingCards && handleCardSelect(card, index)}
                        >
                          <div className="h-[180px] w-[110px] bg-gradient-to-br from-[#2a1045] to-[#3a1c5a] rounded-lg border border-[#9370db]/30 shadow-lg overflow-hidden">
                            {isSelected ? (
                              <img 
                                src={card.imageUrl || '/images/tarot/default-card.jpg'} 
                                alt={card.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-[url('/src/assets/images/tarot-card-back.jpg')] bg-cover bg-center rounded-lg"></div>
                            )}
                          </div>
                          
                          {isSelected && (
                            <motion.div 
                              className="absolute -bottom-2 left-0 right-0 mx-auto"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <span className="bg-[#9370db] text-white text-xs rounded-full px-2 py-1 inline-block">
                                {userSelectedCards.findIndex(c => c && c.id === card.id) === 0 ? 'BẢN THÂN' : 
                                userSelectedCards.findIndex(c => c && c.id === card.id) === 1 ? 'HOÀN CẢNH' : 'THỬ THÁCH'}
                              </span>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Hiển thị các lá bài đã chọn */}
            {userSelectedCards.length > 0 && (
              <motion.div 
                className="mt-12 p-6 bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6 tracking-vn-tight text-center">Lá Bài Đã Chọn</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {userSelectedCards.map((card, index) => (
                    <motion.div 
                      key={`selected-${index}`} 
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="relative w-[110px] h-[180px] rounded-lg overflow-hidden shadow-lg border border-[#9370db]/30">
                        <img 
                          src={card.imageUrl || '/images/tarot/default-card.jpg'} 
                          alt={card.name} 
                          className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a0933] to-transparent p-2">
                          <p className="text-white text-xs font-medium text-center truncate">
                            {card.name || 'Tarot Card'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 w-full">
                        <div className="bg-gradient-to-r from-transparent via-[#9370db]/30 to-transparent h-[1px] mb-3"></div>
                        <p className="text-center text-white text-sm font-semibold tracking-vn-tight">
                          {index === 0 ? (
                            <span className="flex items-center justify-center">
                              <span className="text-[#9370db] mr-1">•</span> BẢN THÂN <span className="text-[#9370db] ml-1">•</span>
                            </span>
                          ) : index === 1 ? (
                            <span className="flex items-center justify-center">
                              <span className="text-[#9370db] mr-1">•</span> HOÀN CẢNH <span className="text-[#9370db] ml-1">•</span>
                            </span>
                          ) : (
                            <span className="flex items-center justify-center">
                              <span className="text-[#9370db] mr-1">•</span> THỬ THÁCH <span className="text-[#9370db] ml-1">•</span>
                            </span>
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Hiển thị vị trí còn trống */}
                  {Array.from({ length: Math.max(0, 3 - userSelectedCards.length) }).map((_, i) => (
                    <motion.div 
                      key={`empty-${i}`} 
                      className="flex flex-col items-center opacity-60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="w-[110px] h-[180px] rounded-lg border border-[#9370db]/20 border-dashed flex items-center justify-center bg-white/5">
                        <span className="text-gray-400 text-4xl">?</span>
                      </div>
                      <div className="mt-4 w-full">
                        <div className="bg-gradient-to-r from-transparent via-[#9370db]/10 to-transparent h-[1px] mb-3"></div>
                        <p className="text-center text-gray-400 text-sm font-medium tracking-vn-tight">
                          {userSelectedCards.length + i === 0 ? 'BẢN THÂN' : 
                           userSelectedCards.length + i === 1 ? 'HOÀN CẢNH' : 'THỬ THÁCH'}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Nút xem kết quả */}
            {userSelectedCards.length === 3 && (
              <motion.div 
                className="text-center mt-8 py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white py-4 px-12 rounded-lg font-semibold text-lg shadow-lg shadow-[#9370db]/20 tracking-vn-tight"
                  onClick={handleShowResult}
                  whileHover={{ 
                    y: -3,
                    boxShadow: "0 10px 25px rgba(147, 112, 219, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <span className="mr-2">✨</span>
                    XEM KẾT QUẢ
                    <span className="ml-2">✨</span>
                  </span>
                </motion.button>
              </motion.div>
            )}

            {/* Nút hủy */}
            {(isShuffling || isDealingCards || tableCards.length > 0) && (
              <motion.div 
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={handleRestart}
                  className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Bắt đầu lại
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
      
      {readingStep === 'result' && (
        <motion.div
          key="result"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeVariants}
        >
          <ReadingResult 
            reading={{ 
              cards: userSelectedCards,
              readingType: selectedReadingType
            }}
            interpretation={interpretation || ''}
            isLoading={loading}
            onSave={handleSaveReading}
            onShareClick={handleShareReading}
          />
          
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={handleRestart}
              className="bg-gradient-to-r from-[#9370db]/90 to-[#8a2be2]/90 text-white px-8 py-4 rounded-lg font-semibold tracking-vn-tight inline-flex items-center shadow-lg shadow-[#9370db]/10"
              whileHover={{ 
                y: -3,
                boxShadow: "0 10px 25px rgba(147, 112, 219, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Trải Bài Mới
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default TarotReading; 