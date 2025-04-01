import { sequelize } from '../config/database.js';
import { User, Card, Reading, ReadingCard, DailyTarot } from '../models/index.js';

async function runMigrations() {
  try {
    console.log('Bắt đầu tạo các bảng trong database...');

    // Force: true sẽ xóa bảng cũ nếu tồn tại. 
    // Trong môi trường production, set false hoặc sử dụng alter: true
    const options = process.env.NODE_ENV === 'development' 
      ? { force: true } 
      : { alter: true };

    // Tạo bảng trong thứ tự đúng để tránh lỗi foreign key
    await sequelize.sync(options);

    console.log('Tất cả các bảng đã được tạo thành công!');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi tạo các bảng:', error);
    process.exit(1);
  }
}

// Chạy migrations
runMigrations(); 