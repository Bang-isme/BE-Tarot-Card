// src/containers/Public/Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../../ultils/constant.js';

// Import FeaturedReadings từ thư mục components/tarot
import FeaturedReadings from '../../components/tarot/FeaturedReadings';
import ReadingOptions from '../../components/tarot/ReadingOptions';

const Homepage = () => {
    const handleStartReading = () => {
        // Chuyển hướng đến trang Tarot
        window.location.href = '/tarot';
    };

    return (
        <div className="min-h-screen bg-[#1a0933] text-white">
            <div className="container mx-auto px-4 py-8">
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

                    <h2 className="text-2xl font-semibold text-center mb-8">Tính năng nổi bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-[#2a1045] rounded-lg p-6 border border-[#3a1c5a] text-center">
                            <div className="w-12 h-12 rounded-full bg-[#f0c05a]/10 flex items-center justify-center mx-auto mb-4">
                                <span className="text-[#f0c05a] text-xl">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Bói bài Tarot</h3>
                            <p className="text-gray-300">Rút một lá bài để nhận thông điệp ngắn gọn và súc tích cho vấn đề của bạn.</p>
                        </div>
                        <div className="bg-[#2a1045] rounded-lg p-6 border border-[#3a1c5a] text-center">
                            <div className="w-12 h-12 rounded-full bg-[#f0c05a]/10 flex items-center justify-center mx-auto mb-4">
                                <span className="text-[#f0c05a] text-xl">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Trải bài Tarot 1:1</h3>
                            <p className="text-gray-300">Rút ba lá bài để hiểu rõ về quá khứ, hiện tại và tương lai của vấn đề bạn đang quan tâm.</p>
                        </div>
                        <div className="bg-[#2a1045] rounded-lg p-6 border border-[#3a1c5a] text-center">
                            <div className="w-12 h-12 rounded-full bg-[#f0c05a]/10 flex items-center justify-center mx-auto mb-4">
                                <span className="text-[#f0c05a] text-xl">10</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Bói bài hàng ngày</h3>
                            <p className="text-gray-300">Trải bài Celtic Cross với 10 lá bài để có cái nhìn toàn diện và chi tiết về tình huống của bạn.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-center mb-8">Khám phá những khía cạnh bí ẩn của cuộc sống</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#2a1045] rounded-lg p-6 border border-[#3a1c5a] text-center">
                            <div className="w-12 h-12 rounded-full bg-[#f0c05a]/10 flex items-center justify-center mx-auto mb-4">
                                <span className="text-[#f0c05a] text-xl">❤️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Tình yêu</h3>
                            <p className="text-gray-300">Khám phá tình hình tình cảm hiện tại và tương lai của bạn thông qua các lá bài Tarot.</p>
                        </div>
                        <div className="bg-[#2a1045] rounded-lg p-6 border border-[#3a1c5a] text-center">
                            <div className="w-12 h-12 rounded-full bg-[#f0c05a]/10 flex items-center justify-center mx-auto mb-4">
                                <span className="text-[#f0c05a] text-xl">💼</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Sự nghiệp</h3>
                            <p className="text-gray-300">Tìm hiểu về con đường sự nghiệp và những cơ hội đang chờ đợi bạn trong tương lai.</p>
                        </div>
                        <div className="bg-[#2a1045] rounded-lg p-6 border border-[#3a1c5a] text-center">
                            <div className="w-12 h-12 rounded-full bg-[#f0c05a]/10 flex items-center justify-center mx-auto mb-4">
                                <span className="text-[#f0c05a] text-xl">🌡️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Sức khỏe</h3>
                            <p className="text-gray-300">Nhận những lời khuyên về sức khỏe thể chất và tinh thần thông qua các lá bài Tarot.</p>
                        </div>
                    </div>
                </div>
            </div>
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

export default Homepage;