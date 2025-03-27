// src/components/tarot/FeaturedReadings.js
import React from "react";

const FeaturedReadings = () => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-10">Khám phá những khía cạnh bí ẩn của cuộc sống</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#2a1045] rounded-lg overflow-hidden">
          <div className="h-40 bg-gradient-to-b from-[#3a1c5a] to-[#2a1045] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#f0c05a]/20 flex items-center justify-center">
              <HeartIcon />
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-center">Tình yêu</h3>
            <p className="text-gray-300 text-center text-sm">
              Khám phá tình hình tình cảm hiện tại và tương lai của bạn thông qua các lá bài Tarot.
            </p>
          </div>
        </div>

        <div className="bg-[#2a1045] rounded-lg overflow-hidden">
          <div className="h-40 bg-gradient-to-b from-[#3a1c5a] to-[#2a1045] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#f0c05a]/20 flex items-center justify-center">
              <CareerIcon />
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-center">Sự nghiệp</h3>
            <p className="text-gray-300 text-center text-sm">
              Tìm hiểu về con đường sự nghiệp và những cơ hội đang chờ đợi bạn trong tương lai.
            </p>
          </div>
        </div>

        <div className="bg-[#2a1045] rounded-lg overflow-hidden">
          <div className="h-40 bg-gradient-to-b from-[#3a1c5a] to-[#2a1045] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#f0c05a]/20 flex items-center justify-center">
              <HealthIcon />
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-center">Sức khỏe</h3>
            <p className="text-gray-300 text-center text-sm">
              Nhận những lời khuyên về sức khỏe thể chất và tinh thần thông qua các lá bài Tarot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function HeartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
        fill="#f0c05a"
      />
    </svg>
  );
}

function CareerIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z"
        fill="#f0c05a"
      />
    </svg>
  );
}

function HealthIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z"
        fill="#f0c05a"
      />
    </svg>
  );
}

export default FeaturedReadings;