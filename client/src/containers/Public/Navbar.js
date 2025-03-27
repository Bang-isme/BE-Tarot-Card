// src/containers/Public/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import LoginModal from '../../components/auth/LoginModal.';
import RegisterModal from '../../components/auth/RegisterModal';

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { isLoggedIn, userData } = useSelector(state => state.user);

  const openLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const openRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return (
    <header className="w-full bg-[#1a0933] py-4 border-b border-[#3a1c5a]">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f0c05a] to-[#e67e22]"></div>
            <div className="absolute inset-0.5 rounded-full bg-[#1a0933] flex items-center justify-center">
              <span className="text-[#f0c05a] text-xl">T</span>
            </div>
          </div>
          <span className="text-2xl font-bold">
            <span className="text-white">Bói</span>
            <span className="text-[#e67e22]">Tarot</span>
          </span>
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="text-white hover:text-[#f0c05a] transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-[#f0c05a] transition-colors">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link to="/readings" className="text-white hover:text-[#f0c05a] transition-colors">
                Bói Tarot
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-white hover:text-[#f0c05a] transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-[#f0c05a] transition-colors">
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f0c05a] to-[#e67e22]"></div>
                <div className="absolute inset-0.5 rounded-full bg-[#1a0933] flex items-center justify-center">
                  <span className="text-[#f0c05a] text-xl">
                    {userData?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
              <span className="text-white">{userData?.name}</span>
            </div>
          ) : (
            <>
              <button 
                onClick={openLoginModal} 
                className="text-white hover:text-[#f0c05a] transition-colors"
              >
                Đăng nhập
              </button>
              <button
                onClick={openRegisterModal}
                className="bg-gradient-to-r from-[#e67e22] to-[#f0c05a] text-white px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)} 
            onSwitchToRegister={openRegisterModal} 
          />
        )}
        {showRegisterModal && (
          <RegisterModal 
            onClose={() => setShowRegisterModal(false)} 
            onSwitchToLogin={openLoginModal} 
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;