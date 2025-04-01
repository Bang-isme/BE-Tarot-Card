# Tarot App

Ứng dụng Tarot kết hợp công nghệ hiện đại với Tarot truyền thống, giúp người dùng tra cứu và tìm hiểu về các lá bài Tarot.

## Tính năng

- **Xác thực người dùng**: Đăng ký, đăng nhập, quản lý tài khoản
- **Xem bài Tarot**: Các kiểu trải bài khác nhau (tình yêu, sự nghiệp, sức khỏe, v.v.)
- **Tarot hàng ngày**: Lá bài ngẫu nhiên mỗi ngày với phân tích
- **Thư viện thẻ**: Thông tin chi tiết về 78 lá bài Tarot
- **Lịch sử đọc bài**: Theo dõi các lần đọc bài trước đây

## Công nghệ

### Frontend
- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+
- MongoDB

### Cài đặt

1. **Clone repository**
   ```
   git clone https://github.com/yourusername/tarot-app.git
   cd tarot-app
   ```

2. **Cài đặt dependencies**
   ```
   # Cài đặt dependencies cho frontend
   cd client
   npm install

   # Cài đặt dependencies cho backend
   cd ../server
   npm install
   ```

3. **Cấu hình môi trường**
   - Tạo file `.env` trong thư mục `client` theo mẫu `.env.example`
   - Tạo file `.env` trong thư mục `server` theo mẫu `.env.example`

4. **Khởi tạo database**
   ```
   cd server
   npm run seed
   ```

### Chạy ứng dụng

1. **Chạy backend**
   ```
   cd server
   npm run dev
   ```

2. **Chạy frontend**
   ```
   cd client
   npm start
   ```

3. **Truy cập ứng dụng**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## Tài khoản mặc định

- **Admin**: admin@tarot.com / admin123
- **User**: user@tarot.com / user123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký người dùng mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin người dùng hiện tại
- `POST /api/auth/forgot-password` - Yêu cầu đặt lại mật khẩu
- `POST /api/auth/reset-password` - Đặt lại mật khẩu

### Tarot
- `GET /api/tarot/cards` - Lấy tất cả lá bài
- `GET /api/tarot/cards/:id` - Lấy thông tin một lá bài
- `GET /api/tarot/daily` - Lấy lá bài ngày
- `POST /api/tarot/readings` - Tạo một lần đọc bài mới
- `GET /api/tarot/readings` - Lấy lịch sử đọc bài của người dùng
- `GET /api/tarot/readings/:id` - Lấy thông tin chi tiết một lần đọc bài 