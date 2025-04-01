# Tarot App - Backend (MySQL)

Backend API cho ứng dụng Tarot sử dụng MySQL và Sequelize ORM.

## Cấu trúc dự án

```
server-mysql/
├── src/
│   ├── config/            # Cấu hình ứng dụng và database
│   ├── controllers/       # Các controllers xử lý logic
│   ├── middlewares/       # Các middleware
│   ├── migrations/        # Scripts tạo và seed database
│   ├── models/            # Các models Sequelize
│   ├── routes/            # Định nghĩa routes
│   ├── utils/             # Các utility function
│   └── index.js           # Entry point
├── .env.example           # Template biến môi trường
├── Procfile               # Cấu hình cho Heroku
├── package.json           # Dependencies và scripts
└── README.md              # Documentation
```

## Các tính năng

- **Authentication**: Đăng ký, đăng nhập, đăng xuất, quên mật khẩu
- **Authorization**: Bảo vệ routes dựa trên vai trò người dùng
- **Tarot API**: Xem thông tin lá bài, tạo và lưu trải bài, lá bài ngày

## Database Schema

- **Users**: Lưu thông tin người dùng
- **Cards**: Lưu thông tin về 78 lá bài Tarot
- **Readings**: Lưu thông tin về các lần trải bài
- **ReadingCards**: Bảng join giữa Readings và Cards
- **DailyTarot**: Lưu thông tin lá bài ngày

## Cài đặt và cấu hình

1. **Cài đặt dependencies**
   ```
   npm install
   ```

2. **Cấu hình môi trường**
   - Tạo file `.env` từ template `.env.example`
   - Cấu hình thông tin MySQL database

3. **Tạo database**
   ```
   npm run db:create
   ```

4. **Tạo các bảng**
   ```
   npm run db:migrate
   ```

5. **Tạo dữ liệu mẫu**
   ```
   npm run db:seed
   ```

## Chạy ứng dụng

**Development mode**
```
npm run dev
```

**Production mode**
```
npm start
```

## Triển khai Server Live

### Triển khai lên Heroku

1. **Đăng nhập vào Heroku CLI**
   ```
   heroku login
   ```

2. **Tạo ứng dụng Heroku**
   ```
   heroku create your-tarot-app-name
   ```

3. **Thêm database add-on**
   ```
   heroku addons:create jawsdb:kitefin
   ```

4. **Cấu hình biến môi trường**
   ```
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_secure_jwt_secret
   heroku config:set JWT_EXPIRES_IN=30d
   heroku config:set JWT_COOKIE_EXPIRE=30
   ```

5. **Deploy ứng dụng**
   ```
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Triển khai lên VPS/Server

1. **Cài đặt Node.js và MySQL trên server**

2. **Tạo database MySQL**
   ```
   mysql -u root -p
   CREATE DATABASE tarot_db;
   CREATE USER 'tarot_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON tarot_db.* TO 'tarot_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Cấu hình PM2 để chạy ứng dụng**
   ```
   npm install -g pm2
   pm2 start src/index.js --name tarot-app
   pm2 startup
   pm2 save
   ```

4. **Cấu hình Nginx (nếu cần)**
   ```
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký người dùng mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin người dùng hiện tại
- `PUT /api/auth/update-details` - Cập nhật thông tin cá nhân
- `PUT /api/auth/update-password` - Cập nhật mật khẩu
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `PUT /api/auth/reset-password/:resettoken` - Đặt lại mật khẩu

### Tarot
- `GET /api/tarot/cards` - Lấy tất cả lá bài
- `GET /api/tarot/cards/:id` - Lấy thông tin một lá bài
- `GET /api/tarot/daily` - Lấy lá bài ngày
- `POST /api/tarot/readings` - Tạo một lần đọc bài mới
- `GET /api/tarot/readings` - Lấy lịch sử đọc bài của người dùng
- `GET /api/tarot/readings/:id` - Lấy thông tin chi tiết một lần đọc bài

## Tài khoản mặc định

- **Admin**: admin@tarot.com / admin123
- **User**: user@tarot.com / user123 