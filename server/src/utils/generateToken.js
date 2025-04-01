import jwt from 'jsonwebtoken';

/**
 * Tạo token JWT cho người dùng
 * @param {number} id - ID của người dùng
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

export default generateToken; 