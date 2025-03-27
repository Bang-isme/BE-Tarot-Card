import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import TarotCard from "../../../components/tarot/TarotCard";
import TarotCardMeaning from "../../../components/tarot/TarotCardMeaning";
import ReadingOptions from "../../../components/tarot/ReadingOptions";
import FeaturedReadings from "../../../components/tarot/FeaturedReadings";
import {
  initDeck,
  setSelectedSpread,
  shuffleDeck,
  selectCard,
  setSelectedCardForMeaning,
  resetReading
} from "../../../store/actions/tarotActions";

const Tarot = () => {
  const dispatch = useDispatch();
  const { 
    deck, 
    selectedSpread, 
    selectedCards, 
    isSelectingCards, 
    step,
    selectedCardForMeaning
  } = useSelector(state => state.tarot);

  // Khởi tạo bộ bài
  useEffect(() => {
    dispatch(initDeck());
  }, [dispatch]);

  // Xử lý chọn loại trải bài
  const handleSelectSpread = (spread) => {
    dispatch(setSelectedSpread(spread));
  };

  // Xử lý bắt đầu đọc bài
  const handleStartReading = () => {
    dispatch(shuffleDeck());
  };

  // Xử lý chọn lá bài
  const handleSelectCard = (index) => {
    if (isSelectingCards) {
      dispatch(selectCard(index, deck, selectedCards, selectedSpread));
    }
  };

  // Xử lý hiển thị ý nghĩa lá bài
  const handleShowCardMeaning = (card) => {
    dispatch(setSelectedCardForMeaning(card));
  };

  // Xử lý đóng modal ý nghĩa lá bài
  const handleCloseCardMeaning = () => {
    dispatch(setSelectedCardForMeaning(null));
  };

  // Xử lý reset trải bài
  const handleResetReading = () => {
    dispatch(resetReading());
    dispatch(initDeck());
  };

  // Helper function để lấy số lá bài cần thiết cho loại trải bài
  const getCardsNeeded = () => {
    switch (selectedSpread) {
      case "one-card":
        return 1;
      case "three-card":
        return 3;
      case "celtic-cross":
        return 10;
      default:
        return 1;
    }
  };

  // Helper function để lấy tên vị trí dựa trên loại trải bài
  const getPositionName = (index) => {
    if (selectedSpread === "one-card") {
      return "Thông điệp cho bạn";
    } else if (selectedSpread === "three-card") {
      const positions = ["Quá khứ", "Hiện tại", "Tương lai"];
      return positions[index] || "";
    } else if (selectedSpread === "celtic-cross") {
      const positions = [
        "Hiện tại",
        "Thách thức",
        "Quá khứ",
        "Tương lai",
        "Trên",
        "Dưới",
        "Lời khuyên",
        "Ảnh hưởng",
        "Hy vọng/Lo sợ",
        "Kết quả",
      ];
      return positions[index] || "";
    }
    return "";
  };

  // Helper function để lấy tên trải bài
  const getSpreadName = () => {
    if (selectedSpread === "one-card") {
      return "đơn";
    } else if (selectedSpread === "three-card") {
      return "quá khứ - hiện tại - tương lai";
    } else if (selectedSpread === "celtic-cross") {
      return "Celtic Cross";
    }
    return "";
  };

  // Helper function để định vị các lá bài trong trải bài Celtic Cross
  const getCelticCrossPosition = (index) => {
    switch (index) {
      case 0:
        return "col-start-2 row-start-2"; // Center
      case 1:
        return "col-start-2 row-start-2"; // Crossing
      case 2:
        return "col-start-1 row-start-2"; // Below
      case 3:
        return "col-start-3 row-start-2"; // Above
      case 4:
        return "col-start-2 row-start-1"; // Past
      case 5:
        return "col-start-2 row-start-3"; // Future
      case 6:
        return "col-start-4 row-start-1"; // Position 7
      case 7:
        return "col-start-4 row-start-2"; // Position 8
      case 8:
        return "col-start-4 row-start-3"; // Position 9
      case 9:
        return "col-start-4 row-start-4"; // Position 10
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0933] text-white">
      <div className="container mx-auto px-4 py-8">
        {step === "home" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
              <div>
                <div className="mb-4 inline-block">
                  <span className="text-[#f0c05a] uppercase tracking-wider text-sm font-medium">
                    GIẢI MÃ CUỘC SỐNG VỚI TAROT
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Bói bài Tarot online miễn phí và chính xác nhất</h1>
                <p className="text-gray-300 mb-8">
                  Tarot là phương pháp sử dụng những lá bài Tarot để xem bói và dự đoán về tương lai, tình yêu, công
                  việc, tiền tài và sức khỏe. Một bộ bài Tarot bao gồm 78 lá bài, mỗi lá bài mang một ý nghĩa và biểu
                  tượng riêng biệt, tương trưng cho những khía cạnh khác nhau của cuộc sống.
                </p>
                <button
                  onClick={handleStartReading}
                  className="bg-gradient-to-r from-[#e67e22] to-[#f0c05a] text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
                >
                  Bói Tarot Online
                </button>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-96">
                  <div className="absolute inset-0 bg-[#2a1045] rounded-lg border border-[#f0c05a]/30 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-[#f0c05a]/10 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-[#f0c05a]/20 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-[#f0c05a]/30 flex items-center justify-center">
                            <MoonSunIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 w-4 h-4">
                      <MoonPhaseIcon />
                    </div>
                    <div className="absolute top-4 right-4 w-4 h-4">
                      <MoonPhaseIcon />
                    </div>
                    <div className="absolute bottom-4 left-4 w-4 h-4">
                      <MoonPhaseIcon />
                    </div>
                    <div className="absolute bottom-4 right-4 w-4 h-4">
                      <MoonPhaseIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ReadingOptions onSelectSpread={handleSelectSpread} onStartReading={handleStartReading} />
            <FeaturedReadings />
          </div>
        )}

        {step === "selecting" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Chọn {getCardsNeeded()} lá bài từ bộ bài
              <span className="block text-sm mt-1 text-[#f0c05a]">
                {selectedCards.length} / {getCardsNeeded()} đã chọn
              </span>
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3 justify-center">
              {deck.slice(0, 21).map((_, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleSelectCard(index)}
                >
                  <TarotCard isBackShowing={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "reading" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Kết quả lá bài {getSpreadName()} của bạn
            </h2>

            <div
              className={`
              grid gap-6 justify-center mb-10
              ${selectedSpread === "one-card" ? "grid-cols-1" : ""}
              ${selectedSpread === "three-card" ? "grid-cols-1 sm:grid-cols-3" : ""}
              ${selectedSpread === "celtic-cross" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3" : ""}
            `}
            >
              {selectedCards.map((card, index) => (
                <div
                  key={index}
                  className={`
                    flex flex-col items-center
                    ${selectedSpread === "celtic-cross" ? getCelticCrossPosition(index) : ""}
                  `}
                >
                  <div onClick={() => handleShowCardMeaning(card)} className="cursor-pointer">
                    <TarotCard card={card} />
                  </div>
                  <p className="text-center mt-3 text-[#f0c05a]">{getPositionName(index)}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleResetReading}
                className="bg-gradient-to-r from-[#e67e22] to-[#f0c05a] text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
              >
                Bói Lại
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedCardForMeaning && (
          <TarotCardMeaning card={selectedCardForMeaning} onClose={handleCloseCardMeaning} />
        )}
      </AnimatePresence>
    </div>
  );
};

function MoonSunIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="#f0c05a" strokeWidth="1.5" />
      <path d="M24 4C24 4 28 12 28 24C28 36 24 44 24 44" stroke="#f0c05a" strokeWidth="1.5" />
      <path d="M24 4C24 4 20 12 20 24C20 36 24 44 24 44" stroke="#f0c05a" strokeWidth="1.5" />
      <path d="M4 24H44" stroke="#f0c05a" strokeWidth="1.5" />
      <path d="M8 14H40" stroke="#f0c05a" strokeWidth="1.5" />
      <path d="M8 34H40" stroke="#f0c05a" strokeWidth="1.5" />
      <path
        d="M24 24C26.2091 24 28 22.2091 28 20C28 17.7909 26.2091 16 24 16C21.7909 16 20 17.7909 20 20C20 22.2091 21.7909 24 24 24Z"
        fill="#f0c05a"
      />
      <path
        d="M24 32C25.1046 32 26 31.1046 26 30C26 28.8954 25.1046 28 24 28C22.8954 28 22 28.8954 22 30C22 31.1046 22.8954 32 24 32Z"
        fill="#f0c05a"
      />
    </svg>
  );
}

function MoonPhaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
        fill="#f0c05a"
        fillOpacity="0.3"
      />
      <path d="M12 4C7.59 4 4 7.59 4 12C4 16.41 7.59 20 12 20V4Z" fill="#f0c05a" fillOpacity="0.3" />
    </svg>
  );
}

export default Tarot;