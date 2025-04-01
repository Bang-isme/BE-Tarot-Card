export const path = {
  // Public routes
  PUBLIC: {
    HOMEPAGE:'/',
    ABOUTUS: '/about',
    CONTACT: '/contact',
    NOTFOUND: '/404',
    LOGINFORM:'/Login',
    REGISTERFORM:'/Register',
    ABOUTPAGE: '/about-us',
    TAROTREADINGS: '/tarot-readings',
    DAILYTAROT: '/daily-tarot',
    FORUMPAGE: '/forum',
    TAROTCARDS: '/tarot-cards'
  },
  
  // Auth routes
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register'
  },
  
  // Protected routes
  PROTECTED: {
    PROFILE: '/profile',
    READING_HISTORY: '/reading-history',
    READING_DETAIL: '/reading-history/:id',
    DASHBOARD: '/dashboard',
    SETTINGS: '/settings'
  }
};