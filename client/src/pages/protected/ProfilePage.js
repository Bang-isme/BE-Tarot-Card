import React, { useState, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../shared/ui/NavBar';
import Footer from '../../shared/ui/Footer';

// Components
const SectionTitle = memo(({ title, subtitle, centered = false, light = true }) => (
  <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-[#9370db]'} tracking-vn-tight`}>
      {title}
      <span className="block h-1 w-20 bg-gradient-to-r from-[#9370db] to-[#8a2be2] mt-2 rounded-full"></span>
    </h2>
    {subtitle && <p className={`${light ? 'text-gray-300' : 'text-gray-600'} text-lg tracking-vn-tight leading-vn`}>{subtitle}</p>}
  </div>
));

const ProfileInfoItem = memo(({ label, value, icon, isEditing, onChange, name }) => (
  <div className="mb-6">
    <label className="block text-[#9370db] mb-2 text-sm font-medium tracking-vn-tight flex items-center">
      <span className="mr-2 text-[#9370db]">{icon}</span>
      {label}
    </label>
    {isEditing ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-purple-900/30 rounded-lg text-white focus:outline-none focus:border-[#9370db] transition-colors tracking-vn-tight"
      />
    ) : (
      <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-lg text-white tracking-vn-tight">
        {value || 'Chưa cập nhật'}
      </div>
    )}
  </div>
));

const TarotSessionItem = memo(({ date, reading, image, result }) => (
  <div className="flex items-center bg-white/5 backdrop-blur-sm border border-purple-900/20 p-4 rounded-xl mb-4 hover:bg-white/10 transition-colors">
    <div className="w-16 h-16 min-w-16 rounded-lg overflow-hidden mr-4">
      <img src={image} alt={reading} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1">
      <h4 className="text-white font-medium tracking-vn-tight mb-1">{reading}</h4>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400 tracking-vn-tight">{new Date(date).toLocaleDateString('vi-VN')}</p>
        <span className="text-xs px-2 py-1 rounded-full bg-[#9370db]/20 text-[#9370db] tracking-vn-tight">{result}</span>
      </div>
    </div>
    <Link to={`/reading-history/${date}`} className="ml-4 p-2 text-[#9370db] hover:text-white transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
));

const BadgeItem = memo(({ title, description, icon, level, progress }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-4 rounded-xl text-center">
    <div className="w-16 h-16 rounded-full bg-[#2a1045] flex items-center justify-center mx-auto mb-3">
      <span className="text-2xl">{icon}</span>
    </div>
    <h4 className="text-white font-medium tracking-vn-tight mb-1">{title}</h4>
    <p className="text-sm text-gray-400 tracking-vn-tight mb-3">{description}</p>
    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-1">
      <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#9370db] to-[#8a2be2]" style={{ width: `${progress}%` }}></div>
    </div>
    <p className="text-xs text-gray-400 tracking-vn-tight">Cấp độ {level}</p>
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

const ProfilePage = () => {
  // Thông tin người dùng mẫu - trong thực tế sẽ lấy từ Redux store
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0912345678",
    birthdate: "1990-01-01",
    address: "Hà Nội, Việt Nam",
    bio: "Tôi đam mê Tarot và muốn tìm hiểu thêm về nó. Đây là hành trình khám phá bản thân của tôi thông qua các lá bài."
  });

  // Recent readings - trong thực tế sẽ lấy từ API
  const recentReadings = [
    {
      id: 1, 
      date: "2023-03-15", 
      reading: "Tarot Tình Yêu", 
      image: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
      result: "Tích cực"
    },
    {
      id: 2, 
      date: "2023-03-10", 
      reading: "Tarot Sự Nghiệp", 
      image: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_2.jpg",
      result: "Cân nhắc"
    },
    {
      id: 3, 
      date: "2023-03-05", 
      reading: "Tarot Hàng Ngày", 
      image: "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg",
      result: "Cần cẩn trọng"
    }
  ];

  const badges = [
    {
      title: "Nhà Khám Phá",
      description: "Đã hoàn thành 5 lần xem bói",
      icon: "🔮",
      level: 1,
      progress: 60
    },
    {
      title: "Tâm Linh Học",
      description: "Đã xem 10 loại trải bài khác nhau",
      icon: "🧠",
      level: 2,
      progress: 45
    },
    {
      title: "Hiền Triết",
      description: "Đã đọc 20 bài viết trên diễn đàn",
      icon: "📚",
      level: 1,
      progress: 30
    },
    {
      title: "Cộng Đồng",
      description: "Đã tham gia thảo luận trên diễn đàn",
      icon: "👥",
      level: 1,
      progress: 15
    }
  ];

  const handleProfileChange = (field, value) => {
    setUserProfile({
      ...userProfile,
      [field]: value
    });
  };

  const handleSaveProfile = () => {
    // Trong thực tế, gọi API để cập nhật profile
    console.log("Saving profile:", userProfile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0933] to-[#0f051d] text-white relative overflow-hidden">
      <Helmet>
        <title>Hồ Sơ Người Dùng | Bói Tarot</title>
        <meta name="description" content="Quản lý hồ sơ cá nhân và xem lại lịch sử các lần xem bói Tarot của bạn." />
      </Helmet>
      
      <MysticBackground />
      <Navbar />
      
      {/* Profile Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column - Profile Info */}
            <div className="w-full md:w-2/3 space-y-8">
              <div className="flex items-center justify-between mb-6">
                <SectionTitle 
                  title="Hồ Sơ Cá Nhân" 
                  subtitle="Thông tin và cài đặt tài khoản của bạn"
                />
                
                {isEditing ? (
                  <div className="flex gap-3">
                    <button 
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
                    >
                      Lưu
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight"
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="relative mr-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] flex items-center justify-center">
                      <span className="text-white text-3xl font-medium">{userProfile.name.charAt(0)}</span>
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#9370db] flex items-center justify-center hover:bg-[#8a2be2] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-vn-tight">{userProfile.name}</h3>
                    <p className="text-gray-400 tracking-vn-tight">Thành viên từ {new Date().toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileInfoItem 
                    label="Họ và tên" 
                    value={userProfile.name} 
                    icon="👤"
                    isEditing={isEditing}
                    onChange={handleProfileChange}
                    name="name"
                  />
                  <ProfileInfoItem 
                    label="Email" 
                    value={userProfile.email} 
                    icon="📧"
                    isEditing={isEditing}
                    onChange={handleProfileChange}
                    name="email"
                  />
                  <ProfileInfoItem 
                    label="Số điện thoại" 
                    value={userProfile.phone} 
                    icon="📱"
                    isEditing={isEditing}
                    onChange={handleProfileChange}
                    name="phone"
                  />
                  <ProfileInfoItem 
                    label="Ngày sinh" 
                    value={userProfile.birthdate} 
                    icon="🎂"
                    isEditing={isEditing}
                    onChange={handleProfileChange}
                    name="birthdate"
                  />
                  <ProfileInfoItem 
                    label="Địa chỉ" 
                    value={userProfile.address} 
                    icon="🏠"
                    isEditing={isEditing}
                    onChange={handleProfileChange}
                    name="address"
                  />
                </div>
                
                <div className="mt-6">
                  <label className="block text-[#9370db] mb-2 text-sm font-medium tracking-vn-tight flex items-center">
                    <span className="mr-2 text-[#9370db]">📝</span>
                    Giới thiệu về bản thân
                  </label>
                  {isEditing ? (
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) => handleProfileChange("bio", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-purple-900/30 rounded-lg text-white focus:outline-none focus:border-[#9370db] transition-colors tracking-vn-tight"
                    ></textarea>
                  ) : (
                    <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-lg text-white tracking-vn-tight min-h-20">
                      {userProfile.bio || 'Chưa cập nhật'}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Account Security Section */}
              <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white tracking-vn-tight mb-4">Bảo mật tài khoản</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-purple-900/20">
                    <div>
                      <p className="text-white tracking-vn-tight">Đổi mật khẩu</p>
                      <p className="text-sm text-gray-400 tracking-vn-tight">Cập nhật mật khẩu để bảo vệ tài khoản</p>
                    </div>
                    <button className="bg-white/10 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight text-sm">
                      Đổi mật khẩu
                    </button>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-purple-900/20">
                    <div>
                      <p className="text-white tracking-vn-tight">Xác thực hai yếu tố</p>
                      <p className="text-sm text-gray-400 tracking-vn-tight">Thêm lớp bảo mật cho tài khoản</p>
                    </div>
                    <button className="bg-white/10 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight text-sm">
                      Thiết lập
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white tracking-vn-tight">Phiên đăng nhập</p>
                      <p className="text-sm text-gray-400 tracking-vn-tight">Quản lý các thiết bị đang đăng nhập</p>
                    </div>
                    <button className="bg-white/10 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight text-sm">
                      Xem thiết bị
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Recent Readings Section */}
              <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white tracking-vn-tight">Lịch sử xem gần đây</h3>
                  <Link to="/reading-history" className="text-[#9370db] hover:text-white transition-colors text-sm tracking-vn-tight">
                    Xem tất cả
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {recentReadings.map(reading => (
                    <TarotSessionItem 
                      key={reading.id}
                      date={reading.date}
                      reading={reading.reading}
                      image={reading.image}
                      result={reading.result}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Stats & Achievements */}
            <div className="w-full md:w-1/3 space-y-8">
              {/* Stats */}
              <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white tracking-vn-tight mb-4">Thống kê</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-purple-900/20">
                    <p className="text-gray-300 tracking-vn-tight">Số lần xem bói</p>
                    <p className="text-white font-medium tracking-vn-tight">25</p>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-purple-900/20">
                    <p className="text-gray-300 tracking-vn-tight">Loại bói phổ biến</p>
                    <p className="text-white font-medium tracking-vn-tight">Tình yêu</p>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-purple-900/20">
                    <p className="text-gray-300 tracking-vn-tight">Bài viết trên diễn đàn</p>
                    <p className="text-white font-medium tracking-vn-tight">5</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300 tracking-vn-tight">Thành viên từ</p>
                    <p className="text-white font-medium tracking-vn-tight">28/03/2023</p>
                  </div>
                </div>
              </div>
              
              {/* Membership */}
              <div className="bg-gradient-to-r from-[#2a1045] to-[#3a1c5a] p-6 rounded-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#9370db]/20 rounded-full filter blur-[30px]"></div>
                <div className="absolute left-0 bottom-0 w-24 h-24 bg-[#8a2be2]/20 rounded-full filter blur-[20px]"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white tracking-vn-tight">Hạng thành viên</h3>
                    <div className="px-2 py-1 rounded-full bg-[#9370db]/20">
                      <span className="text-xs text-[#9370db] tracking-vn-tight font-medium">Cơ bản</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-300 text-sm tracking-vn-tight">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9370db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>3 lần xem bói mỗi ngày</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 text-sm tracking-vn-tight">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9370db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Truy cập thư viện bài Tarot cơ bản</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 text-sm tracking-vn-tight">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9370db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Tham gia diễn đàn cộng đồng</span>
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight text-center">
                    Nâng cấp lên Premium
                  </button>
                </div>
              </div>
              
              {/* Achievements */}
              <div>
                <h3 className="text-xl font-bold text-white tracking-vn-tight mb-4">Thành tựu</h3>
                <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge, index) => (
                    <BadgeItem 
                      key={index}
                      title={badge.title}
                      description={badge.description}
                      icon={badge.icon}
                      level={badge.level}
                      progress={badge.progress}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default memo(ProfilePage); 