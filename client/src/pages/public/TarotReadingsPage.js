import React, { useState } from 'react';
import TarotReading from '../../features/tarot/components/TarotReading';
import PageLayout from '../../shared/layouts/PageLayout';
import { 
  SectionTitle, 
  FilterButton, 
  SearchBar, 
  ReadingTypeCard, 
  TestimonialCard, 
  HowItWorksStep,
  Button,
  Card
} from '../../shared/components/common';

const TarotReadingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFullTarotReading, setShowFullTarotReading] = useState(false);
  
  // Sample data - would normally come from API/database
  const readingTypes = [
    {
      id: 1,
      title: "Bói tình yêu",
      description: "Khám phá đường tình duyên, tương lai của mối quan hệ hiện tại hoặc người ấy nghĩ gì về bạn.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg",
      to: "/love",
      featured: true,
      categories: ["tình yêu", "phổ biến"]
    },
    {
      id: 2,
      title: "Bói sự nghiệp",
      description: "Tìm hiểu về con đường sự nghiệp, cơ hội mới và hướng đi đúng đắn cho công việc của bạn.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg",
      to: "/career",
      featured: false,
      categories: ["sự nghiệp", "công việc"]
    },
    {
      id: 3,
      title: "Bói sức khỏe",
      description: "Nhận lời khuyên về sức khỏe thể chất và tinh thần, cảnh báo và cách cải thiện sức khỏe.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg",
      to: "/health",
      featured: false,
      categories: ["sức khỏe"]
    },
    {
      id: 4,
      title: "Bói hàng ngày",
      description: "Lá bài Tarot hàng ngày giúp bạn có cái nhìn tổng quan và lời khuyên cho một ngày trọn vẹn.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg",
      to: "/daily",
      featured: true,
      categories: ["hàng ngày", "phổ biến"]
    },
    {
      id: 5,
      title: "Bói năm mới",
      description: "Dự đoán và lên kế hoạch cho năm mới của bạn với những lời khuyên từ bài Tarot.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_12.jpg", 
      to: "/yearly",
      featured: false,
      categories: ["năm mới", "tương lai"]
    },
    {
      id: 6,
      title: "Phân tích tính cách",
      description: "Khám phá điểm mạnh, điểm yếu và tiềm năng ẩn sâu trong tính cách của bạn.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_13.jpg",
      to: "/personality",
      featured: false,
      categories: ["tính cách", "phát triển bản thân"]
    }
  ];

  const filters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'phổ biến', label: 'Phổ biến' },
    { id: 'tình yêu', label: 'Tình yêu' },
    { id: 'sự nghiệp', label: 'Sự nghiệp' },
    { id: 'sức khỏe', label: 'Sức khỏe' },
    { id: 'tương lai', label: 'Tương lai' }
  ];

  const testimonials = [
    {
      quote: "Bói Tarot đã giúp tôi tìm ra hướng đi mới trong sự nghiệp, thật không ngờ lại chính xác đến vậy.",
      author: "Minh Anh, 28 tuổi"
    },
    {
      quote: "Tôi đã hiểu rõ hơn về mối quan hệ của mình nhờ vào phần bói tình yêu. Cảm ơn Bói Tarot!",
      author: "Thu Hà, 32 tuổi"
    }
  ];

  const filteredReadingTypes = readingTypes.filter(reading => {
    const matchesSearch = reading.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        reading.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || reading.categories.includes(activeFilter);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <PageLayout
      title="Bói Tarot Online"
      description="Khám phá các loại hình bói Tarot online chính xác - từ tình yêu, sự nghiệp đến sức khỏe và phát triển bản thân."
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-vn-tight">
          Khám Phá <span className="text-[#9370db]">Bói Tarot</span> Online
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto tracking-vn-tight leading-vn">
          Những lá bài Tarot sẽ mang đến cho bạn cái nhìn sâu sắc về cuộc sống, từ tình yêu, sự nghiệp 
          đến sức khỏe, tương lai và phát triển bản thân.
        </p>
        
        <div className="mt-10">
          {!showFullTarotReading ? (
            <Button 
              onClick={() => setShowFullTarotReading(true)} 
              variant="primary" 
              size="lg"
            >
              Bắt đầu xem bói ngay
            </Button>
          ) : (
            <div className="max-w-3xl mx-auto">
              <TarotReading />
            </div>
          )}
        </div>
      </div>
      
      {!showFullTarotReading && (
        <>
          {/* Search and Filter */}
          <div className="mb-12">
            <SearchBar 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm loại hình bói Tarot..."
            />
            
            <div className="flex flex-wrap mb-8">
              {filters.map(filter => (
                <FilterButton
                  key={filter.id}
                  label={filter.label}
                  active={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Reading Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReadingTypes.length > 0 ? (
              filteredReadingTypes.map(reading => (
                <ReadingTypeCard
                  key={reading.id}
                  title={reading.title}
                  description={reading.description}
                  iconSrc={reading.iconSrc}
                  to={reading.to}
                  featured={reading.featured}
                />
              ))
            ) : (
              <div className="col-span-3 py-8 text-center">
                <p className="text-gray-300 tracking-vn-tight mb-4">Không tìm thấy loại bói phù hợp với tìm kiếm của bạn.</p>
                <Button
                  onClick={() => {setSearchTerm(''); setActiveFilter('all');}}
                  variant="secondary"
                >
                  Xem tất cả các loại bói
                </Button>
              </div>
            )}
          </div>
          
          {/* How It Works Section */}
          <div className="mt-32">
            <SectionTitle 
              title="Cách Bói Tarot Hoạt Động" 
              subtitle="Quy trình đơn giản để khám phá những thông điệp từ bài Tarot"
              light={false}
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <div className="space-y-10">
                <HowItWorksStep 
                  number="1"
                  title="Chọn loại hình bói"
                  description="Lựa chọn hình thức phù hợp với câu hỏi hoặc mối quan tâm của bạn, từ tình yêu đến sự nghiệp."
                />
                
                <HowItWorksStep 
                  number="2"
                  title="Đặt câu hỏi"
                  description="Đặt câu hỏi cụ thể hoặc xác định vấn đề bạn đang tìm kiếm câu trả lời."
                />
                
                <HowItWorksStep 
                  number="3"
                  title="Lật bài và đọc kết quả"
                  description="Các lá bài sẽ được lật lên và giải thích ý nghĩa, mang đến cho bạn cái nhìn sâu sắc."
                />
              </div>
              
              <Card title="Trải nghiệm từ khách hàng">
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                      key={index}
                      quote={testimonial.quote}
                      author={testimonial.author}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
      
      {/* FAQ Section */}
      {!showFullTarotReading && (
        <section className="py-20 bg-gradient-to-b from-[#0f051d] to-[#1a0933] mt-20 -mx-8 px-8">
          <div className="container mx-auto max-w-5xl">
            <SectionTitle 
              title="Câu Hỏi Thường Gặp" 
              subtitle="Những điều bạn muốn biết về Bói Tarot Online"
              light={false}
              centered
            />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <h3 className="text-lg font-bold mb-3 tracking-vn-tight">Bói Tarot online có chính xác không?</h3>
                <p className="text-gray-300 tracking-vn-tight leading-vn">
                  Bói Tarot online sử dụng các thuật toán để mô phỏng cách trải bài truyền thống và cung cấp lời giải thích dựa trên ý nghĩa 
                  của lá bài. Độ chính xác phụ thuộc vào nhiều yếu tố, bao gồm cả cách bạn hiểu và áp dụng lời khuyên.
                </p>
              </Card>
              
              <Card>
                <h3 className="text-lg font-bold mb-3 tracking-vn-tight">Bao lâu tôi nên bói Tarot một lần?</h3>
                <p className="text-gray-300 tracking-vn-tight leading-vn">
                  Không có quy tắc cố định, nhưng nhiều người chọn bói hàng ngày để có hướng dẫn, 
                  hoặc định kỳ hàng tuần/tháng cho các vấn đề lớn hơn. Nên tránh bói quá nhiều về cùng một vấn đề.
                </p>
              </Card>
              
              <Card>
                <h3 className="text-lg font-bold mb-3 tracking-vn-tight">Có cần kiến thức về Tarot không?</h3>
                <p className="text-gray-300 tracking-vn-tight leading-vn">
                  Không, bạn không cần kiến thức trước về Tarot. Hệ thống của chúng tôi sẽ cung cấp đầy đủ thông tin giải thích 
                  về ý nghĩa của các lá bài và cách hiểu kết quả trải bài.
                </p>
              </Card>
              
              <Card>
                <h3 className="text-lg font-bold mb-3 tracking-vn-tight">Tôi có thể hỏi bất cứ điều gì không?</h3>
                <p className="text-gray-300 tracking-vn-tight leading-vn">
                  Bạn có thể đặt câu hỏi về hầu hết các khía cạnh của cuộc sống, từ tình yêu, gia đình, 
                  sự nghiệp đến phát triển cá nhân. Tuy nhiên, nên tránh những câu hỏi về vấn đề sức khỏe nghiêm trọng hoặc pháp lý.
                </p>
              </Card>
            </div>
            
            <div className="text-center mt-16">
              <Button
                onClick={() => setShowFullTarotReading(true)}
                variant="primary"
                size="lg"
              >
                Bắt đầu trải bài ngay
              </Button>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default TarotReadingsPage;