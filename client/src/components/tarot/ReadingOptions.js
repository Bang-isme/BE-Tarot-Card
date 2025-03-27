// src/components/tarot/ReadingOptions.js
import React, { useState } from "react";

const ReadingOptions = ({ onSelectSpread, onStartReading }) => {
  const [selectedSpread, setSelectedSpread] = useState("one-card");

  const handleSpreadChange = (spread) => {
    setSelectedSpread(spread);
    onSelectSpread(spread);
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#f0c05a]">Tính năng nổi bật</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div
          className={`
            bg-[#2a1045] rounded-lg p-6 border border-transparent transition-all cursor-pointer
            ${selectedSpread === "one-card" ? "border-[#f0c05a]" : "hover:border-[#f0c05a]/30"}
          `}
          onClick={() => handleSpreadChange("one-card")}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#f0c05a]/10 flex items-center justify-center">
              <span className="text-[#f0c05a] text-2xl">1</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">Bói bài Tarot</h3>
          <p className="text-gray-300 text-center text-sm">
            Rút một lá bài để nhận thông điệp ngắn gọn và súc tích cho vấn đề của bạn.
          </p>
        </div>

        <div
          className={`
            bg-[#2a1045] rounded-lg p-6 border border-transparent transition-all cursor-pointer
            ${selectedSpread === "three-card" ? "border-[#f0c05a]" : "hover:border-[#f0c05a]/30"}
          `}
          onClick={() => handleSpreadChange("three-card")}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#f0c05a]/10 flex items-center justify-center">
              <span className="text-[#f0c05a] text-2xl">3</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">Trải bài Tarot 1:1</h3>
          <p className="text-gray-300 text-center text-sm">
            Rút ba lá bài để hiểu rõ về quá khứ, hiện tại và tương lai của vấn đề bạn đang quan tâm.
          </p>
        </div>

        <div
          className={`
            bg-[#2a1045] rounded-lg p-6 border border-transparent transition-all cursor-pointer
            ${selectedSpread === "celtic-cross" ? "border-[#f0c05a]" : "hover:border-[#f0c05a]/30"}
          `}
          onClick={() => handleSpreadChange("celtic-cross")}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#f0c05a]/10 flex items-center justify-center">
              <span className="text-[#f0c05a] text-xl">10</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">Bói bài hàng ngày</h3>
          <p className="text-gray-300 text-center text-sm">
            Trải bài Celtic Cross với 10 lá bài để có cái nhìn toàn diện và chi tiết về tình huống của bạn.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onStartReading}
          className="bg-gradient-to-r from-[#e67e22] to-[#f0c05a] text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
        >
          Bắt đầu bói bài
        </button>
      </div>
    </div>
  );
};

export default ReadingOptions;