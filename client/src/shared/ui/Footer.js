// src/containers/Public/Footer.js
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// Icons Components
const EmailIcon = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9370db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
));

const PhoneIcon = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9370db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
));

const LocationIcon = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9370db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
));

// Social Icons Component
const SocialIcon = memo(({ href, children, label }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#9370db] hover:text-white transition-colors transform hover:scale-110 flex items-center justify-center w-9 h-9 rounded-full bg-[#2a1045] hover:bg-[#3a1c5a] transition-all" 
    aria-label={label}
  >
    {children}
  </a>
));

// Contact Item Component
const ContactItem = memo(({ icon, text, href, isLink = false }) => {
  const content = (
    <li className="flex items-start gap-3 text-gray-300 group hover:text-white transition-colors">
      <span className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">{icon}</span>
      <span className="group-hover:translate-x-1 transition-transform tracking-vn-tight">{text}</span>
    </li>
  );

  return isLink ? (
    <a href={href} className="hover:text-[#9370db]" target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : content;
});

// Quick Link Item Component
const QuickLinkItem = memo(({ to, label }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-300 hover:text-[#9370db] transition-colors flex items-center group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-[#9370db] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-0 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
      <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform tracking-vn-tight">
        {label}
      </span>
    </Link>
  </li>
));

// Section Component
const Section = memo(({ title, children }) => (
  <div>
    <h3 className="text-[#9370db] font-bold text-lg mb-4 relative inline-block tracking-vn-tight">
      {title}
      <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#9370db] to-transparent"></span>
    </h3>
    {children}
  </div>
));

// Logo Component
const Logo = memo(() => (
  <div className="flex items-center gap-2 mb-4">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9370db] to-[#8a2be2]"></div>
      <span className="absolute inset-0.5 flex items-center justify-center bg-[#1a0933] text-[#9370db] text-xl rounded-full">
        T
      </span>
    </div>
    <span className="text-xl font-bold tracking-vn-tight">
      <span className="text-white">Bói</span>
      <span className="text-[#8a2be2]">Tarot</span>
    </span>
  </div>
));

// Newsletter Form Component
const NewsletterForm = memo(() => (
  <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
    <p className="text-sm text-gray-300 mb-2 tracking-vn-tight">Đăng ký nhận tin:</p>
    <div className="flex">
      <input 
        type="email" 
        placeholder="Email của bạn" 
        className="bg-[#2a1045] border border-[#3a1c5a] rounded-l-md px-3 py-2 text-sm flex-grow focus:outline-none focus:border-[#9370db] transition-colors" 
        aria-label="Địa chỉ email"
      />
      <button 
        type="submit" 
        className="bg-gradient-to-r from-[#8a2be2] to-[#9370db] text-white px-3 py-2 rounded-r-md hover:opacity-90 transition-opacity text-sm hover:shadow-lg hover:shadow-[#9370db]/20"
        aria-label="Gửi đăng ký"
      >
        Gửi
      </button>
    </div>
  </form>
));

// Decorative Element
const DecorativeElement = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#9370db]/5 rounded-full filter blur-[80px] animate-pulse-slow"></div>
    <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-[#8a2be2]/5 rounded-full filter blur-[60px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
  </div>
));

// Main Footer Component
const Footer = () => {
  // Quick Links Data
  const quickLinks = [
    { to: "/", label: "Trang chủ" },
    { to: "/about", label: "Về chúng tôi" },
    { to: "/tarot-readings", label: "Bói Tarot" },
    { to: "/tarot-cards", label: "Thư Viện Bài" },
    { to: "/daily-tarot", label: "Tarot Hàng Ngày" },
    { to: "/forum", label: "Diễn Đàn" }
  ];

  // Services Data
  const services = [
    { to: "/love", label: "Bói tình yêu", icon: "❤️" },
    { to: "/career", label: "Bói sự nghiệp", icon: "💼" },
    { to: "/health", label: "Bói sức khỏe", icon: "🩺" },
    { to: "/daily", label: "Bói hàng ngày", icon: "📆" },
    { to: "/yearly", label: "Bói năm mới", icon: "🎊" }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1a0933] to-[#150726] border-t border-[#3a1c5a] text-white py-12 relative">
      <DecorativeElement />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About Section */}
          <Section title="Về Bói Tarot">
            <div className="space-y-4">
              <Logo />
              <p className="text-gray-300 text-sm leading-vn tracking-vn-tight">
                Bói Tarot là trang web chuyên về bói bài Tarot online kết hợp trí tuệ nhân tạo tiên tiến. Chúng tôi cung cấp các
                dịch vụ xem bói Tarot về tình yêu, sự nghiệp, và sức khỏe.
              </p>
              <div className="flex space-x-3 pt-2">
                <SocialIcon href="https://facebook.com" label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://twitter.com" label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://instagram.com" label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </Section>

          {/* Quick Links Section */}
          <Section title="Liên kết nhanh">
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <QuickLinkItem key={index} to={link.to} label={link.label} />
              ))}
            </ul>
          </Section>

          {/* Services Section */}
          <Section title="Dịch vụ">
            <ul className="space-y-2 text-sm">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.to} 
                    className="text-gray-300 hover:text-[#9370db] transition-colors flex items-center group"
                  >
                    <span className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity">{service.icon}</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform tracking-vn-tight">
                      {service.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          {/* Contact Section */}
          <Section title="Liên hệ">
            <div className="space-y-4">
              <ul className="space-y-3 text-sm">
                <ContactItem 
                  icon={<EmailIcon />} 
                  text="contact@boitarot.vn"
                  href="mailto:contact@boitarot.vn"
                  isLink={true}
                />
                <ContactItem 
                  icon={<PhoneIcon />} 
                  text="0123 456 789"
                  href="tel:0123456789"
                  isLink={true}
                />
                <ContactItem 
                  icon={<LocationIcon />} 
                  text="Hà Nội, Việt Nam" 
                />
              </ul>
              
              <div className="pt-4">
                <NewsletterForm />
              </div>
            </div>
          </Section>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 pt-6 border-t border-[#3a1c5a] text-center text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="tracking-vn-tight">© {new Date().getFullYear()} Bói Tarot. Tất cả các quyền được bảo lưu.</p>
            <div className="flex gap-4">
              <Link to="/terms" className="text-gray-400 hover:text-[#9370db] transition-colors tracking-vn-tight">Điều khoản sử dụng</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-[#9370db] transition-colors tracking-vn-tight">Chính sách bảo mật</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;