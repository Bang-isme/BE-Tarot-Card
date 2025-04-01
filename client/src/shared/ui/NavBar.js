// src/containers/Public/Navbar.js
import React, { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import LoginForm from '../../features/auth/components/LoginForm';
import RegisterForm from '../../features/auth/components/RegisterForm';
import { path } from '../utils/constant';
import { useAuth } from '../../features/auth/hook/useAuth';

// Tách các menu items thành constant để dễ quản lý
const MAIN_MENU_ITEMS = [
  { to: path.PUBLIC.HOMEPAGE, label: "Trang chủ" },
  { to: path.PUBLIC.ABOUTPAGE, label: "Về chúng tôi" },
  { to: path.PUBLIC.TAROTREADINGS, label: "Bói Tarot" },
  { to: path.PUBLIC.TAROTCARDS, label: "Thư Viện Bài" },
  { to: path.PUBLIC.DAILYTAROT, label: "Tarot Hàng Ngày" },
  { to: path.PUBLIC.FORUMPAGE, label: "Diễn Đàn" }
];

const USER_MENU_ITEMS = [
  { to: "/profile", label: "Hồ sơ của tôi", icon: "👤" },
  { to: "/reading-history", label: "Lịch sử bói bài", icon: "📜" },
  { to: "/daily-journal", label: "Nhật ký hàng ngày", icon: "📔" },
  { to: "/premium-services", label: "Dịch vụ cao cấp", icon: "✨" }
];

// Tách thành các component nhỏ để dễ quản lý
const NavLogo = memo(() => (
  <Link to="/" className="flex items-center gap-2 relative group">
    <div className="relative w-10 h-10 transform group-hover:rotate-12 transition-transform duration-300">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] shadow-lg"></div>
      <span className="absolute inset-0.5 flex items-center justify-center bg-[#1a0933] text-[#9370db] text-xl rounded-full">
        T
      </span>
    </div>
    <span className="text-2xl font-bold transition-transform duration-300 tracking-vn-tight">
      <span className="text-white group-hover:text-[#9370db] transition-colors">Bói</span>
      <span className="text-[#8a2be2]">Tarot</span>
    </span>
  </Link>
));

const NavItem = memo(({ to, label }) => (
  <Link 
    to={to} 
    className="text-white hover:text-[#9370db] transition-colors relative px-2 py-1 group tracking-vn-tight"
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9370db] transition-all duration-300 group-hover:w-full"></span>
  </Link>
));

