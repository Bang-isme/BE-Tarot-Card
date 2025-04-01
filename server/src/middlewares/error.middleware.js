import ErrorResponse from '../utils/errorResponse.js';

/**
 * Middleware xử lý lỗi dành cho toàn bộ ứng dụng
 * @param {Error} err - Đối tượng lỗi
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log lỗi để debug
  console.error(err);

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = 'Dữ liệu đã tồn tại';
    error = new ErrorResponse(message, 400);
  }

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Sequelize foreign key error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    const message = 'Dữ liệu tham chiếu không tồn tại';
    error = new ErrorResponse(message, 400);
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    const message = 'Token hết hạn, vui lòng đăng nhập lại';
    error = new ErrorResponse(message, 401);
  }

  // JWT malformed error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token không hợp lệ';
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Lỗi máy chủ'
  });
};

export default errorHandler; 