import React, { useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../shared/ui/NavBar';
import Footer from '../../shared/ui/Footer';

// Components
const SectionTitle = memo(({ title, subtitle, centered = false, light = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-[#9370db]' : 'text-white'} tracking-vn-tight`}>
      {title}
      <span className="block h-1 w-20 bg-gradient-to-r from-[#9370db] to-[#8a2be2] mt-2 rounded-full"></span>
    </h2>
    {subtitle && <p className={`${light ? 'text-gray-600' : 'text-gray-300'} leading-vn tracking-vn-tight text-lg`}>{subtitle}</p>}
  </div>
));

const SearchBar = memo(({ value, onChange }) => (
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Tìm kiếm lá bài Tarot..."
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-purple-900/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#9370db] transition-colors tracking-vn-tight"
    />
  </div>
));

const CategoryButton = memo(({ label, active, onClick }) => (
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

const TarotCard = memo(({ name, imageSrc, description, category, onClick }) => (
  <div 
    className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px] cursor-pointer group border border-purple-900/20"
    onClick={onClick}
  >
    <div className="relative h-56 overflow-hidden">
      <img 
        src={imageSrc} 
        alt={name} 
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x600?text=Tarot+Card";
        }}
      />
      <div className="absolute top-2 right-2 bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white text-xs font-bold px-3 py-1 rounded-full tracking-vn-tight">
        {category}
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold mb-2 text-white tracking-vn-tight group-hover:text-[#9370db] transition-colors">{name}</h3>
      <p className="text-gray-400 tracking-vn-tight leading-vn line-clamp-2">{description}</p>
    </div>
  </div>
));

const TarotCardDetail = memo(({ card, onClose }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
    <div className="bg-gradient-to-b from-[#2a1045] to-[#1a0933] rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
      <div className="relative">
        <button 
          className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors z-10"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 flex items-center justify-center">
            <div className="relative max-w-xs w-full">
              <img 
                src={card.imageSrc} 
                alt={card.name} 
                className="w-full h-auto rounded-lg shadow-xl transform rotate-0 hover:rotate-2 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x600?text=Tarot+Card";
                }}
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#9370db]/20 rounded-full filter blur-[40px] z-0"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#8a2be2]/20 rounded-full filter blur-[30px] z-0"></div>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white text-xs font-bold px-3 py-1 rounded-full tracking-vn-tight mb-2">
                {card.category}
              </span>
              <h2 className="text-3xl font-bold text-white tracking-vn-tight">{card.name}</h2>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-purple-900/20 mb-6">
              <h3 className="text-lg font-semibold text-[#9370db] mb-2 tracking-vn-tight">Ý nghĩa xuôi</h3>
              <p className="text-gray-300 mb-4 tracking-vn-tight leading-vn">{card.uprightMeaning}</p>
              
              <h3 className="text-lg font-semibold text-[#9370db] mb-2 tracking-vn-tight">Ý nghĩa ngược</h3>
              <p className="text-gray-300 tracking-vn-tight leading-vn">{card.reversedMeaning}</p>
            </div>
            
            <h3 className="text-lg font-semibold text-[#9370db] mb-2 tracking-vn-tight">Mô tả chi tiết</h3>
            <p className="text-gray-300 mb-6 tracking-vn-tight leading-vn">{card.description}</p>
            
            <h3 className="text-lg font-semibold text-[#9370db] mb-2 tracking-vn-tight">Biểu tượng</h3>
            <p className="text-gray-300 mb-6 tracking-vn-tight leading-vn">{card.symbols}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {card.keywords.map((keyword, index) => (
                <span key={index} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm tracking-vn-tight">
                  {keyword}
                </span>
              ))}
            </div>
            
            <Link 
              to={`/tarot-readings?card=${card.id}`} 
              className="inline-block bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
            >
              Xem bói với lá bài này
            </Link>
          </div>
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

const TarotCardsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Sample data - would normally come from API/database
  const tarotCards = [
    {
      id: 1,
      name: "The Fool",
      vietnameseName: "Kẻ Khờ",
      imageSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
      category: "Major Arcana",
      description: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
      uprightMeaning: "Beginnings, innocence, spontaneity, a free spirit",
      reversedMeaning: "Holding back, recklessness, risk-taking",
      symbols: "White rose (purity), mountains (challenges), sun (warmth, happiness), dog (protection), bag (knowledge, memories)",
      keywords: ["Mới bắt đầu", "Ngây thơ", "Tự do", "Phiêu lưu", "Tin tưởng"]
    },
    {
      id: 2,
      name: "The Magician",
      vietnameseName: "Nhà Ảo Thuật",
      imageSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_2.jpg",
      category: "Major Arcana",
      description: "The Magician card is a reminder that you are a unique being, and you have all the tools to make your desires a reality. It uses the power of the four elements - earth, air, fire, and water, which are available on the table in front of the Magician.",
      uprightMeaning: "Manifestation, resourcefulness, power, inspired action",
      reversedMeaning: "Manipulation, poor planning, untapped talents",
      symbols: "Infinity sign (limitless potential), red and white clothing (purity of spirit with knowledge of life), roses and lilies (clarity of desire)",
      keywords: ["Hiện thực hóa", "Sáng tạo", "Quyền lực", "Hành động", "Tài năng"]
    },
    {
      id: 3,
      name: "The High Priestess",
      vietnameseName: "Nữ Tư Tế",
      imageSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg",
      category: "Major Arcana",
      description: "The High Priestess is a card of intuition, unconscious knowledge, and inner voice. She sits in front of a thin veil decorated with pomegranates. The veil represents the separation between the conscious and subconscious mind.",
      uprightMeaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind",
      reversedMeaning: "Secrets, disconnected from intuition, withdrawal and silence",
      symbols: "Moon (intuition), pillars (duality), veil (hidden knowledge), water (subconscious)",
      keywords: ["Trực giác", "Bí ẩn", "Khám phá", "Nữ tính", "Nhận thức"]
    },
    {
      id: 4,
      name: "The Empress",
      vietnameseName: "Nữ Hoàng",
      imageSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_4.jpg",
      category: "Major Arcana",
      description: "The Empress is a symbol of fertility, motherhood, and the feminine aspects of life. She represents abundance in all areas, including the abundance of beauty, joy, and love in your life.",
      uprightMeaning: "Femininity, beauty, nature, nurturing, abundance",
      reversedMeaning: "Creative block, dependence on others, emptiness",
      symbols: "Venus symbol (love), crown of stars (divine connection), wheat (abundance), cushion (comfort)",
      keywords: ["Sung túc", "Sáng tạo", "Phong phú", "Sinh sản", "Mẹ Thiên Nhiên"]
    },
    {
      id: 5,
      name: "The Emperor",
      vietnameseName: "Hoàng Đế",
      imageSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_5.jpg",
      category: "Major Arcana",
      description: "The Emperor represents the establishment of power, structure, and stability. He signifies worldly power, which can include influential people or structured circumstances.",
      uprightMeaning: "Authority, establishment, structure, a father figure",
      reversedMeaning: "Domination, excessive control, lack of discipline, inflexibility",
      symbols: "Ankh (life), ram's heads (symbolize Mars), throne (power), mountains (stability)",
      keywords: ["Uy quyền", "Kỷ luật", "Kiểm soát", "Lãnh đạo", "Ổn định"]
    },
    {
      id: 6,
      name: "Ace of Cups",
      vietnameseName: "Át Cốc",
      imageSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_6.jpg",
      category: "Cups",
      description: "The Ace of Cups represents new beginnings related to love, feelings, relationships, and creativity. It suggests the start of something emotionally fulfilling that brings joy and happiness.",
      uprightMeaning: "New feelings, spirituality, intuition, love, compassion",
      reversedMeaning: "Emotional loss, blocked creativity, emptiness",
      symbols: "Cup (emotions), dove (peace), water (emotions, subconscious), hand from cloud (divine offering)",
      keywords: ["Tình yêu", "Cảm xúc mới", "Sáng tạo", "Tinh thần", "Hạnh phúc"]
    },
    {
      id: 7,
      name: "Ten of Pentacles",
      vietnameseName: "10 Xu",
      imageSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_7.jpg",
      category: "Pentacles",
      description: "The Ten of Pentacles represents wealth, financial security, family, long-term success, and contribution. It suggests material wealth and richness in family life, a time of stability and enjoyment of the rewards of hard work.",
      uprightMeaning: "Legacy, inheritance, culmination, family, stability",
      reversedMeaning: "Financial failure, transience, broken relationships",
      symbols: "Castle (security), elder (wisdom), family (generational wealth), pentacles (material abundance), dog (loyalty)",
      keywords: ["Tài sản", "Thừa kế", "Gia đình", "Ổn định", "Thành công"]
    },
    {
      id: 8,
      name: "Knight of Swords",
      vietnameseName: "Kỵ Sĩ Kiếm",
      imageSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_8.jpg",
      category: "Swords",
      description: "The Knight of Swords represents action, ambition, drive, and determination. This card suggests a person who is quick to act, assertive, and ambitious, sometimes impulsively rushing into situations.",
      uprightMeaning: "Action, ambition, drive, courage, desire",
      reversedMeaning: "No direction, disregard for consequences, unpredictability",
      symbols: "Horse (power, movement), sword (mind, intellect), clouds (turmoil, swiftness)",
      keywords: ["Hành động", "Tham vọng", "Quyết đoán", "Can đảm", "Nhanh nhẹn"]
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Major Arcana', label: 'Bộ Chính' },
    { id: 'Cups', label: 'Cốc' },
    { id: 'Pentacles', label: 'Xu' },
    { id: 'Swords', label: 'Kiếm' },
    { id: 'Wands', label: 'Gậy' }
  ];

  const filteredCards = tarotCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          card.vietnameseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || card.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCard]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0933] to-[#0f051d] text-white relative overflow-hidden">
      <Helmet>
        <title>Thư Viện Bài Tarot | Bói Tarot</title>
        <meta name="description" content="Khám phá đầy đủ 78 lá bài Tarot với ý nghĩa và biểu tượng chi tiết. Tìm hiểu về các lá bài Major Arcana và Minor Arcana." />
      </Helmet>
      
      <MysticBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-vn-tight">
              Thư Viện <span className="text-[#9370db]">Bài Tarot</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto tracking-vn-tight leading-vn">
              Khám phá ý nghĩa, biểu tượng và lời giải đọc chi tiết cho tất cả 78 lá bài Tarot từ cổ điển đến hiện đại.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-12">
            <SearchBar 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="flex flex-wrap mb-8">
              {categories.map(category => (
                <CategoryButton
                  key={category.id}
                  label={category.label}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCards.length > 0 ? (
              filteredCards.map(card => (
                <TarotCard
                  key={card.id}
                  name={`${card.name} (${card.vietnameseName})`}
                  imageSrc={card.imageSrc}
                  description={card.description}
                  category={card.category}
                  onClick={() => setSelectedCard(card)}
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-gray-400 tracking-vn-tight">Không tìm thấy lá bài phù hợp. Vui lòng thử lại với từ khóa khác.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Understanding Tarot Section */}
      <section className="py-16 px-4 md:px-8 relative bg-[#1a0933]/80">
        <div className="container mx-auto max-w-5xl relative z-10">
          <SectionTitle 
            title="Hiểu về Bài Tarot" 
            subtitle="Tìm hiểu cấu trúc và ý nghĩa của bộ bài Tarot truyền thống"
            centered
            light={false}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-[#9370db] tracking-vn-tight">Bộ Bài Chính (Major Arcana)</h3>
              <p className="text-gray-300 mb-4 tracking-vn-tight leading-vn">
                Bộ Bài Chính gồm 22 lá, đánh số từ 0 đến 21, thể hiện những bài học và giai đoạn phát triển quan trọng trong hành trình cuộc đời. Từ The Fool (số 0) đại diện cho sự khởi đầu đến The World (số 21) tượng trưng cho sự hoàn thành.
              </p>
              <p className="text-gray-300 tracking-vn-tight leading-vn">
                Những lá bài này mang ý nghĩa sâu sắc, thường đại diện cho những thay đổi lớn, bài học nghiệp quả, và những thời điểm quan trọng trong cuộc đời.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-[#9370db] tracking-vn-tight">Bộ Bài Phụ (Minor Arcana)</h3>
              <p className="text-gray-300 mb-4 tracking-vn-tight leading-vn">
                Bộ Bài Phụ gồm 56 lá, chia thành 4 chất: Cốc (Cups), Gậy (Wands), Kiếm (Swords), và Xu (Pentacles). Mỗi chất có 14 lá bài, gồm các lá số từ Át (Ace) đến 10, và 4 lá Quân bài: Người hầu (Page), Kỵ sĩ (Knight), Hoàng hậu (Queen), và Vua (King).
              </p>
              <p className="text-gray-300 tracking-vn-tight leading-vn">
                Bộ bài phụ đại diện cho những vấn đề hàng ngày và tác động trong cuộc sống thường nhật, với mỗi chất tượng trưng cho một khía cạnh khác nhau của cuộc sống.
              </p>
            </div>
          </div>
          
          {/* Card Suits Meaning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-4 rounded-xl">
              <h4 className="text-lg font-bold mb-2 text-[#9370db] tracking-vn-tight">Cốc (Cups)</h4>
              <p className="text-gray-300 text-sm tracking-vn-tight leading-vn">Đại diện cho cảm xúc, tình yêu, trực giác và các mối quan hệ. Liên quan đến yếu tố Nước.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-4 rounded-xl">
              <h4 className="text-lg font-bold mb-2 text-[#9370db] tracking-vn-tight">Gậy (Wands)</h4>
              <p className="text-gray-300 text-sm tracking-vn-tight leading-vn">Đại diện cho năng lượng, đam mê, sáng tạo và hành động. Liên quan đến yếu tố Lửa.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-4 rounded-xl">
              <h4 className="text-lg font-bold mb-2 text-[#9370db] tracking-vn-tight">Kiếm (Swords)</h4>
              <p className="text-gray-300 text-sm tracking-vn-tight leading-vn">Đại diện cho lý trí, trí tuệ, thách thức và xung đột. Liên quan đến yếu tố Không Khí.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-4 rounded-xl">
              <h4 className="text-lg font-bold mb-2 text-[#9370db] tracking-vn-tight">Xu (Pentacles)</h4>
              <p className="text-gray-300 text-sm tracking-vn-tight leading-vn">Đại diện cho vật chất, tiền bạc, sự nghiệp và thể chất. Liên quan đến yếu tố Đất.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="bg-gradient-to-r from-[#2a1045] to-[#3a1c5a] rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#9370db]/20 rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8a2be2]/20 rounded-full filter blur-[80px]"></div>
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 tracking-vn-tight">Sẵn sàng để khám phá?</h2>
              <p className="text-lg text-gray-300 mb-8 tracking-vn-tight leading-vn">
                Sau khi tìm hiểu ý nghĩa của các lá bài Tarot, hãy trải nghiệm với phiên bói Tarot online.
              </p>
              <Link 
                to="/tarot-readings" 
                className="inline-block bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
              >
                Xem bói Tarot ngay
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Card Detail Modal */}
      {selectedCard && (
        <TarotCardDetail card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
      
      <Footer />
    </div>
  );
};

export default memo(TarotCardsPage); 