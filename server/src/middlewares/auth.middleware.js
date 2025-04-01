import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import { User } from '../models/index.js';

/**
 * Bảo vệ route, yêu cầu người dùng đăng nhập
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Kiểm tra header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Lấy token từ header Bearer
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    // Hoặc từ cookie
    token = req.cookies.token;
  }

  // Đảm bảo token tồn tại
  if (!token) {
    return next(new ErrorResponse('Không có quyền truy cập vào route này', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tìm user dựa trên token
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return next(new ErrorResponse('Không tìm thấy người dùng với token này', 401));
    }

    // Gắn user vào request
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse('Không có quyền truy cập vào route này', 401));
  }
});

/**
 * Giới hạn quyền truy cập dựa trên role
 * @param  {...String} roles - Các roles được phép truy cập
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Role ${req.user.role} không có quyền truy cập vào route này`,
          403
        )
      );
    }
    next();
  };
}; 