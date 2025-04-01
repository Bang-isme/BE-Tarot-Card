import crypto from 'crypto';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import { User } from '../models/index.js';

/**
 * @desc    Đăng ký người dùng mới
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Kiểm tra email đã tồn tại chưa
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return next(new ErrorResponse('Email đã được sử dụng', 400));
  }

  // Tạo user mới
  const user = await User.create({
    name,
    email,
    password,
    isVerified: true // Trong môi trường thực tế, điều này nên là false và yêu cầu xác minh email
  });

  // Tạo token
  const token = generateToken(user.id);

  sendTokenResponse(user, 201, res);
});

/**
 * @desc    Đăng nhập người dùng
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Vui lòng cung cấp email và mật khẩu', 400));
  }

  // Kiểm tra user tồn tại
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(new ErrorResponse('Thông tin đăng nhập không chính xác', 401));
  }

  // Kiểm tra mật khẩu
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Thông tin đăng nhập không chính xác', 401));
  }

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    Đăng xuất / xóa cookie
 * @route   GET /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * @desc    Lấy thông tin người dùng hiện tại
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * @desc    Cập nhật thông tin cá nhân
 * @route   PUT /api/auth/update-details
 * @access  Private
 */
export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByPk(req.user.id);
  
  if (!user) {
    return next(new ErrorResponse('Không tìm thấy người dùng', 404));
  }
  
  // Cập nhật thông tin
  await user.update(fieldsToUpdate);

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * @desc    Cập nhật mật khẩu
 * @route   PUT /api/auth/update-password
 * @access  Private
 */
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  // Kiểm tra mật khẩu hiện tại
  const isMatch = await user.matchPassword(req.body.currentPassword);

  if (!isMatch) {
    return next(new ErrorResponse('Mật khẩu hiện tại không đúng', 401));
  }

  // Cập nhật mật khẩu mới
  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    Quên mật khẩu
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return next(new ErrorResponse('Không tìm thấy người dùng với email này', 404));
  }

  // Tạo reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Mã hóa token và lưu vào database
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Đặt thời gian hết hạn (10 phút)
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  // Trong môi trường thực tế, chúng ta sẽ gửi email với token
  // Đây là phiên bản đơn giản chỉ trả về token qua API
  res.status(200).json({
    success: true,
    resetToken
  });
});

/**
 * @desc    Đặt lại mật khẩu
 * @route   PUT /api/auth/reset-password/:resettoken
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Lấy token và mã hóa
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  // Tìm người dùng dựa trên token và thời gian hết hạn
  const user = await User.findOne({
    where: {
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    }
  });

  if (!user) {
    return next(new ErrorResponse('Token không hợp lệ hoặc đã hết hạn', 400));
  }

  // Đặt mật khẩu mới
  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * Helper để gửi response với token trong cookie
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Tạo token
  const token = generateToken(user.id);

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  // Set secure flag trong production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Remove password from output
  user.password = undefined;

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      data: user
    });
}; 