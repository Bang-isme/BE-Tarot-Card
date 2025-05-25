const jwt = require('jsonwebtoken');
const { pool } = require('../config/database'); // Giả sử bạn dùng pool kết nối này

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy token từ header (loại bỏ 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // Xác thực token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Đảm bảo JWT_SECRET được đặt trong .env

      // Lấy thông tin người dùng từ DB (không bao gồm mật khẩu nếu có)
      // Điều chỉnh câu lệnh SQL và các trường cho phù hợp với cấu trúc DB của bạn
      const connection = await pool.getConnection();
      const [users] = await connection.execute(
        'SELECT u.id, u.username, u.email, u.role, up.display_name, up.avatar_url ' +
        'FROM users u ' +
        'LEFT JOIN user_profiles up ON u.id = up.user_id ' +
        'WHERE u.id = ?',
        [decoded.id] // Giả sử JWT payload chứa id người dùng
      );
      connection.release();

      if (users.length === 0) {
        return res.status(401).json({ success: false, message: 'Người dùng không tồn tại hoặc token không hợp lệ' });
      }

      req.user = users[0]; // Gán thông tin người dùng vào request object
      next();
    } catch (error) {
      console.error('Lỗi xác thực token:', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token đã hết hạn' });
      }
      return res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc xác thực thất bại' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Không có token, truy cập bị từ chối' });
  }
};

module.exports = { protect }; 