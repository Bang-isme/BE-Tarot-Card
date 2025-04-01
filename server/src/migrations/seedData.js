import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';
import { User, Card } from '../models/index.js';

// Dữ liệu mẫu cho cards
const majorArcana = [
  {
    name: "The Fool",
    nameEn: "The Fool",
    number: 0,
    arcana: "major",
    suit: "major",
    imageUrl: "/images/cards/major/fool.jpg",
    description: "Một người trẻ tuổi đứng trên vách đá, đang nhảy vào cuộc phiêu lưu mới mà không quan tâm đến rủi ro phía trước.",
    keywords: JSON.stringify(["khởi đầu mới", "tiềm năng", "liều lĩnh", "tự do", "mạo hiểm"]),
    upright: "Bắt đầu mới, tự do, tinh thần trong sáng, sự ngây thơ, mạo hiểm.",
    reversed: "Liều lĩnh, thiếu suy nghĩ, thiếu kế hoạch, vô trách nhiệm.",
    uprightKeywords: JSON.stringify(["khởi đầu", "tự do", "tinh thần", "mạo hiểm"]),
    reversedKeywords: JSON.stringify(["liều lĩnh", "thiếu suy nghĩ", "vô trách nhiệm"])
  },
  {
    name: "The Magician",
    nameEn: "The Magician",
    number: 1,
    arcana: "major",
    suit: "major",
    imageUrl: "/images/cards/major/magician.jpg",
    description: "Một người đàn ông đứng với một tay chỉ lên trời và tay kia chỉ xuống đất, tượng trưng cho sự kết nối giữa thiên đường và trái đất.",
    keywords: JSON.stringify(["sức mạnh", "kỹ năng", "tập trung", "hành động", "nguyên tắc"]),
    upright: "Sức mạnh của ý chí, khởi tạo, sự hiệu quả, nguồn lực bên trong, kỹ năng.",
    reversed: "Thao túng, thiếu kế hoạch, bản ngã, lãng phí tài năng.",
    uprightKeywords: JSON.stringify(["ý chí", "khởi tạo", "hiệu quả", "kỹ năng"]),
    reversedKeywords: JSON.stringify(["thao túng", "thiếu kế hoạch", "lãng phí tài năng"])
  },
  {
    name: "The High Priestess",
    nameEn: "The High Priestess",
    number: 2,
    arcana: "major",
    suit: "major",
    imageUrl: "/images/cards/major/high-priestess.jpg",
    description: "Một người phụ nữ ngồi giữa hai cột, đại diện cho trí tuệ và sự hiểu biết sâu sắc của tiềm thức.",
    keywords: JSON.stringify(["trực giác", "tiềm thức", "trí tuệ nội tại", "bí ẩn", "trí tuệ"]),
    upright: "Trực giác, trí tuệ cao hơn, bí ẩn, tiềm thức, nhận thức bên trong.",
    reversed: "Cảm xúc bị kìm nén, rút lui, thụ động, bối rối.",
    uprightKeywords: JSON.stringify(["trực giác", "trí tuệ", "bí ẩn", "tiềm thức"]),
    reversedKeywords: JSON.stringify(["kìm nén", "rút lui", "thụ động", "bối rối"])
  }
];

async function seedUsers() {
  try {
    console.log('Đang tạo người dùng mẫu...');
    
    // Xóa dữ liệu cũ nếu có
    await User.destroy({ where: {} });
    
    // Tạo mật khẩu mã hóa
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
    
    // Tạo tài khoản admin
    await User.create({
      name: 'Admin User',
      email: 'admin@tarot.com',
      password: adminPassword,
      role: 'admin',
      isVerified: true
    });
    
    // Tạo tài khoản người dùng thường
    await User.create({
      name: 'Test User',
      email: 'user@tarot.com',
      password: userPassword,
      role: 'user',
      isVerified: true
    });
    
    console.log('Tạo người dùng mẫu thành công!');
  } catch (error) {
    console.error('Lỗi khi tạo người dùng mẫu:', error);
    throw error;
  }
}

async function seedCards() {
  try {
    console.log('Đang tạo dữ liệu lá bài mẫu...');
    
    // Xóa dữ liệu cũ nếu có
    await Card.destroy({ where: {} });
    
    // Tạo các lá bài Major Arcana
    await Card.bulkCreate(majorArcana);
    
    console.log('Tạo dữ liệu lá bài mẫu thành công!');
  } catch (error) {
    console.error('Lỗi khi tạo dữ liệu lá bài mẫu:', error);
    throw error;
  }
}

async function seedAll() {
  try {
    await seedUsers();
    await seedCards();
    
    console.log('Tạo dữ liệu mẫu hoàn tất!');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi tạo dữ liệu mẫu:', error);
    process.exit(1);
  }
}

// Chạy seeder
seedAll(); 