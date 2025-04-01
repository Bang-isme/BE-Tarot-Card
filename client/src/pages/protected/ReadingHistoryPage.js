import React, { useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../shared/ui/NavBar';
import Footer from '../../shared/ui/Footer';

// Components
const SectionTitle = memo(({ title, subtitle, centered = false, light = true }) => (
  <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-[#9370db]'} tracking-vn-tight`}>
      {title}
      <span className="block h-1 w-20 bg-gradient-to-r from-[#9370db] to-[#8a2be2] mt-2 rounded-full"></span>
    </h2>
    {subtitle && <p className={`${light ? 'text-gray-300' : 'text-gray-600'} text-lg tracking-vn-tight leading-vn`}>{subtitle}</p>}
  </div>
));

const FilterButton = memo(({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full mr-2 mb-2 text-sm font-medium transition-colors tracking-vn-tight
    ${active 
      ? 'bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white shadow-md' 
      : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'}`}
  >
    {label}
  </button>
));

const ReadingCard = memo(({ id, date, type, cards, result, image }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-white/10">
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="h-48 md:h-full overflow-hidden md:col-span-1">
        <img src={image} alt={type} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 md:col-span-2">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2 py-1 text-xs rounded-full tracking-vn-tight bg-[#9370db]/20 text-[#9370db]">
            {type}
          </span>
          <span className="text-gray-400 text-sm tracking-vn-tight">
            {new Date(date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white tracking-vn-tight">Kết quả: {result}</h3>
        
        <div className="mb-4">
          <p className="text-gray-300 tracking-vn-tight leading-vn">
            Các lá bài: {cards.join(', ')}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#2a1045] flex items-center justify-center text-[#9370db]">
              {id % 4 === 0 ? '❤️' : id % 3 === 0 ? '💼' : id % 2 === 0 ? '🩺' : '🔮'}
            </span>
            <span className="text-sm text-gray-400 tracking-vn-tight">
              {id % 4 === 0 ? 'Tình yêu' : id % 3 === 0 ? 'Sự nghiệp' : id % 2 === 0 ? 'Sức khỏe' : 'Tổng quan'}
            </span>
          </div>
          
          <Link 
            to={`/reading-history/${id}`} 
            className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-white/20 transition-colors tracking-vn-tight"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  </div>
));

// Decorative Elements
const MysticBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-20 right-[10%] w-64 h-64 bg-[#9370db]/10 rounded-full filter blur-[80px] animate-pulse-slow"></div>
    <div className="absolute bottom-40 left-[15%] w-72 h-72 bg-[#8a2be2]/10 rounded-full filter blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-[40%] left-[30%] w-2 h-2 bg-white rounded-full animate-twinkle"></div>
    <div className="absolute top-[20%] right-[25%] w-2 h-2 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-[30%] right-[40%] w-2 h-2 bg-white rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
  </div>
));

const ReadingHistoryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [readings, setReadings] = useState([]);
  
  // Mock data - trong thực tế sẽ lấy từ API
  const mockReadings = [
    {
      id: 1,
      date: '2023-03-25',
      type: 'Trải bài Celtic Cross',
      cards: ['The Fool', 'The Magician', 'The Empress', 'The Emperor', 'The Star', 'The Moon'],
      result: 'Đường tình duyên sắp có chuyển biến tích cực',
      image: 'https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg',
      category: 'love'
    },
    {
      id: 2,
      date: '2023-03-20',
      type: 'Trải bài 3 lá',
      cards: ['Ten of Pentacles', 'Knight of Swords', 'Four of Wands'],
      result: 'Sự nghiệp đang trên đà phát triển',
      image: 'https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_2.jpg',
      category: 'career'
    },
    {
      id: 3,
      date: '2023-03-15',
      type: 'Tarot Hàng Ngày',
      cards: ['Strength'],
      result: 'Cần giữ vững niềm tin vào bản thân',
      image: 'https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg',
      category: 'daily'
    },
    {
      id: 4,
      date: '2023-03-10',
      type: 'Trải bài Tình Yêu',
      cards: ['The Lovers', 'Two of Cups', 'Ten of Cups', 'The Sun'],
      result: 'Mối quan hệ hài hòa và phát triển',
      image: 'https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_4.jpg',
      category: 'love'
    },
    {
      id: 5,
      date: '2023-03-05',
      type: 'Trải bài Sự Nghiệp',
      cards: ['The Chariot', 'Eight of Pentacles', 'Three of Wands'],
      result: 'Có cơ hội thăng tiến trong công việc',
      image: 'https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_5.jpg',
      category: 'career'
    },
    {
      id: 6,
      date: '2023-03-01',
      type: 'Trải bài Sức Khỏe',
      cards: ['The World', 'The High Priestess', 'Temperance'],
      result: 'Sức khỏe ổn định, tăng cường thư giãn',
      image: 'https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_6.jpg',
      category: 'health'
    }
  ];
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReadings(mockReadings);
    }, 500);
  }, []);
  
  const filterReadings = () => {
    return readings.filter(reading => {
      // Filter by category
      const categoryMatch = activeFilter === 'all' || reading.category === activeFilter;
      
      // Filter by date range
      let dateMatch = true;
      if (dateRange !== 'all') {
        const readingDate = new Date(reading.date);
        const now = new Date();
        
        if (dateRange === 'week') {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          dateMatch = readingDate >= weekAgo;
        } else if (dateRange === 'month') {
          const monthAgo = new Date();
          monthAgo.setMonth(now.getMonth() - 1);
          dateMatch = readingDate >= monthAgo;
        } else if (dateRange === 'year') {
          const yearAgo = new Date();
          yearAgo.setFullYear(now.getFullYear() - 1);
          dateMatch = readingDate >= yearAgo;
        }
      }
      
      // Filter by search term
      const searchMatch = searchTerm === '' || 
                         reading.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reading.result.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reading.cards.some(card => card.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return categoryMatch && dateMatch && searchMatch;
    });
  };
  
  const filteredReadings = filterReadings();
  
  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'love', label: 'Tình yêu' },
    { id: 'career', label: 'Sự nghiệp' },
    { id: 'health', label: 'Sức khỏe' },
    { id: 'daily', label: 'Hàng ngày' }
  ];
  
  const dateRanges = [
    { id: 'all', label: 'Tất cả thời gian' },
    { id: 'week', label: '7 ngày qua' },
    { id: 'month', label: '30 ngày qua' },
    { id: 'year', label: '365 ngày qua' }
  ];
  
  // Tính toán thống kê
  const stats = {
    total: readings.length,
    love: readings.filter(r => r.category === 'love').length,
    career: readings.filter(r => r.category === 'career').length,
    health: readings.filter(r => r.category === 'health').length,
    daily: readings.filter(r => r.category === 'daily').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0933] to-[#0f051d] text-white relative overflow-hidden">
      <Helmet>
        <title>Lịch Sử Xem Bói | Bói Tarot</title>
        <meta name="description" content="Xem lại lịch sử các lần xem bói Tarot của bạn, từ tình yêu, sự nghiệp đến sức khỏe." />
      </Helmet>
      
      <MysticBackground />
      <Navbar />
      
      {/* Main Content */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl relative z-10">
          <SectionTitle 
            title="Lịch Sử Xem Bói Tarot" 
            subtitle="Xem lại tất cả những lần bạn đã xem bói trên Bói Tarot"
            centered
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-8">
                {/* Stats */}
                <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white tracking-vn-tight mb-4">Thống kê</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-purple-900/20">
                      <p className="text-gray-300 tracking-vn-tight">Tổng số lần xem</p>
                      <p className="text-white font-medium tracking-vn-tight">{stats.total}</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-purple-900/20">
                      <p className="text-gray-300 tracking-vn-tight">Tình yêu</p>
                      <p className="text-white font-medium tracking-vn-tight">{stats.love}</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-purple-900/20">
                      <p className="text-gray-300 tracking-vn-tight">Sự nghiệp</p>
                      <p className="text-white font-medium tracking-vn-tight">{stats.career}</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-purple-900/20">
                      <p className="text-gray-300 tracking-vn-tight">Sức khỏe</p>
                      <p className="text-white font-medium tracking-vn-tight">{stats.health}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300 tracking-vn-tight">Hàng ngày</p>
                      <p className="text-white font-medium tracking-vn-tight">{stats.daily}</p>
                    </div>
                  </div>
                </div>
                
                {/* Date Filter */}
                <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white tracking-vn-tight mb-4">Thời gian</h3>
                  <div className="space-y-2">
                    {dateRanges.map(range => (
                      <button
                        key={range.id}
                        onClick={() => setDateRange(range.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm tracking-vn-tight ${
                          dateRange === range.id 
                            ? 'bg-[#9370db]/20 text-[#9370db]' 
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* CTA */}
                <div className="bg-gradient-to-r from-[#2a1045] to-[#3a1c5a] rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-[#9370db]/20 rounded-full filter blur-[20px]"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white tracking-vn-tight mb-3">Xem bói ngay</h3>
                    <p className="text-gray-300 text-sm tracking-vn-tight mb-4">
                      Bạn muốn được giải đáp thêm về điều gì? Hãy xem bói ngay!
                    </p>
                    <Link 
                      to="/tarot-readings" 
                      className="block w-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight text-center text-sm"
                    >
                      Xem bói Tarot
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Search & Filter */}
              <div className="mb-6">
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo loại trải bài, kết quả hoặc lá bài..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-purple-900/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#9370db] transition-colors tracking-vn-tight"
                  />
                </div>
                
                <div className="flex flex-wrap mb-6">
                  {categories.map(category => (
                    <FilterButton
                      key={category.id}
                      label={category.label}
                      active={activeFilter === category.id}
                      onClick={() => setActiveFilter(category.id)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Readings List */}
              <div className="space-y-6">
                {filteredReadings.length > 0 ? (
                  filteredReadings.map(reading => (
                    <ReadingCard
                      key={reading.id}
                      id={reading.id}
                      date={reading.date}
                      type={reading.type}
                      cards={reading.cards}
                      result={reading.result}
                      image={reading.image}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xl text-gray-400 tracking-vn-tight mb-4">Không tìm thấy lịch sử xem bói phù hợp.</p>
                    <Link 
                      to="/tarot-readings" 
                      className="inline-block bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
                    >
                      Xem bói ngay
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              {filteredReadings.length > 0 && (
                <div className="flex justify-center mt-10">
                  <nav className="flex items-center space-x-2">
                    <button className="w-10 h-10 rounded-md flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button className="w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white">
                      1
                    </button>
                    
                    <button className="w-10 h-10 rounded-md flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors">
                      2
                    </button>
                    
                    <button className="w-10 h-10 rounded-md flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors">
                      3
                    </button>
                    
                    <button className="w-10 h-10 rounded-md flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default memo(ReadingHistoryPage); 