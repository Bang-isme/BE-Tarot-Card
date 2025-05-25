/**
 * Các phương thức xử lý JWT token
 */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Lấy JWT secret từ biến môi trường
const JWT_SECRET = process.env.JWT_SECRET || 'tarot_app_default_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';

/**
 * Tạo JWT token từ thông tin người dùng
 * @param {object} user - Thông tin người dùng
 * @returns {string} - JWT token
 */
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'admin'
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN
    }
  );
}

/**
 * Xác thực và giải mã JWT token
 * @param {string} token - JWT token
 * @returns {object} - Thông tin đã giải mã
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token không hợp lệ hoặc đã hết hạn');
  }
}

module.exports = {
  generateToken,
  verifyToken
}; 