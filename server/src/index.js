require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./models');
const routes = require('./routes');
const { seedTarotCards } = require('./utils/dbSeeder');

console.log('Khởi động server...');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
console.log('Đăng ký các routes API...');
app.use('/api', routes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running'
  });
});

// Kiểm tra API endpoint thủ công
app.get('/api/test-cards', (req, res) => {
  console.log('Test endpoint /api/test-cards được gọi');
  res.status(200).json({
    status: 'success',
    message: 'Test endpoint is working',
    data: { cards: [{ id: 1, name: 'Test Card' }] }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('ERROR HANDLER:', err.stack);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Sync database
console.log('Đang kết nối và đồng bộ database...');
db.sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
  .then(async () => {
    console.log('Database synced successfully');
    
    // Seed dữ liệu mẫu nếu cần
    try {
      await seedTarotCards();
    } catch (error) {
      console.error('Lỗi khi seed dữ liệu:', error);
    }
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API endpoint: http://localhost:${PORT}/api`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Test cards endpoint: http://localhost:${PORT}/api/test-cards`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  process.exit(1);
});

module.exports = app; 