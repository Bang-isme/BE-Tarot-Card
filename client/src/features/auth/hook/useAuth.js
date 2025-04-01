import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  fetchCurrentUser,
  clearError
} from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  // Login handler
  const login = useCallback(async (email, password) => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/dashboard');
      return true;
    } catch (err) {
      return false;
    }
  }, [dispatch, navigate]);

  // Register handler
  const register = useCallback(async (userData) => {
    try {
      await dispatch(registerUser(userData)).unwrap();
      navigate('/login');
      return true;
    } catch (err) {
      return false;
    }
  }, [dispatch, navigate]);

  // Logout handler
  const logout = useCallback(() => {
    dispatch(logoutUser());
    navigate('/');
  }, [dispatch, navigate]);

  // Check auth status
  const checkAuthStatus = useCallback(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  // Clear errors
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    checkAuthStatus,
    clearAuthError
  };
};

export default useAuth; 