import axios from 'axios';

// Base config for axios
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Increased timeout for real API
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 (Unauthorized) errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error);
      return Promise.reject({ message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.' });
    }
    
    // Handle 500 errors
    if (error.response.status >= 500) {
      console.error('Server Error:', error.response);
      return Promise.reject({ message: 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.' });
    }
    
    // Return the error response data for handling by the components
    return Promise.reject(error);
  }
);

export default apiClient; 