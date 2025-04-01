import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { 
  DB_HOST, 
  DB_PORT, 
  DB_USER, 
  DB_PASSWORD, 
  DB_NAME 
} = process.env;

async function createDatabase() {
  try {
    // Kết nối tới MySQL server mà không cần chỉ định database
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });

    console.log('Đã kết nối tới MySQL server');

    // Tạo database nếu chưa tồn tại
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    console.log(`Database ${DB_NAME} đã được tạo hoặc đã tồn tại`);

    // Đóng kết nối
    await connection.end();
    console.log('Đã đóng kết nối MySQL');

    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi tạo database:', error);
    process.exit(1);
  }
}

// Chạy function
createDatabase(); 