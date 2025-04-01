import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { sequelize, testConnection } from './config/database.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import tarotRoutes from './routes/tarot.routes.js';

// Import middlewares
import errorHandler from './middlewares/error.middleware.js';

// Load environment variables
dotenv.config();

// Khởi tạo app
const app = express();

// Kiểm tra kết nối database
testConnection();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tarot', tarotRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Get directory path for ES modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Phục vụ file tĩnh từ thư mục build
  const clientBuildPath = path.resolve(__dirname, '../../client/build');
  app.use(express.static(clientBuildPath));
  
  // Tất cả requests khác trỏ về index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.resolve(clientBuildPath, 'index.html'));
    }
  });
  
  console.log('Đang chạy ở chế độ production, phục vụ các tệp tĩnh');
} else {
  // Root route cho development
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'API Tarot App đang hoạt động',
      version: '1.0.0'
    });
  });
}

// Handler cho routes không tồn tại
app.use('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({
      success: false,
      message: `Không tìm thấy route: ${req.originalUrl}`
    });
  } else {
    next();
  }
});

// Error handling middleware
app.use(errorHandler);

// Khởi động server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy ở cổng ${PORT} trong chế độ ${process.env.NODE_ENV}`);
}); 