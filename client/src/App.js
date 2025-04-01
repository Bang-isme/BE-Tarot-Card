import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './features/auth/components/LoginForm';
import NotFound from './pages/public/404';
import RegisterForm from './features/auth/components/RegisterForm';
import { path } from './shared/utils/constant';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import TarotReadingsPage from './pages/public/TarotReadingsPage';
import DailyTarotPage from './pages/public/DailyTarotPage';
import ForumPage from './pages/public/ForumPage';
import TarotCardsPage from './pages/public/TarotCardsPage';
import AuthPage from './pages/public/AuthPage';
import ProfilePage from './pages/protected/ProfilePage';
import ReadingHistoryPage from './pages/protected/ReadingHistoryPage';
import DashboardPage from './pages/protected/DashboardPage';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import { fetchCurrentUser } from './features/auth/slices/authSlice';


function App() {
  const dispatch = useDispatch();

  // Check authentication status when app loads
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return (  
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path={path.PUBLIC.HOMEPAGE} element={<HomePage />} />
        <Route path={path.AUTH.LOGIN} element={<AuthPage />} />
        <Route path={path.AUTH.REGISTER} element={<AuthPage />} />
        <Route path={path.PUBLIC.ABOUTPAGE} element={<AboutPage />} />
        <Route path={path.PUBLIC.TAROTREADINGS} element={<TarotReadingsPage />} />
        <Route path={path.PUBLIC.DAILYTAROT} element={<DailyTarotPage />} />
        <Route path={path.PUBLIC.FORUMPAGE} element={<ForumPage />} />
        <Route path={path.PUBLIC.TAROTCARDS} element={<TarotCardsPage />} />
        
        {/* Protected Routes */}
        <Route path={path.PROTECTED.PROFILE} element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path={path.PROTECTED.READING_HISTORY} element={
          <ProtectedRoute>
            <ReadingHistoryPage />
          </ProtectedRoute>
        } />
        <Route path={path.PROTECTED.DASHBOARD} element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;