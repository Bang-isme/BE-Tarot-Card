import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '../../features/auth/components/LoginForm';
import RegisterForm from '../../features/auth/components/RegisterForm';
import { useAuth } from '../../features/auth/hook/useAuth';
import { path } from '../../shared/utils/constant';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(path.PROTECTED.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);
  
  // Determine mode based on URL
  useEffect(() => {
    if (location.pathname === path.AUTH.LOGIN) {
      setIsLoginMode(true);
    } else if (location.pathname === path.AUTH.REGISTER) {
      setIsLoginMode(false);
    }
  }, [location.pathname]);
  
  const handleSwitchMode = () => {
    if (isLoginMode) {
      navigate(path.AUTH.REGISTER);
    } else {
      navigate(path.AUTH.LOGIN);
    }
  };
  
  const handleClose = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#170b36] to-[#0f0a23] p-4">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-violet-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <AnimatePresence mode="wait">
        {isLoginMode ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-auto"
          >
            <LoginForm 
              onClose={handleClose} 
              onSwitchToRegister={handleSwitchMode} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-auto"
          >
            <RegisterForm 
              onClose={handleClose} 
              onSwitchToLogin={handleSwitchMode} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage; 