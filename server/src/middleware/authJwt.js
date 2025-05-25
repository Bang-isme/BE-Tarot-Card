const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Không có token xác thực'
      });
    }

    // Verify token
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'tarot-system-secret-key'
      );

      // Check if user still exists
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Người dùng không tồn tại'
        });
      }

      // Grant user information to our endpoints
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Token không hợp lệ hoặc đã hết hạn'
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi xác thực',
      error: error.message
    });
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Yêu cầu quyền admin'
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin
};

module.exports = authJwt; 