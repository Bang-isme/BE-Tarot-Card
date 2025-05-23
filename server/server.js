/**
 * Server chính của ứng dụng Tarot
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { testConnection } = require('./src/config/db.config');
const authRoutes = require('./src/routes/auth.routes');
const tarotRoutes = require('./src/routes/tarotReading.routes');
const userRoutes = require('./src/routes/user.routes');
const journalRoutes = require('./src/routes/journal.routes');
const forumRoutes = require('./src/routes/forum.routes');
const adminRoutes = require('./src/routes/admin.routes');

// Cấu hình môi trường
dotenv.config();

// Khởi tạo express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kiểm tra kết nối database
testConnection()
  .then(connected => {
    if (!connected) {
      console.error('Không thể kết nối đến database. Hãy kiểm tra cấu hình kết nối.');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Lỗi khi kiểm tra kết nối database:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tarot', tarotRoutes);
app.use('/api/users', userRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', version: '1.0.0' });
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Lỗi server: ' + (err.message || 'Đã xảy ra lỗi không xác định')
  });
});

// Middleware xử lý route không tồn tại
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Không tìm thấy route: ${req.method} ${req.originalUrl}`
  });
});

// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 