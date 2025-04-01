import React, { useState, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../shared/ui/NavBar';
import Footer from '../../shared/ui/Footer';

// Components
const SectionTitle = memo(({ title, subtitle, centered = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#9370db] tracking-vn-tight">
      {title}
      <span className="block h-1 w-20 bg-gradient-to-r from-[#9370db] to-[#8a2be2] mt-2 rounded-full"></span>
    </h2>
    {subtitle && <p className="text-gray-600 leading-vn tracking-vn-tight text-lg">{subtitle}</p>}
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
      placeholder="Tìm kiếm bài viết..."
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

const ForumPostCard = memo(({ title, author, date, category, excerpt, likes, comments, tags, isHot = false, isFeatured = false }) => (
  <div className={`bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-white/10 border ${isFeatured ? 'border-[#9370db]' : 'border-purple-900/20'}`}>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs rounded-full tracking-vn-tight ${getTagColor(category)}`}>
              {category}
            </span>
            {isHot && (
              <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs tracking-vn-tight">
                Hot
              </span>
            )}
            {isFeatured && (
              <span className="bg-[#9370db]/20 text-[#9370db] px-2 py-1 rounded-full text-xs tracking-vn-tight">
                Nổi bật
              </span>
            )}
          </div>
          <Link to={`/forum/post/1`} className="block">
            <h3 className="text-xl font-bold mb-2 text-white tracking-vn-tight hover:text-[#9370db] transition-colors line-clamp-2">{title}</h3>
          </Link>
        </div>
        <div className="flex items-center">
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-[#9370db]"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/40x40?text=User";
            }}
          />
        </div>
      </div>
      
      <p className="text-gray-400 mb-4 tracking-vn-tight leading-vn line-clamp-2">{excerpt}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-[#2a1045] text-gray-300 px-2 py-1 rounded-full text-xs tracking-vn-tight">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center">
          <span className="tracking-vn-tight">{author.name}</span>
          <span className="mx-2">•</span>
          <span className="tracking-vn-tight">{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

const TrendingTopicCard = memo(({ title, posts, isActive = false }) => (
  <div className={`p-4 rounded-xl transition-all ${isActive ? 'bg-[#9370db]/20 border border-[#9370db]/40' : 'bg-white/5 hover:bg-white/10 border border-purple-900/20'}`}>
    <h3 className={`text-lg font-bold mb-2 tracking-vn-tight ${isActive ? 'text-[#9370db]' : 'text-white'}`}>{title}</h3>
    <p className="text-gray-400 text-sm tracking-vn-tight">{posts} bài viết</p>
  </div>
));

const UserRankCard = memo(({ rank, user, posts, avatar }) => (
  <div className="flex items-center p-3 gap-3 rounded-xl transition-all hover:bg-white/5">
    <div className="font-bold text-lg text-gray-400 w-6">{rank}</div>
    <div className="relative">
      <img 
        src={avatar} 
        alt={user} 
        className="w-10 h-10 rounded-full object-cover border-2 border-[#9370db]"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/40x40?text=User";
        }}
      />
      {rank <= 3 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] flex items-center justify-center text-xs text-white font-bold">
          {rank}
        </div>
      )}
    </div>
    <div className="flex-1">
      <p className="font-medium text-white tracking-vn-tight">{user}</p>
      <p className="text-gray-400 text-xs tracking-vn-tight">{posts} bài viết</p>
    </div>
  </div>
));

const PaginationButton = memo(({ page, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors text-sm
    ${active 
      ? 'bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white' 
      : 'bg-white/10 text-white hover:bg-white/20'}`}
  >
    {page}
  </button>
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

// Helper Functions
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const getTagColor = (category) => {
  switch (category) {
    case 'Thảo luận':
      return 'bg-blue-500/20 text-blue-400';
    case 'Chia sẻ':
      return 'bg-green-500/20 text-green-400';
    case 'Câu hỏi':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'Hướng dẫn':
      return 'bg-purple-500/20 text-purple-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const ForumPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample data - would normally come from API/database
  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Thảo luận', label: 'Thảo luận' },
    { id: 'Chia sẻ', label: 'Chia sẻ' },
    { id: 'Câu hỏi', label: 'Câu hỏi' },
    { id: 'Hướng dẫn', label: 'Hướng dẫn' }
  ];
  
  const trendingTopics = [
    { id: 1, title: 'Bài Tarot cho người mới', posts: 27, isActive: true },
    { id: 2, title: 'Ý nghĩa các lá bài Major Arcana', posts: 19 },
    { id: 3, title: 'Cách đọc trải bài Celtic Cross', posts: 15 },
    { id: 4, title: 'Phân tích tính cách qua bài Tarot', posts: 12 },
    { id: 5, title: 'Trải nghiệm xem bói Tarot online', posts: 8 }
  ];
  
  const topContributors = [
    { rank: 1, user: 'TarotMaster', posts: 156, avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg' },
    { rank: 2, user: 'MysticReader', posts: 124, avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg' },
    { rank: 3, user: 'SpiritualGuide', posts: 98, avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg' },
    { rank: 4, user: 'TarotLover', posts: 87, avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg' },
    { rank: 5, user: 'CardReader', posts: 76, avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg' }
  ];
  
  const forumPosts = [
    {
      id: 1,
      title: 'Làm thế nào để bắt đầu học Tarot từ con số 0?',
      author: { name: 'Nguyễn Văn A', avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg' },
      date: '2023-07-15',
      category: 'Câu hỏi',
      excerpt: 'Mình là người mới tìm hiểu về Tarot và không biết nên bắt đầu từ đâu. Mọi người có thể chia sẻ kinh nghiệm và các nguồn tài liệu tốt cho người mới không?',
      likes: 24,
      comments: 12,
      tags: ['người mới', 'học tarot', 'hướng dẫn'],
      isHot: true,
      isFeatured: true
    },
    {
      id: 2,
      title: 'Phân tích ý nghĩa lá bài The Tower và cách áp dụng vào cuộc sống',
      author: { name: 'Trần Thị B', avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg' },
      date: '2023-07-10',
      category: 'Thảo luận',
      excerpt: 'The Tower là một trong những lá bài gây sợ hãi nhất trong bộ Tarot. Tuy nhiên, nó mang nhiều bài học sâu sắc và không phải lúc nào cũng tiêu cực như mọi người vẫn nghĩ.',
      likes: 37,
      comments: 18,
      tags: ['the tower', 'major arcana', 'phân tích bài'],
      isHot: true
    },
    {
      id: 3,
      title: 'Chia sẻ trải nghiệm trải bài Celtic Cross cho vấn đề tình cảm',
      author: { name: 'Lê Văn C', avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg' },
      date: '2023-07-08',
      category: 'Chia sẻ',
      excerpt: 'Mình vừa thực hiện trải bài Celtic Cross cho vấn đề tình cảm và nhận được những kết quả bất ngờ. Xin chia sẻ với mọi người và mong nhận được góp ý từ các bạn.',
      likes: 29,
      comments: 14,
      tags: ['celtic cross', 'tình yêu', 'trải nghiệm'],
      isFeatured: true
    },
    {
      id: 4,
      title: 'Hướng dẫn chi tiết cách đọc hiểu các lá bài Minor Arcana',
      author: { name: 'Phạm Thị D', avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg' },
      date: '2023-07-05',
      category: 'Hướng dẫn',
      excerpt: 'Bài viết này sẽ cung cấp cho bạn hướng dẫn chi tiết về cách đọc và hiểu ý nghĩa của 56 lá bài Minor Arcana, bao gồm các chất Cups, Wands, Swords và Pentacles.',
      likes: 42,
      comments: 22,
      tags: ['minor arcana', 'hướng dẫn', 'đọc bài'],
      isHot: true
    },
    {
      id: 5,
      title: 'Tarot và tâm lý học: Mối liên hệ giữa các biểu tượng Tarot và tâm lý của Jung',
      author: { name: 'Hoàng Văn E', avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg' },
      date: '2023-07-01',
      category: 'Thảo luận',
      excerpt: 'Tìm hiểu mối liên hệ thú vị giữa các biểu tượng trong Tarot và lý thuyết tâm lý học của Carl Jung về nguyên mẫu và tiềm thức tập thể.',
      likes: 33,
      comments: 17,
      tags: ['tâm lý học', 'jung', 'biểu tượng']
    },
    {
      id: 6,
      title: 'Làm thế nào để bảo quản bộ bài Tarot đúng cách?',
      author: { name: 'Ngô Thị F', avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg' },
      date: '2023-06-28',
      category: 'Câu hỏi',
      excerpt: 'Mình mới mua bộ bài Tarot đầu tiên và muốn biết cách bảo quản đúng cách để giữ năng lượng và độ bền của bộ bài. Mọi người có thể chia sẻ kinh nghiệm không?',
      likes: 18,
      comments: 9,
      tags: ['bảo quản', 'bộ bài', 'năng lượng']
    }
  ];
  
  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0933] to-[#0f051d] text-white relative overflow-hidden">
      <Helmet>
        <title>Diễn Đàn Tarot | Bói Tarot</title>
        <meta name="description" content="Tham gia cộng đồng Tarot để thảo luận, chia sẻ và học hỏi kinh nghiệm từ những người yêu thích Tarot khác." />
      </Helmet>
      
      <MysticBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-vn-tight">
              Diễn Đàn <span className="text-[#9370db]">Tarot</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto tracking-vn-tight leading-vn">
              Kết nối với cộng đồng những người yêu thích Tarot. Chia sẻ kinh nghiệm, đặt câu hỏi và tham gia thảo luận về nghệ thuật Tarot.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24">
                {/* Create Post Button */}
                <Link 
                  to="/forum/create-post" 
                  className="block w-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight text-center mb-8"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tạo bài viết mới
                  </span>
                </Link>
                
                {/* Trending Topics */}
                <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4 tracking-vn-tight">Chủ đề nổi bật</h2>
                  <div className="space-y-3">
                    {trendingTopics.map(topic => (
                      <TrendingTopicCard 
                        key={topic.id}
                        title={topic.title}
                        posts={topic.posts}
                        isActive={topic.isActive}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Top Contributors */}
                <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 tracking-vn-tight">Thành viên tích cực</h2>
                  <div className="space-y-1">
                    {topContributors.map(contributor => (
                      <UserRankCard 
                        key={contributor.rank}
                        rank={contributor.rank}
                        user={contributor.user}
                        posts={contributor.posts}
                        avatar={contributor.avatar}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {/* Search and Filter */}
              <div className="mb-8">
                <SearchBar 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <div className="flex flex-wrap">
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
              
              {/* Forum Posts */}
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <ForumPostCard
                      key={post.id}
                      title={post.title}
                      author={post.author}
                      date={post.date}
                      category={post.category}
                      excerpt={post.excerpt}
                      likes={post.likes}
                      comments={post.comments}
                      tags={post.tags}
                      isHot={post.isHot}
                      isFeatured={post.isFeatured}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xl text-gray-400 tracking-vn-tight">Không tìm thấy bài viết phù hợp. Vui lòng thử lại với từ khóa khác.</p>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <div className="flex justify-center items-center space-x-2 mt-10">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-md flex items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {[1, 2, 3].map(page => (
                    <PaginationButton
                      key={page}
                      page={page}
                      active={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    />
                  ))}
                  
                  <button 
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === 3}
                    className="w-10 h-10 rounded-md flex items-center justify-center bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Guidelines Section */}
      <section className="py-16 px-4 md:px-8 relative bg-[#1a0933]/80">
        <div className="container mx-auto max-w-5xl relative z-10">
          <SectionTitle 
            title="Quy tắc cộng đồng" 
            subtitle="Hãy cùng xây dựng một cộng đồng thân thiện và bổ ích"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[#9370db]/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#9370db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-vn-tight">Tôn trọng</h3>
              <p className="text-gray-300 tracking-vn-tight leading-vn">Tôn trọng mọi thành viên trong cộng đồng. Không chấp nhận phân biệt đối xử, quấy rối hoặc ngôn ngữ xúc phạm.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[#9370db]/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#9370db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-vn-tight">Có trách nhiệm</h3>
              <p className="text-gray-300 tracking-vn-tight leading-vn">Chia sẻ thông tin chính xác và có trách nhiệm. Tarot là công cụ tham khảo, không thay thế cho lời khuyên của chuyên gia.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[#9370db]/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#9370db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-vn-tight">Đóng góp tích cực</h3>
              <p className="text-gray-300 tracking-vn-tight leading-vn">Hãy đóng góp nội dung có giá trị, hữu ích cho cộng đồng. Tránh spam, quảng cáo hoặc nội dung không liên quan.</p>
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
              <h2 className="text-3xl font-bold mb-6 tracking-vn-tight">Gia nhập cộng đồng ngay hôm nay</h2>
              <p className="text-lg text-gray-300 mb-8 tracking-vn-tight leading-vn">
                Đăng ký tài khoản để tham gia thảo luận, đặt câu hỏi và kết nối với những người yêu thích Tarot trên khắp Việt Nam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
                >
                  Đăng ký tài khoản
                </Link>
                <Link 
                  to="/login" 
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default memo(ForumPage); 