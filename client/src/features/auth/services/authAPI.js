import apiClient from '../../../shared/utils/api/apiClient';
import { mockLogin, mockRegister, mockGetCurrentUser, USE_MOCK_API } from '../../../shared/utils/api/mockAuthAPI';

// Login user
export const login = async (email, password) => {
  try {
    // Use mock API if enabled
    if (USE_MOCK_API) {
      const data = await mockLogin(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    }
    
    // Use real API
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Register user
export const register = async (userData) => {
  try {
    // Use mock API if enabled
    if (USE_MOCK_API) {
      return await mockRegister(userData);
    }
    
    // Use real API
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = async () => {
  try {
    // Use mock API if enabled
    if (USE_MOCK_API) {
      return await mockGetCurrentUser();
    }
    
    // Use real API
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    // Mock API doesn't support this feature
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { message: 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn' };
    }
    
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Reset password
export const resetPassword = async (token, password) => {
  try {
    // Mock API doesn't support this feature
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { message: 'Mật khẩu đã được cập nhật thành công' };
    }
    
    const response = await apiClient.post('/auth/reset-password', { token, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