const UserAvatar = memo(({ userData, showUserMenu, setShowUserMenu }) => (
  <button 
    onClick={() => setShowUserMenu(!showUserMenu)}
    className="flex items-center gap-2 focus:outline-none group"
  >
    <div className="relative w-10 h-10 transform group-hover:scale-105 transition-transform">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] shadow-md"></div>
      <span className="absolute inset-0.5 flex items-center justify-center bg-[#1a0933] text-[#9370db] text-xl rounded-full">
        {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
      </span>
    </div>
    <span className="text-white group-hover:text-[#9370db] transition-colors tracking-vn-tight">{userData?.name}</span>
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-white transition-all duration-300 ${showUserMenu ? 'rotate-180 text-[#9370db]' : ''} group-hover:text-[#9370db]`} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
));

const UserMenu = memo(({ isVisible, userMenuRef, items, onLogout }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div 
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full right-0 mt-2 w-56 rounded-lg shadow-xl bg-white/5 backdrop-blur-sm border border-white/10 z-[1000] overflow-hidden"
        ref={userMenuRef}
      >
        <div className="py-2">
          {items.map((item, index) => (
            <Link 
              key={index}
              to={item.to} 
              className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white/10 transition-colors tracking-vn-tight"
            >
              <span className="text-[#9370db]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="border-t border-white/10 my-1"></div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors tracking-vn-tight"
          >
            <span className="text-[#9370db]">🚪</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));

const AuthButtons = memo(({ setShowLogin, setShowRegister }) => (
  <>
    <button 
      onClick={() => setShowLogin(true)}
      className="text-white hover:text-[#9370db] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 relative group tracking-vn-tight"
      aria-label="Đăng nhập"
    >
      <span className="relative z-10">Đăng nhập</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9370db] transition-all duration-300 group-hover:w-full"></span>
    </button>
    <button
      onClick={() => setShowRegister(true)}
      className="bg-gradient-to-r from-[#8a2be2] to-[#9370db] text-white px-4 py-1.5 rounded-lg hover:shadow-lg hover:shadow-[#9370db]/20 transition-all transform hover:-translate-y-0.5 relative overflow-hidden group tracking-vn-tight"
      aria-label="Đăng ký"
    >
      <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
      <span className="relative z-10">Đăng ký</span>
    </button>
  </>
));

const MobileMenu = memo(({ isVisible, items, mobileMenuRef, setIsMobileMenuOpen, isLoggedIn, userData, setShowLogin, setShowRegister, userMenuItems, onLogout }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div 
        ref={mobileMenuRef}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white/5 border-t border-white/10 overflow-hidden"
      >
        <div className="container mx-auto px-4 py-4">
          {isLoggedIn && userData && (
            <div className="flex items-center gap-3 p-3 mb-3 bg-white/5 rounded-lg border border-white/10">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] shadow-md"></div>
                <span className="absolute inset-0.5 flex items-center justify-center bg-[#1a0933] text-[#9370db] text-xl rounded-full">
                  {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-medium tracking-vn-tight">{userData?.name}</div>
                <div className="text-sm text-gray-400 tracking-vn-tight">{userData?.email}</div>
              </div>
            </div>
          )}
          
          <nav className="flex flex-col gap-3">
            {items.map((item, index) => (
              <Link 
                key={index} 
                to={item.to} 
                className="flex items-center gap-3 p-2 text-white hover:bg-white/10 rounded-lg transition-colors tracking-vn-tight"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="w-6 text-center text-[#9370db]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          {isLoggedIn ? (
            <>
              <div className="border-t border-white/10 my-3"></div>
              <div className="text-sm text-gray-400 mb-2 px-2 tracking-vn-tight">Tùy chọn người dùng</div>
              <nav className="flex flex-col gap-2">
                {userMenuItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.to} 
                    className="flex items-center gap-3 p-2 text-white hover:bg-white/10 rounded-lg transition-colors tracking-vn-tight"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-6 text-center text-[#9370db]">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button 
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-2 text-white hover:bg-white/10 rounded-lg transition-colors tracking-vn-tight text-left"
                >
                  <span className="w-6 text-center text-[#9370db]">🚪</span>
                  <span>Đăng xuất</span>
                </button>
              </nav>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
              <button 
                onClick={() => {
                  setShowLogin(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors tracking-vn-tight"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#9370db]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                <span>Đăng nhập</span>
              </button>
              <button 
                onClick={() => {
                  setShowRegister(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2 bg-gradient-to-r from-[#8a2be2] to-[#9370db] text-white rounded-lg tracking-vn-tight"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                <span>Đăng ký</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));

// Main Navbar component
const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { user } = useSelector(state => state.auth);
  const { logout } = useAuth();
  
  const isLoggedIn = !!user;
  const userData = user;
  
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Ngăn cuộn trang khi mobile menu mở
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Xử lý đăng xuất
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Mobile menu items với icon
  const mobileMenuItems = MAIN_MENU_ITEMS.map((item, index) => ({
    ...item,
    icon: ["🏠", "ℹ️", "🔮", "🃏", "📆", "💬"][index]
  }));

  return (
    <header className="w-full bg-gradient-to-b from-[#1a0933] to-[#150726] py-4 border-b border-[#3a1c5a] sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavLogo />

        <nav className="hidden md:flex gap-6">
          {MAIN_MENU_ITEMS.map((item, index) => (
            <NavItem key={index} to={item.to} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative z-[100]">
              <UserAvatar 
                userData={userData} 
                showUserMenu={showUserMenu} 
                setShowUserMenu={setShowUserMenu} 
              />
              <UserMenu 
                isVisible={showUserMenu} 
                userMenuRef={userMenuRef} 
                items={USER_MENU_ITEMS}
                onLogout={handleLogout}
              />
            </div>
          ) : (
            <AuthButtons 
              setShowLogin={setShowLogin}
              setShowRegister={setShowRegister}
            />
          )}
          
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span className={`block w-5 h-0.5 bg-white absolute transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
              <span className={`block w-5 h-0.5 bg-white absolute transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-white absolute transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isVisible={isMobileMenuOpen}
        items={mobileMenuItems}
        mobileMenuRef={mobileMenuRef}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        userData={userData}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        userMenuItems={USER_MENU_ITEMS}
        onLogout={handleLogout}
      />

      <AnimatePresence>
        {showLogin && (
          <LoginForm 
            onClose={() => setShowLogin(false)} 
            onSwitchToRegister={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          />
        )}
        {showRegister && (
          <RegisterForm 
            onClose={() => setShowRegister(false)} 
            onSwitchToLogin={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;