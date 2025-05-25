/**
 * Cấu hình kết nối đến MySQL database
 */
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Tạo pool kết nối để tối ưu hiệu suất
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tarot_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test kết nối
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Kết nối đến MySQL thành công!');
    connection.release();
    return true;
  } catch (error) {
    console.error('Không thể kết nối đến MySQL:', error);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
}; 