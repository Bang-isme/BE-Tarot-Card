use tarot_system;

-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: tarot_system
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `badge_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `achievement_type` enum('reading','forum','login','premium','general') COLLATE utf8mb4_unicode_ci NOT NULL,
  `points` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
INSERT INTO `achievements` VALUES (1,'3 lần xem bói mỗi ngày','Xem bói Tarot 3 lần trong một ngày',NULL,'reading',10,'2025-04-20 17:32:00'),(2,'Thầy cập tầm linh','Tham gia diễn đàn Tarot',NULL,'forum',20,'2025-04-20 17:32:00'),(3,'Thành viên tử','Đăng ký tài khoản trên BốiTarot',NULL,'general',5,'2025-04-20 17:32:00'),(4,'Nâng cấp lên Premium','Trở thành thành viên Premium',NULL,'premium',50,'2025-04-20 17:32:00');
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_reports`
--

DROP TABLE IF EXISTS `admin_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `report_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_report_type` (`report_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_reports`
--

LOCK TABLES `admin_reports` WRITE;
/*!40000 ALTER TABLE `admin_reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_reports` ENABLE KEYS */;s
UNLOCK TABLES;

--
-- Table structure for table `daily_journals`
--

DROP TABLE IF EXISTS `daily_journals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_journals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `date` date NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_date` (`date`),
  CONSTRAINT `daily_journals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_journals`
--

LOCK TABLES `daily_journals` WRITE;
/*!40000 ALTER TABLE `daily_journals` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_journals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_tarot_messages`
--

DROP TABLE IF EXISTS `daily_tarot_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_tarot_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `type` enum('daily','weekly') COLLATE utf8mb4_unicode_ci DEFAULT 'daily',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_date_type` (`date`,`type`),
  KEY `idx_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_tarot_messages`
--

LOCK TABLES `daily_tarot_messages` WRITE;
/*!40000 ALTER TABLE `daily_tarot_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_tarot_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_comments`
--

DROP TABLE IF EXISTS `forum_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `forum_comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `forum_posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forum_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_comments`
--

LOCK TABLES `forum_comments` WRITE;
/*!40000 ALTER TABLE `forum_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_posts`
--

DROP TABLE IF EXISTS `forum_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_title` (`title`),
  CONSTRAINT `forum_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_posts`
--

LOCK TABLES `forum_posts` WRITE;
/*!40000 ALTER TABLE `forum_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'VND',
  `status` enum('pending','completed','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `transaction_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_transaction_id` (`transaction_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reading_cards`
--

DROP TABLE IF EXISTS `reading_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reading_cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reading_id` int NOT NULL,
  `card_id` int NOT NULL,
  `position_in_spread` int NOT NULL,
  `is_reversed` tinyint(1) DEFAULT NULL,
  `interpretation` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `reading_id` (`reading_id`),
  KEY `card_id` (`card_id`),
  CONSTRAINT `reading_cards_ibfk_1` FOREIGN KEY (`reading_id`) REFERENCES `tarot_readings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reading_cards_ibfk_2` FOREIGN KEY (`card_id`) REFERENCES `tarot_cards` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reading_cards`
--

LOCK TABLES `reading_cards` WRITE;
/*!40000 ALTER TABLE `reading_cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `reading_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth`
--

DROP TABLE IF EXISTS `social_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `provider` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'e.g., facebook, google',
  `provider_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Unique ID from the provider',
  `provider_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_data` json DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_provider` (`user_id`,`provider`),
  UNIQUE KEY `unique_provider_id` (`provider`,`provider_id`),
  UNIQUE KEY `social_auth_provider_provider_id` (`provider`,`provider_id`),
  KEY `social_auth_user_id` (`user_id`),
  CONSTRAINT `social_auth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth`
--

LOCK TABLES `social_auth` WRITE;
/*!40000 ALTER TABLE `social_auth` DISABLE KEYS */;
INSERT INTO `social_auth` VALUES (2,52,'facebook','1861976437974590','tranbang1445@gmail.com','{\"picture\": \"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1861976437974590&height=200&width=200&ext=1748204175&hash=AbZ8Nfy3ObXZhKtYmldGwPGU\", \"last_token_date\": \"2025-04-25T20:16:15.630Z\"}','2025-04-25 20:08:42','2025-04-25 20:16:15');
/*!40000 ALTER TABLE `social_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarot_card_meanings`
--

DROP TABLE IF EXISTS `tarot_card_meanings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarot_card_meanings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_id` int NOT NULL,
  `topic_id` int NOT NULL,
  `upright_meaning` text COLLATE utf8mb4_unicode_ci,
  `reversed_meaning` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_card_topic` (`card_id`,`topic_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `tarot_card_meanings_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `tarot_cards` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tarot_card_meanings_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `tarot_topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=376 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarot_card_meanings`
--

LOCK TABLES `tarot_card_meanings` WRITE;
/*!40000 ALTER TABLE `tarot_card_meanings` DISABLE KEYS */;
INSERT INTO `tarot_card_meanings` VALUES (1,1,1,'Một khởi đầu tình yêu đầy tự do, sẵn sàng đón nhận điều mới.','Hấp tấp trong tình cảm, thiếu cam kết hoặc không thực tế.','2025-04-13 20:00:21'),(2,1,2,'Cơ hội nghề nghiệp mới, tinh thần sáng tạo và dám thử thách.','Thiếu kế hoạch, trì hoãn hoặc không tập trung vào công việc.','2025-04-13 20:00:21'),(3,1,3,'Đầu tư mạo hiểm nhưng tiềm năng, tinh thần lạc quan tài chính.','Chi tiêu thiếu kiểm soát, rủi ro tài chính không lường trước.','2025-04-13 20:00:21'),(4,1,4,'Năng lượng tươi mới, sức khỏe dồi dào, tinh thần phấn chấn.','Căng thẳng do thiếu nghỉ ngơi, bỏ qua dấu hiệu cơ thể.','2025-04-13 20:00:21'),(5,1,5,'Kết nối tâm linh mạnh mẽ, tin vào trực giác và hành trình bản thân.','Mất phương hướng, nghi ngờ con đường tâm hồn của mình.','2025-04-13 20:00:21'),(6,2,1,'Thu hút người khác bằng sự tự tin, tình yêu đầy năng lượng.','Thao túng cảm xúc hoặc thiếu chân thành trong tình cảm.','2025-04-13 20:00:21'),(7,2,2,'Kỹ năng và sự sáng tạo giúp bạn tỏa sáng trong công việc.','Tài năng bị lãng phí, thiếu hành động hoặc tự tin quá mức.','2025-04-13 20:00:21'),(8,2,3,'Khả năng kiếm tiền từ ý tưởng mới, quản lý tài chính khéo léo.','Lừa dối tài chính hoặc không tận dụng cơ hội.','2025-04-13 20:00:21'),(9,2,4,'Sức khỏe cân bằng, năng lượng tích cực từ sự tự tin.','Kiệt sức do làm việc quá sức, mất cân bằng cơ thể.','2025-04-13 20:00:21'),(10,2,5,'Sức mạnh tâm linh giúp bạn biến ý tưởng thành hiện thực.','Thiếu kết nối tâm linh, nghi ngờ khả năng của bản thân.','2025-04-13 20:00:21'),(11,3,1,'Trực giác nhạy bén dẫn lối trong tình yêu, lắng nghe cảm xúc.','Bí mật hoặc sự xa cách làm mờ tình cảm.','2025-04-13 20:00:21'),(12,3,2,'Sử dụng trí tuệ và trực giác để đưa ra quyết định nghề nghiệp.','Thiếu hành động, bị mắc kẹt trong suy nghĩ hoặc bí mật.','2025-04-13 20:00:21'),(13,3,3,'Quản lý tài chính dựa trên trực giác, tránh chi tiêu cảm tính.','Che giấu vấn đề tài chính hoặc thiếu minh bạch.','2025-04-13 20:00:21'),(14,3,4,'Chăm sóc tinh thần giúp cải thiện sức khỏe, lắng nghe cơ thể.','Bỏ qua tín hiệu sức khỏe, căng thẳng do suy nghĩ quá nhiều.','2025-04-13 20:00:21'),(15,3,5,'Kết nối sâu sắc với tâm linh, khám phá bí ẩn của bản thân.','Ngắt kết nối với trực giác, sợ hãi điều chưa biết.','2025-04-13 20:00:21'),(16,4,1,'Tình yêu nuôi dưỡng, chăm sóc và trân trọng người khác.','Phụ thuộc cảm xúc hoặc bỏ bê nhu cầu cá nhân.','2025-04-13 20:00:21'),(17,4,2,'Môi trường làm việc hỗ trợ, phát triển nhờ sự chăm chỉ.','Thiếu động lực hoặc làm việc quá sức không hiệu quả.','2025-04-13 20:00:21'),(18,4,3,'Tài chính dư dả, biết cách chăm sóc nguồn lực.','Chi tiêu cảm tính hoặc thiếu thực tế trong tài chính.','2025-04-13 20:00:21'),(19,4,4,'Sức khỏe hài hòa nhờ chăm sóc bản thân chu đáo.','Bỏ bê sức khỏe do quá lo cho người khác.','2025-04-13 20:00:21'),(20,4,5,'Kết nối tâm linh qua sự chăm sóc và tình yêu thương.','Mất cân bằng tâm linh do tập trung quá vào người khác.','2025-04-13 20:00:21'),(21,5,1,'Mối quan hệ ổn định, dựa trên sự bảo vệ và trách nhiệm.','Kiểm soát quá mức hoặc thiếu linh hoạt trong tình cảm.','2025-04-13 20:00:21'),(22,5,2,'Lãnh đạo mạnh mẽ, đạt thành công nhờ kỷ luật và cấu trúc.','Độc đoán hoặc thiếu sáng tạo trong công việc.','2025-04-13 20:00:21'),(23,5,3,'Quản lý tài chính chặt chẽ, xây dựng sự ổn định lâu dài.','Tham vọng tài chính không thực tế, kiểm soát quá mức.','2025-04-13 20:00:21'),(24,5,4,'Sức khỏe tốt nhờ lối sống kỷ luật và trách nhiệm.','Căng thẳng do áp lực trách nhiệm hoặc cứng nhắc.','2025-04-13 20:00:21'),(25,5,5,'Tâm linh dựa trên cấu trúc, tìm ý nghĩa qua trật tự.','Thiếu kết nối tâm linh, áp đặt niềm tin.','2025-04-13 20:00:21'),(26,6,1,'Mối quan hệ dựa trên giá trị truyền thống và sự tin tưởng.','Mâu thuẫn giá trị hoặc áp đặt trong tình cảm.','2025-04-13 20:00:21'),(27,6,2,'Học hỏi từ cố vấn, thành công nhờ sự hướng dẫn.','Bị giới hạn bởi quy tắc, thiếu sáng tạo trong công việc.','2025-04-13 20:00:21'),(28,6,3,'Tài chính ổn định nhờ tuân thủ nguyên tắc.','Bảo thủ trong đầu tư, bỏ qua cơ hội mới.','2025-04-13 20:00:21'),(29,6,4,'Sức khỏe tốt nhờ lối sống cân bằng, truyền thống.','Căng thẳng do áp lực xã hội hoặc quy tắc.','2025-04-13 20:00:21'),(30,6,5,'Tâm linh sâu sắc qua học hỏi và truyền thống.','Nghi ngờ niềm tin, bị giới hạn bởi giáo điều.','2025-04-13 20:00:21'),(31,7,1,'Tình yêu hài hòa, lựa chọn dựa trên trái tim.','Mâu thuẫn nội tâm hoặc mối quan hệ mất cân bằng.','2025-04-13 20:00:21'),(32,7,2,'Hợp tác thành công, lựa chọn nghề nghiệp đúng đắn.','Do dự trong công việc, thiếu sự thống nhất.','2025-04-13 20:00:21'),(33,7,3,'Quyết định tài chính hài hòa, chia sẻ nguồn lực.','Mâu thuẫn tài chính, lựa chọn sai lầm.','2025-04-13 20:00:21'),(34,7,4,'Sức khỏe tốt nhờ sự cân bằng giữa tâm và thân.','Căng thẳng do mâu thuẫn nội tâm.','2025-04-13 20:00:21'),(35,7,5,'Tâm linh hài hòa, tìm kiếm sự thống nhất bên trong.','Mất kết nối tâm linh, đấu tranh nội tâm.','2025-04-13 20:00:21'),(36,8,1,'Tình yêu tiến triển nhanh, quyết tâm xây dựng mối quan hệ.','Mất kiểm soát cảm xúc hoặc xung đột trong tình cảm.','2025-04-13 20:00:21'),(37,8,2,'Thành công nhờ quyết tâm và kiểm soát công việc.','Thiếu định hướng, công việc bị trì trệ.','2025-04-13 20:00:21'),(38,8,3,'Tài chính tiến bộ nhờ sự tập trung và hành động.','Chi tiêu mất kiểm soát, đầu tư sai hướng.','2025-04-13 20:00:21'),(39,8,4,'Sức khỏe tốt nhờ năng lượng mạnh mẽ và quyết tâm.','Kiệt sức do làm việc quá sức, thiếu cân bằng.','2025-04-13 20:00:21'),(40,8,5,'Tâm linh tiến triển qua sự kiểm soát và ý chí.','Mất phương hướng tâm linh, thiếu tập trung.','2025-04-13 20:00:21'),(41,9,1,'Tình yêu bền vững nhờ sự kiên nhẫn và lòng trắc ẩn.','Thiếu tự tin hoặc bùng nổ cảm xúc trong tình cảm.','2025-04-13 20:00:21'),(42,9,2,'Thành công nhờ sự kiên trì và kiểm soát nội lực.','Nghi ngờ bản thân, thiếu sức mạnh trong công việc.','2025-04-13 20:00:21'),(43,9,3,'Tài chính ổn định nhờ quản lý khéo léo và kiên nhẫn.','Chi tiêu bốc đồng, thiếu kiểm soát tài chính.','2025-04-13 20:00:21'),(44,9,4,'Sức khỏe tốt nhờ sự kiên trì và chăm sóc bản thân.','Kiệt sức, bỏ bê sức khỏe do áp lực.','2025-04-13 20:00:21'),(45,9,5,'Tâm linh mạnh mẽ, vượt qua thử thách bằng lòng tin.','Mất niềm tin, yếu đuối trong hành trình tâm linh.','2025-04-13 20:00:21'),(46,10,1,'Tìm kiếm sự thật trong tình yêu qua sự tĩnh lặng.','Cô lập cảm xúc hoặc xa cách trong mối quan hệ.','2025-04-13 20:00:21'),(47,10,2,'Tự nhìn nhận bản thân, tìm hướng đi đúng trong công việc.','Rút lui quá mức, thiếu hành động trong sự nghiệp.','2025-04-13 20:00:21'),(48,10,3,'Quản lý tài chính thận trọng, tìm kiếm sự ổn định.','Sợ hãi rủi ro, bỏ qua cơ hội tài chính.','2025-04-13 20:00:21'),(49,10,4,'Sức khỏe tinh thần tốt nhờ tĩnh lặng và suy ngẫm.','Cô lập quá mức, bỏ bê sức khỏe thể chất.','2025-04-13 20:00:21'),(50,10,5,'Khám phá tâm linh sâu sắc qua sự tĩnh lặng.','Mất kết nối, sợ hãi khám phá bản thân.','2025-04-13 20:00:21'),(51,11,1,'Cơ hội tình yêu mới, sự thay đổi tích cực.','Mối quan hệ trì trệ, kháng cự thay đổi.','2025-04-13 20:00:21'),(52,11,2,'Cơ hội nghề nghiệp bất ngờ, vận may đến.','Thất bại tạm thời, thiếu linh hoạt trong công việc.','2025-04-13 20:00:21'),(53,11,3,'Tài chính xoay chuyển tích cực, may mắn bất ngờ.','Mất mát tài chính, không nắm bắt cơ hội.','2025-04-13 20:00:21'),(54,11,4,'Sức khỏe cải thiện nhờ thay đổi tích cực.','Căng thẳng do kháng cự thay đổi.','2025-04-13 20:00:21'),(55,11,5,'Tâm linh mở rộng qua những thay đổi bất ngờ.','Mất niềm tin, sợ hãi sự không chắc chắn.','2025-04-13 20:00:21'),(56,12,1,'Tình yêu công bằng, mối quan hệ dựa trên sự thật.','Mối quan hệ mất cân bằng, bất công hoặc che giấu.','2025-04-13 20:00:21'),(57,12,2,'Quyết định nghề nghiệp công bằng, thành công nhờ trung thực.','Thiếu công bằng, trì hoãn quyết định công việc.','2025-04-13 20:00:21'),(58,12,3,'Tài chính minh bạch, nhận được điều xứng đáng.','Lừa dối tài chính, quyết định sai lầm.','2025-04-13 20:00:21'),(59,12,4,'Sức khỏe ổn định nhờ lối sống công bằng, cân bằng.','Căng thẳng do bất công hoặc lo lắng.','2025-04-13 20:00:21'),(60,12,5,'Tâm linh tìm kiếm sự thật và công lý bên trong.','Mất niềm tin, che giấu sự thật tâm linh.','2025-04-13 20:00:21'),(61,13,1,'Hy sinh vì tình yêu, nhìn nhận mối quan hệ từ góc mới.','Tắc nghẽn cảm xúc, từ chối thay đổi trong tình cảm.','2025-04-13 20:00:21'),(62,13,2,'Tạm dừng công việc để nhìn nhận lại mục tiêu.','Bị mắc kẹt, trì hoãn hoặc thiếu hành động.','2025-04-13 20:00:21'),(63,13,3,'Tạm hoãn đầu tư, đánh giá lại tài chính.','Mất mát tài chính do thiếu quyết đoán.','2025-04-13 20:00:21'),(64,13,4,'Sức khỏe cần nghỉ ngơi, tìm cách chữa lành mới.','Bỏ bê sức khỏe, kháng cự thay đổi.','2025-04-13 20:00:21'),(65,13,5,'Tâm linh phát triển qua sự hy sinh và buông bỏ.','Mất phương hướng, từ chối học hỏi tâm linh.','2025-04-13 20:00:21'),(66,14,1,'Kết thúc một giai đoạn tình yêu để bắt đầu mới.','Kháng cự sự kết thúc, kéo dài đau khổ trong tình cảm.','2025-04-13 20:00:21'),(67,14,2,'Chuyển đổi nghề nghiệp, cơ hội mới sau kết thúc.','Sợ thay đổi, bám víu công việc cũ.','2025-04-13 20:00:21'),(68,14,3,'Tài chính thay đổi, cơ hội mới sau mất mát.','Mất mát tài chính, không chấp nhận thay đổi.','2025-04-13 20:00:21'),(69,14,4,'Sức khỏe cần tái tạo, thay đổi lối sống.','Bỏ bê sức khỏe, kháng cự chữa lành.','2025-04-13 20:00:21'),(70,14,5,'Tâm linh chuyển hóa qua sự buông bỏ và tái sinh.','Sợ hãi thay đổi, mất kết nối tâm linh.','2025-04-13 20:00:21'),(71,15,1,'Tình yêu cân bằng, hài hòa giữa hai người.','Mất cân bằng cảm xúc, mâu thuẫn trong tình cảm.','2025-04-13 20:00:21'),(72,15,2,'Hợp tác công việc thành công, cân bằng mục tiêu.','Thiếu hợp tác, công việc mất cân bằng.','2025-04-13 20:00:21'),(73,15,3,'Tài chính ổn định nhờ quản lý cân bằng.','Chi tiêu không kiểm soát, mất cân đối tài chính.','2025-04-13 20:00:21'),(74,15,4,'Sức khỏe tốt nhờ cân bằng tâm trí và cơ thể.','Mất cân bằng sức khỏe, căng thẳng kéo dài.','2025-04-13 20:00:21'),(75,15,5,'Tâm linh hài hòa, tìm sự cân bằng bên trong.','Mất kết nối tâm linh, rối loạn nội tâm.','2025-04-13 20:00:21'),(76,16,1,'Mối quan hệ bị phá vỡ, sự thật được phơi bày.','Sợ hãi thay đổi, bám víu vào mối quan hệ cũ.','2025-04-13 20:00:21'),(77,16,2,'Thay đổi bất ngờ trong công việc, cơ hội tái tạo.','Kháng cự thay đổi, sợ thất bại trong sự nghiệp.','2025-04-13 20:00:21'),(78,16,3,'Mất mát tài chính bất ngờ, cần xây dựng lại.','Che giấu vấn đề tài chính, trì hoãn giải quyết.','2025-04-13 20:00:21'),(79,16,4,'Sức khỏe gặp khủng hoảng, cần thay đổi lối sống.','Bỏ qua tín hiệu sức khỏe, căng thẳng nghiêm trọng.','2025-04-13 20:00:21'),(80,16,5,'Tâm linh thức tỉnh qua sự sụp đổ và tái sinh.','Sợ hãi thay đổi, mất niềm tin tâm linh.','2025-04-13 20:00:21'),(81,17,1,'Hy vọng mới trong tình yêu, chữa lành cảm xúc.','Thất vọng, thiếu niềm tin vào tình cảm.','2025-04-13 20:00:21'),(82,17,2,'Cơ hội nghề nghiệp sáng rực, được công nhận.','Nghi ngờ bản thân, công việc trì trệ.','2025-04-13 20:00:21'),(83,17,3,'Tài chính cải thiện, nguồn lực mới xuất hiện.','Mất cơ hội đầu tư, thiếu lạc quan tài chính.','2025-04-13 20:00:21'),(84,17,4,'Phục hồi sức khỏe, năng lượng tích cực trở lại.','Căng thẳng kéo dài, chậm hồi phục.','2025-04-13 20:00:21'),(85,17,5,'Bình an tâm linh, kết nối với vũ trụ.','Mất định hướng, nghi ngờ con đường tâm linh.','2025-04-13 20:00:21'),(86,18,1,'Trực giác dẫn lối tình yêu, khám phá cảm xúc sâu sắc.','Mối quan hệ mơ hồ, sợ hãi hoặc lừa dối.','2025-04-13 20:00:21'),(87,18,2,'Trực giác giúp giải quyết vấn đề công việc.','Sợ hãi thất bại, công việc thiếu rõ ràng.','2025-04-13 20:00:21'),(88,18,3,'Tài chính không chắc chắn, cần tin vào trực giác.','Lừa dối tài chính, chi tiêu mơ hồ.','2025-04-13 20:00:21'),(89,18,4,'Sức khỏe tinh thần cần chú ý, lắng nghe cơ thể.','Lo âu, mất ngủ do suy nghĩ quá nhiều.','2025-04-13 20:00:21'),(90,18,5,'Khám phá tâm linh qua trực giác và bí ẩn.','Sợ hãi điều chưa biết, mất kết nối tâm linh.','2025-04-13 20:00:21'),(91,19,1,'Tình yêu rực rỡ, niềm vui và sự rõ ràng.','Thiếu niềm vui, mối quan hệ mờ nhạt.','2025-04-13 20:00:21'),(92,19,2,'Thành công nghề nghiệp, được công nhận rực rỡ.','Thiếu tự tin, công việc không đạt kỳ vọng.','2025-04-13 20:00:21'),(93,19,3,'Tài chính dồi dào, cơ hội đầu tư sáng sủa.','Mất cơ hội tài chính, thiếu lạc quan.','2025-04-13 20:00:21'),(94,19,4,'Sức khỏe tràn đầy năng lượng, tinh thần phấn chấn.','Kiệt sức, thiếu năng lượng tích cực.','2025-04-13 20:00:21'),(95,19,5,'Tâm linh rực rỡ, kết nối với ánh sáng bên trong.','Mất niềm tin, nghi ngờ hành trình tâm linh.','2025-04-13 20:00:21'),(96,20,1,'Tái sinh tình yêu, đánh giá lại mối quan hệ.','Tự trách bản thân, trì hoãn trong tình cảm.','2025-04-13 20:00:21'),(97,20,2,'Cơ hội nghề nghiệp mới, đánh giá lại mục tiêu.','Sợ thay đổi, bỏ qua cơ hội công việc.','2025-04-13 20:00:21'),(98,20,3,'Tài chính được cải thiện qua quyết định đúng đắn.','Trì hoãn đầu tư, đánh giá sai tài chính.','2025-04-13 20:00:21'),(99,20,4,'Sức khỏe phục hồi nhờ nhìn nhận lại lối sống.','Bỏ bê sức khỏe, trì hoãn chữa lành.','2025-04-13 20:00:21'),(100,20,5,'Tâm linh thức tỉnh, tìm kiếm ý nghĩa sâu sắc.','Mất phương hướng, từ chối gọi tâm linh.','2025-04-13 20:00:21'),(101,21,1,'Tình yêu hoàn thành, mối quan hệ viên mãn.','Trì hoãn hạnh phúc, mối quan hệ chưa trọn vẹn.','2025-04-13 20:00:21'),(102,21,2,'Thành công nghề nghiệp, hoàn thành mục tiêu lớn.','Thiếu hoàn thiện, công việc chưa đạt đỉnh cao.','2025-04-13 20:00:21'),(103,21,3,'Tài chính ổn định, đạt được sự dư dả.','Mất cơ hội tài chính, trì hoãn đầu tư.','2025-04-13 20:00:21'),(104,21,4,'Sức khỏe hài hòa, đạt trạng thái cân bằng.','Thiếu chăm sóc, sức khỏe chưa tối ưu.','2025-04-13 20:00:21'),(105,21,5,'Tâm linh viên mãn, kết nối với vũ trụ.','Mất kết nối, hành trình tâm linh chưa hoàn tất.','2025-04-13 20:00:21'),(111,23,1,'Đam mê mãnh liệt, một mối quan hệ mới đầy năng lượng.','Thiếu nhiệt huyết, mối quan hệ nguội lạnh hoặc trì trệ.','2025-04-13 20:00:21'),(112,23,2,'Bắt đầu dự án mới, cảm hứng sáng tạo dâng trào.','Mất động lực, trì hoãn hoặc thiếu kế hoạch.','2025-04-13 20:00:21'),(113,23,3,'Cơ hội tài chính mới, đầu tư sáng tạo đầy tiềm năng.','Rủi ro tài chính cao, chi tiêu không kiểm soát.','2025-04-13 20:00:21'),(114,23,4,'Năng lượng tích cực, thể chất khỏe mạnh, tinh thần phấn chấn.','Kiệt sức do làm quá sức, thiếu nghỉ ngơi.','2025-04-13 20:00:21'),(115,23,5,'Tăng trưởng tâm linh, khám phá bản thân qua sáng tạo.','Tản mạn, thiếu tập trung vào hành trình tâm hồn.','2025-04-13 20:00:21'),(116,24,1,'Lựa chọn trong tình yêu, cân nhắc tương lai mối quan hệ.','Do dự, thiếu quyết đoán trong tình cảm.','2025-04-13 20:00:21'),(117,24,2,'Lập kế hoạch nghề nghiệp, chuẩn bị cho bước tiến mới.','Thiếu định hướng, trì hoãn trong công việc.','2025-04-13 20:00:21'),(118,24,3,'Tài chính cần lập kế hoạch, cân nhắc đầu tư dài hạn.','Rủi ro tài chính do thiếu chuẩn bị.','2025-04-13 20:00:21'),(119,24,4,'Sức khỏe tốt nhờ lập kế hoạch lối sống tích cực.','Căng thẳng do do dự, thiếu hành động.','2025-04-13 20:00:21'),(120,24,5,'Tâm linh phát triển qua việc lập kế hoạch và tầm nhìn.','Mất phương hướng, thiếu tập trung tâm linh.','2025-04-13 20:00:21'),(121,25,1,'Tình yêu mở rộng, sẵn sàng khám phá cùng nhau.','Thiếu kiên nhẫn, mối quan hệ không tiến triển.','2025-04-13 20:00:21'),(122,25,2,'Thành công ban đầu, công việc bắt đầu có kết quả.','Thiếu tầm nhìn dài hạn, công việc chậm tiến độ.','2025-04-13 20:00:21'),(123,25,3,'Tài chính tăng trưởng nhờ mở rộng cơ hội.','Mất cơ hội đầu tư, thiếu kiên nhẫn.','2025-04-13 20:00:21'),(124,25,4,'Sức khỏe cải thiện nhờ năng lượng tích cực.','Kiệt sức do làm việc quá sức.','2025-04-13 20:00:21'),(125,25,5,'Tâm linh phát triển qua sự mở rộng và khám phá.','Mất kết nối, thiếu kiên trì tâm linh.','2025-04-13 20:00:21'),(126,26,1,'Tình yêu ổn định, ăn mừng những cột mốc quan trọng.','Mối quan hệ thiếu niềm vui, bất ổn.','2025-04-13 20:00:21'),(127,26,2,'Thành công được công nhận, môi trường làm việc hài hòa.','Công việc không ổn định, thiếu đoàn kết.','2025-04-13 20:00:21'),(128,26,3,'Tài chính ổn định, ăn mừng thành quả tài chính.','Chi tiêu quá mức, tài chính bất ổn.','2025-04-13 20:00:21'),(129,26,4,'Sức khỏe tốt nhờ môi trường sống tích cực.','Căng thẳng do thiếu cân bằng lối sống.','2025-04-13 20:00:21'),(130,26,5,'Tâm linh hài hòa, tìm niềm vui trong sự ổn định.','Mất kết nối, thiếu niềm tin tâm linh.','2025-04-13 20:00:21'),(131,27,1,'Xung đột trong tình yêu, cần giao tiếp để giải quyết.','Mâu thuẫn kéo dài, thiếu hợp tác.','2025-04-13 20:00:21'),(132,27,2,'Cạnh tranh trong công việc, cần tập trung vào mục tiêu.','Xung đột nhóm, công việc trì trệ.','2025-04-13 20:00:21'),(133,27,3,'Xung đột tài chính, cần quản lý nguồn lực tốt hơn.','Chi tiêu hỗn loạn, mất kiểm soát tài chính.','2025-04-13 20:00:21'),(134,27,4,'Căng thẳng tinh thần, cần thư giãn để cải thiện sức khỏe.','Căng thẳng kéo dài, sức khỏe suy giảm.','2025-04-13 20:00:21'),(135,27,5,'Thử thách tâm linh, cần vượt qua xung đột nội tâm.','Mất phương hướng, đấu tranh tâm linh.','2025-04-13 20:00:21'),(136,28,1,'Tình yêu chiến thắng, mối quan hệ tiến triển tích cực.','Thiếu tự tin, mối quan hệ không tiến bộ.','2025-04-13 20:00:21'),(137,28,2,'Thành công được công nhận, dẫn đầu trong công việc.','Thiếu hỗ trợ, công việc gặp khó khăn.','2025-04-13 20:00:21'),(138,28,3,'Tài chính cải thiện, được công nhận về tài chính.','Mất cơ hội tài chính, thiếu sự công nhận.','2025-04-13 20:00:21'),(139,28,4,'Sức khỏe tốt nhờ tinh thần chiến thắng.','Kiệt sức, thiếu năng lượng tích cực.','2025-04-13 20:00:21'),(140,28,5,'Tâm linh tiến bộ, vượt qua thử thách bằng niềm tin.','Mất niềm tin, tâm linh trì trệ.','2025-04-13 20:00:21'),(141,29,1,'Bảo vệ tình yêu, đứng vững trước thử thách.','Mất kiểm soát, để cảm xúc lấn át tình cảm.','2025-04-13 20:00:21'),(142,29,2,'Bảo vệ vị trí công việc, đối mặt với cạnh tranh.','Nghi ngờ bản thân, công việc bị đe dọa.','2025-04-13 20:00:21'),(143,29,3,'Bảo vệ tài chính, quản lý nguồn lực cẩn thận.','Mất mát tài chính, quản lý yếu kém.','2025-04-13 20:00:21'),(144,29,4,'Sức khỏe tốt nhờ kiên trì đối mặt thử thách.','Căng thẳng, suy giảm sức khỏe do áp lực.','2025-04-13 20:00:21'),(145,29,5,'Tâm linh kiên định, bảo vệ niềm tin bản thân.','Mất niềm tin, bị lung lay tâm linh.','2025-04-13 20:00:21'),(146,30,1,'Tình yêu tiến triển nhanh, cảm xúc dâng trào.','Trì trệ, thiếu giao tiếp trong mối quan hệ.','2025-04-13 20:00:21'),(147,30,2,'Công việc tiến triển nhanh, cơ hội đến bất ngờ.','Trì hoãn, công việc mất động lực.','2025-04-13 20:00:21'),(148,30,3,'Tài chính tăng trưởng nhanh, cơ hội đầu tư mới.','Mất cơ hội tài chính, trì hoãn đầu tư.','2025-04-13 20:00:21'),(149,30,4,'Sức khỏe tốt nhờ năng lượng mạnh mẽ.','Kiệt sức, thiếu nghỉ ngơi hợp lý.','2025-04-13 20:00:21'),(150,30,5,'Tâm linh phát triển nhanh, trực giác dẫn lối.','Mất phương hướng, tâm linh trì trệ.','2025-04-13 20:00:21'),(151,31,1,'Kiên trì trong tình yêu, vượt qua thử thách cảm xúc.','Sợ hãi tổn thương, phòng thủ quá mức.','2025-04-13 20:00:21'),(152,31,2,'Kiên trì trong công việc, chuẩn bị cho thành công.','Nghi ngờ bản thân, công việc căng thẳng.','2025-04-13 20:00:21'),(153,31,3,'Bảo vệ tài chính, kiên nhẫn chờ cơ hội.','Mất mát tài chính, lo lắng quá mức.','2025-04-13 20:00:21'),(154,31,4,'Sức khỏe ổn định nhờ kiên trì chăm sóc.','Căng thẳng, suy giảm sức khỏe do lo âu.','2025-04-13 20:00:21'),(155,31,5,'Tâm linh kiên định, vượt qua thử thách nội tâm.','Sợ hãi, mất niềm tin tâm linh.','2025-04-13 20:00:21'),(156,32,1,'Gánh nặng trong tình yêu, cần chia sẻ cảm xúc.','Kiệt sức, mối quan hệ quá áp lực.','2025-04-13 20:00:21'),(157,32,2,'Áp lực công việc lớn, cần giảm tải trách nhiệm.','Quá tải, công việc không hiệu quả.','2025-04-13 20:00:21'),(158,32,3,'Gánh nặng tài chính, cần quản lý tốt hơn.','Mất kiểm soát tài chính, chi tiêu quá mức.','2025-04-13 20:00:21'),(159,32,4,'Sức khỏe suy giảm do làm việc quá sức.','Kiệt sức, bỏ bê sức khỏe.','2025-04-13 20:00:21'),(160,32,5,'Tâm linh bị áp lực, cần tìm lại sự nhẹ nhàng.','Mất kết nối, tâm linh căng thẳng.','2025-04-13 20:00:21'),(161,33,1,'Tình yêu đầy nhiệt huyết, khám phá cảm xúc mới.','Thiếu kiên nhẫn, mối quan hệ hời hợt.','2025-04-13 20:00:21'),(162,33,2,'Cơ hội nghề nghiệp mới, tinh thần phiêu lưu.','Thiếu tập trung, công việc không ổn định.','2025-04-13 20:00:21'),(163,33,3,'Cơ hội tài chính mới, cần khám phá khôn ngoan.','Rủi ro tài chính, thiếu kế hoạch.','2025-04-13 20:00:21'),(164,33,4,'Sức khỏe tốt nhờ năng lượng trẻ trung.','Bất cẩn, bỏ qua chăm sóc sức khỏe.','2025-04-13 20:00:21'),(165,33,5,'Tâm linh tươi mới, khám phá niềm tin mới.','Mất phương hướng, thiếu kiên trì.','2025-04-13 20:00:21'),(166,34,1,'Tình yêu đam mê, hành động theo trái tim.','Hấp tấp, thiếu cân nhắc trong tình cảm.','2025-04-13 20:00:21'),(167,34,2,'Tiến bộ nhanh trong công việc, đầy nhiệt huyết.','Thiếu kế hoạch, công việc hỗn loạn.','2025-04-13 20:00:21'),(168,34,3,'Cơ hội tài chính đến nhanh, cần hành động.','Chi tiêu bốc đồng, đầu tư rủi ro.','2025-04-13 20:00:21'),(169,34,4,'Sức khỏe tốt nhờ năng lượng dồi dào.','Kiệt sức, thiếu nghỉ ngơi hợp lý.','2025-04-13 20:00:21'),(170,34,5,'Tâm linh phát triển qua hành động và đam mê.','Hấp tấp, mất kết nối tâm linh.','2025-04-13 20:00:21'),(171,35,1,'Tình yêu tự tin, thu hút bằng năng lượng tích cực.','Kiểm soát cảm xúc, thiếu chân thành.','2025-04-13 20:00:21'),(172,35,2,'Thành công nghề nghiệp nhờ sự tự tin và sáng tạo.','Thiếu kiên nhẫn, công việc bất ổn.','2025-04-13 20:00:21'),(173,35,3,'Tài chính ổn định nhờ quản lý năng động.','Chi tiêu quá mức, thiếu kiểm soát.','2025-04-13 20:00:21'),(174,35,4,'Sức khỏe tốt nhờ lối sống tích cực, tự tin.','Căng thẳng, bỏ bê sức khỏe.','2025-04-13 20:00:21'),(175,35,5,'Tâm linh mạnh mẽ, dẫn dắt bằng trực giác.','Mất kết nối, nghi ngờ bản thân.','2025-04-13 20:00:21'),(176,36,1,'Người dẫn dắt mối quan hệ bằng tầm nhìn và đam mê.','Áp đặt hoặc kiểm soát quá mức trong tình cảm.','2025-04-13 20:00:21'),(177,36,2,'Lãnh đạo mạnh mẽ, thành công nhờ tầm nhìn dài hạn.','Thiếu linh hoạt, áp lực từ kỳ vọng quá cao.','2025-04-13 20:00:21'),(178,36,3,'Quản lý tài chính vững vàng, đầu tư thông minh.','Tham vọng tài chính không thực tế, chi tiêu quá mức.','2025-04-13 20:00:21'),(179,36,4,'Sức khỏe ổn định nhờ lối sống năng động, tích cực.','Căng thẳng do làm việc quá sức, bỏ bê sức khỏe.','2025-04-13 20:00:21'),(180,36,5,'Tâm linh mạnh mẽ, dẫn dắt người khác bằng sự khôn ngoan.','Thiếu kết nối tâm linh, áp đặt niềm tin.','2025-04-13 20:00:21'),(181,37,1,'Tình yêu sâu sắc, kết nối cảm xúc mạnh mẽ.','Cô đơn, mất kết nối hoặc cảm xúc bị kìm nén.','2025-04-13 20:00:21'),(182,37,2,'Công việc mang lại niềm vui, sáng tạo từ cảm xúc.','Thiếu đam mê, công việc trở nên nhàm chán.','2025-04-13 20:00:21'),(183,37,3,'Tài chính ổn định, nhận được quà tặng bất ngờ.','Mất cân bằng tài chính, chi tiêu cảm tính.','2025-04-13 20:00:21'),(184,37,4,'Cân bằng cảm xúc, sức khỏe tinh thần tốt.','Lo âu, căng thẳng ảnh hưởng sức khỏe.','2025-04-13 20:00:21'),(185,37,5,'Trực giác nhạy bén, bình an nội tâm sâu sắc.','Mơ hồ, mất niềm tin vào con đường tâm linh.','2025-04-13 20:00:21'),(186,38,1,'Mối quan hệ hài hòa, tình yêu đôi lứa thắm thiết.','Mất cân bằng, mâu thuẫn trong tình cảm.','2025-04-13 20:00:21'),(187,38,2,'Hợp tác thành công, đội nhóm làm việc hiệu quả.','Thiếu đoàn kết, công việc gặp trở ngại.','2025-04-13 20:00:21'),(188,38,3,'Tài chính chia sẻ, hợp tác tài chính thành công.','Mâu thuẫn tài chính, chi tiêu không đồng thuận.','2025-04-13 20:00:21'),(189,38,4,'Sức khỏe tốt nhờ cảm xúc hài hòa.','Căng thẳng do mâu thuẫn cảm xúc.','2025-04-13 20:00:21'),(190,38,5,'Tâm linh hài hòa qua sự kết nối với người khác.','Mất kết nối, thiếu niềm tin tâm linh.','2025-04-13 20:00:21'),(191,39,1,'Tình yêu vui vẻ, tận hưởng niềm vui cùng bạn bè.','Cô lập, thiếu kết nối xã hội.','2025-04-13 20:00:21'),(192,39,2,'Thành công được ăn mừng, môi trường làm việc vui vẻ.','Thiếu đoàn kết, công việc thiếu niềm vui.','2025-04-13 20:00:21'),(193,39,3,'Tài chính ổn định, chia sẻ niềm vui tài chính.','Chi tiêu quá mức, tài chính bất ổn.','2025-04-13 20:00:21'),(194,39,4,'Sức khỏe tốt nhờ niềm vui và kết nối.','Căng thẳng do thiếu giao tiếp xã hội.','2025-04-13 20:00:21'),(195,39,5,'Tâm linh phát triển qua niềm vui và kết nối.','Mất kết nối, tâm linh cô đơn.','2025-04-13 20:00:21'),(196,40,1,'Tái đánh giá tình yêu, cần lắng nghe cảm xúc sâu sắc.','Chán nản, từ chối cơ hội tình cảm.','2025-04-13 20:00:21'),(197,40,2,'Tái đánh giá công việc, cần tìm lại động lực.','Mất hứng thú, bỏ qua cơ hội nghề nghiệp.','2025-04-13 20:00:21'),(198,40,3,'Tái đánh giá tài chính, cần tìm cơ hội mới.','Từ chối đầu tư, tài chính trì trệ.','2025-04-13 20:00:21'),(199,40,4,'Sức khỏe cần chăm sóc tinh thần, nghỉ ngơi nhiều hơn.','Bỏ bê sức khỏe, căng thẳng kéo dài.','2025-04-13 20:00:21'),(200,40,5,'Tâm linh cần nhìn lại, tìm kiếm ý nghĩa sâu sắc.','Mất niềm tin, từ chối khám phá tâm linh.','2025-04-13 20:00:21'),(201,41,1,'Mất mát trong tình yêu, tập trung vào điều đã mất.','Chấp nhận và chữa lành, tiến tới tình cảm mới.','2025-04-13 20:00:21'),(202,41,2,'Thất bại trong công việc, cần nhìn nhận lại.','Bám víu thất bại, từ chối cơ hội mới.','2025-04-13 20:00:21'),(203,41,3,'Mất mát tài chính, cần học từ sai lầm.','Tiếp tục thất bại, không chấp nhận thay đổi.','2025-04-13 20:00:21'),(204,41,4,'Sức khỏe tinh thần suy giảm, cần chữa lành.','Kháng cự chữa lành, căng thẳng kéo dài.','2025-04-13 20:00:21'),(205,41,5,'Tâm linh gặp khủng hoảng, cần tìm lại niềm tin.','Từ chối chữa lành, mất kết nối tâm linh.','2025-04-13 20:00:21'),(206,45,1,'Tình yêu mãn nguyện, tận hưởng niềm vui cảm xúc.','Thiếu hài lòng, mối quan hệ hời hợt.','2025-04-13 20:00:21'),(207,45,2,'Thành công nghề nghiệp, cảm giác thỏa mãn.','Thiếu động lực, công việc không trọn vẹn.','2025-04-13 20:00:21'),(208,45,3,'Tài chính dư dả, tận hưởng thành quả.','Chi tiêu quá mức, không hài lòng tài chính.','2025-04-13 20:00:21'),(209,45,4,'Sức khỏe tốt nhờ niềm vui và sự hài lòng.','Bỏ bê sức khỏe, thiếu cân bằng.','2025-04-13 20:00:21'),(210,45,5,'Tâm linh mãn nguyện, tìm thấy bình an nội tâm.','Mất niềm tin, thiếu kết nối tâm linh.','2025-04-13 20:00:21'),(211,46,1,'Tình yêu viên mãn, hạnh phúc gia đình trọn vẹn.','Mối quan hệ bất hòa, thiếu kết nối.','2025-04-13 20:00:21'),(212,46,2,'Thành công nghề nghiệp, đội nhóm hài hòa.','Thiếu đoàn kết, công việc mất cân bằng.','2025-04-13 20:00:21'),(213,46,3,'Tài chính ổn định, chia sẻ thành quả với người thân.','Mâu thuẫn tài chính, chi tiêu không đồng thuận.','2025-04-13 20:00:21'),(214,46,4,'Sức khỏe tốt nhờ hạnh phúc và kết nối.','Căng thẳng do bất hòa, sức khỏe suy giảm.','2025-04-13 20:00:21'),(215,46,5,'Tâm linh viên mãn, tìm thấy sự hòa hợp.','Mất kết nối, tâm linh bất ổn.','2025-04-13 20:00:21'),(216,47,1,'Tình yêu mới mẻ, cảm xúc trong sáng, lãng mạn.','Thiếu chân thành, cảm xúc hời hợt.','2025-04-13 20:00:21'),(217,47,2,'Cơ hội nghề nghiệp sáng tạo, tinh thần tươi mới.','Thiếu tập trung, công việc không ổn định.','2025-04-13 20:00:21'),(218,47,3,'Cơ hội tài chính nhỏ nhưng đầy hứa hẹn.','Chi tiêu bốc đồng, thiếu kế hoạch.','2025-04-13 20:00:21'),(219,47,4,'Sức khỏe tốt nhờ tinh thần lạc quan, trẻ trung.','Bất cẩn, bỏ qua chăm sóc sức khỏe.','2025-04-13 20:00:21'),(220,47,5,'Tâm linh trong sáng, khám phá trực giác mới.','Mất phương hướng, thiếu kiên trì.','2025-04-13 20:00:21'),(221,48,1,'Tình yêu lãng mạn, hành động theo trái tim.','Ảo tưởng, thiếu thực tế trong tình cảm.','2025-04-13 20:00:21'),(222,48,2,'Công việc sáng tạo, theo đuổi đam mê.','Phân tâm, thiếu quyết đoán trong công việc.','2025-04-13 20:00:21'),(223,48,3,'Cơ hội tài chính đến từ trực giác, cần hành động.','Chi tiêu cảm tính, đầu tư không hiệu quả.','2025-04-13 20:00:21'),(224,48,4,'Sức khỏe tốt nhờ cảm xúc tích cực.','Căng thẳng do mơ mộng, thiếu nghỉ ngơi.','2025-04-13 20:00:21'),(225,48,5,'Tâm linh phát triển qua trực giác và đam mê.','Mơ hồ, mất kết nối tâm linh.','2025-04-13 20:00:21'),(226,49,1,'Tình yêu sâu sắc, chăm sóc và hỗ trợ cảm xúc.','Phụ thuộc cảm xúc, bỏ bê bản thân.','2025-04-13 20:00:21'),(227,49,2,'Công việc sáng tạo, hỗ trợ đội nhóm bằng trực giác.','Thiếu quyết đoán, để cảm xúc lấn át.','2025-04-13 20:00:21'),(228,49,3,'Tài chính ổn định nhờ quản lý trực giác.','Chi tiêu cảm tính, thiếu kiểm soát.','2025-04-13 20:00:21'),(229,49,4,'Sức khỏe tốt nhờ chăm sóc tinh thần chu đáo.','Căng thẳng do lo lắng quá mức.','2025-04-13 20:00:21'),(230,49,5,'Tâm linh sâu sắc, dẫn dắt bằng trực giác.','Mất kết nối, nghi ngờ bản thân.','2025-04-13 20:00:21'),(231,50,1,'Người yêu thương sâu sắc, hỗ trợ cảm xúc vững vàng.','Kiểm soát cảm xúc hoặc phụ thuộc vào người khác.','2025-04-13 20:00:21'),(232,50,2,'Lãnh đạo bằng lòng trắc ẩn, xây dựng đội nhóm tốt.','Thiếu quyết đoán, để cảm xúc cản trở công việc.','2025-04-13 20:00:21'),(233,50,3,'Quản lý tài chính dựa trên trực giác, ổn định lâu dài.','Chi tiêu cảm tính, thiếu kế hoạch tài chính.','2025-04-13 20:00:21'),(234,50,4,'Sức khỏe tốt nhờ chăm sóc tinh thần và cảm xúc.','Căng thẳng do lo lắng quá nhiều cho người khác.','2025-04-13 20:00:21'),(235,50,5,'Sâu sắc tâm linh, dẫn dắt bằng lòng trắc ẩn.','Mất kết nối tâm linh, nghi ngờ trực giác.','2025-04-13 20:00:21'),(236,51,1,'Sự rõ ràng trong tình cảm, giao tiếp chân thành.','Hiểu lầm hoặc tranh cãi làm tổn thương mối quan hệ.','2025-04-13 20:00:21'),(237,51,2,'Ý tưởng sáng tạo, quyết định nghề nghiệp rõ ràng.','Tư duy tiêu cực, thiếu tập trung vào công việc.','2025-04-13 20:00:21'),(238,51,3,'Minh bạch tài chính, đưa ra quyết định sáng suốt.','Lừa dối hoặc nhầm lẫn trong quản lý tiền bạc.','2025-04-13 20:00:21'),(239,51,4,'Tinh thần minh mẫn, sức khỏe cải thiện nhờ tư duy tích cực.','Lo âu, suy nghĩ quá mức gây căng thẳng.','2025-04-13 20:00:21'),(240,51,5,'Trực giác sắc bén, khám phá sự thật tâm linh.','Mơ hồ, nghi ngờ bản thân hoặc sự thật.','2025-04-13 20:00:21'),(241,52,1,'Cân nhắc trong tình yêu, cần đưa ra lựa chọn khó khăn.','Do dự, mâu thuẫn nội tâm trong tình cảm.','2025-04-13 20:00:21'),(242,52,2,'Tạm dừng công việc, cần cân nhắc hướng đi.','Mắc kẹt, không quyết đoán trong sự nghiệp.','2025-04-13 20:00:21'),(243,52,3,'Tài chính cần cân nhắc, tránh quyết định vội vàng.','Che giấu vấn đề tài chính, do dự.','2025-04-13 20:00:21'),(244,52,4,'Sức khỏe tinh thần cần nghỉ ngơi, tránh căng thẳng.','Căng thẳng kéo dài, mất ngủ.','2025-04-13 20:00:21'),(245,52,5,'Tâm linh cần nhìn nhận lại, giải quyết mâu thuẫn nội tâm.','Mất phương hướng, thiếu niềm tin.','2025-04-13 20:00:21'),(246,53,1,'Đau lòng trong tình yêu, tổn thương cảm xúc sâu sắc.','Chấp nhận và chữa lành, tiến tới tình cảm mới.','2025-04-13 20:00:21'),(247,53,2,'Thất bại trong công việc, cần vượt qua nỗi đau.','Bám víu thất bại, từ chối tiến lên.','2025-04-13 20:00:21'),(248,53,3,'Mất mát tài chính, cần học từ sai lầm.','Tiếp tục thất bại, không chấp nhận thay đổi.','2025-04-13 20:00:21'),(249,53,4,'Sức khỏe tinh thần suy giảm, cần chữa lành.','Kháng cự chữa lành, căng thẳng kéo dài.','2025-04-13 20:00:21'),(250,53,5,'Tâm linh gặp khủng hoảng, cần tìm lại niềm tin.','Từ chối chữa lành, mất kết nối tâm linh.','2025-04-13 20:00:21'),(251,54,1,'Nghỉ ngơi trong tình yêu, cần thời gian để chữa lành.','Cô lập cảm xúc, từ chối giao tiếp.','2025-04-13 20:00:21'),(252,54,2,'Tạm nghỉ công việc, cần thời gian để tái tạo.','Trì trệ, không hành động trong sự nghiệp.','2025-04-13 20:00:21'),(253,54,3,'Tạm dừng tài chính, cần đánh giá lại nguồn lực.','Trì hoãn đầu tư, thiếu kế hoạch.','2025-04-13 20:00:21'),(254,54,4,'Sức khỏe cần nghỉ ngơi, tập trung vào phục hồi.','Bỏ bê sức khỏe, căng thẳng kéo dài.','2025-04-13 20:00:21'),(255,54,5,'Tâm linh cần tĩnh lặng, tìm lại sự cân bằng.','Mất kết nối, từ chối khám phá tâm linh.','2025-04-13 20:00:21'),(256,55,1,'Xung đột trong tình yêu, chiến thắng bằng mọi giá.','Thất bại, mâu thuẫn kéo dài trong tình cảm.','2025-04-13 20:00:21'),(257,55,2,'Cạnh tranh không lành mạnh trong công việc, cần hòa giải.','Thất bại, xung đột nhóm kéo dài.','2025-04-13 20:00:21'),(258,55,3,'Mất mát tài chính do xung đột, cần quản lý tốt hơn.','Chi tiêu hỗn loạn, mất kiểm soát tài chính.','2025-04-13 20:00:21'),(259,55,4,'Căng thẳng tinh thần, cần thư giãn để cải thiện sức khỏe.','Căng thẳng kéo dài, sức khỏe suy giảm.','2025-04-13 20:00:21'),(260,55,5,'Thử thách tâm linh, cần vượt qua xung đột nội tâm.','Mất phương hướng, đấu tranh tâm linh.','2025-04-13 20:00:21'),(261,56,1,'Vượt qua khó khăn trong tình yêu, tìm lại bình yên.','Bám víu đau khổ, trì hoãn chữa lành.','2025-04-13 20:00:21'),(262,56,2,'Chuyển đổi công việc, rời bỏ khó khăn cũ.','Kháng cự thay đổi, công việc trì trệ.','2025-04-13 20:00:21'),(263,56,3,'Tài chính cải thiện, vượt qua giai đoạn khó khăn.','Mất mát tài chính, không chấp nhận thay đổi.','2025-04-13 20:00:21'),(264,56,4,'Sức khỏe phục hồi, cần thay đổi môi trường.','Bỏ bê sức khỏe, trì hoãn chữa lành.','2025-04-13 20:00:21'),(265,56,5,'Tâm linh tiến triển qua việc buông bỏ quá khứ.','Mất kết nối, từ chối chữa lành tâm linh.','2025-04-13 20:00:21'),(266,57,1,'Che giấu cảm xúc trong tình yêu, cần trung thực.','Lừa dối, thiếu chân thành trong tình cảm.','2025-04-13 20:00:21'),(267,57,2,'Chiến lược trong công việc, cần trung thực với bản thân.','Lừa dối, thiếu đạo đức trong sự nghiệp.','2025-04-13 20:00:21'),(268,57,3,'Tài chính cần minh bạch, tránh hành động mờ ám.','Lừa dối tài chính, mất mát do sai lầm.','2025-04-13 20:00:21'),(269,57,4,'Sức khỏe tinh thần cần chú ý, tránh căng thẳng.','Lo âu, bỏ qua tín hiệu sức khỏe.','2025-04-13 20:00:21'),(270,57,5,'Tâm linh cần sự trung thực, khám phá sự thật.','Mất niềm tin, che giấu sự thật tâm linh.','2025-04-13 20:00:21'),(271,58,1,'Cảm thấy mắc kẹt trong tình yêu, cần tự giải phóng.','Sợ hãi, không dám đối mặt vấn đề tình cảm.','2025-04-13 20:00:21'),(272,58,2,'Công việc bị hạn chế, cần tìm cách vượt qua rào cản.','Tự giới hạn, công việc trì trệ.','2025-04-13 20:00:21'),(273,58,3,'Tài chính bị mắc kẹt, cần tìm giải pháp mới.','Sợ rủi ro, trì hoãn đầu tư.','2025-04-13 20:00:21'),(274,58,4,'Sức khỏe tinh thần suy giảm, cần thư giãn và giải phóng.','Căng thẳng kéo dài, bỏ bê sức khỏe.','2025-04-13 20:00:21'),(275,58,5,'Tâm linh bị giới hạn, cần tự do khám phá.','Mất kết nối, sợ hãi điều chưa biết.','2025-04-13 20:00:21'),(276,59,1,'Lo âu trong tình yêu, cần đối mặt với nỗi sợ.','Căng thẳng kéo dài, mất niềm tin tình cảm.','2025-04-13 20:00:21'),(277,59,2,'Áp lực công việc, cần vượt qua lo lắng.','Sợ thất bại, công việc trì trệ.','2025-04-13 20:00:21'),(278,59,3,'Lo âu tài chính, cần quản lý tốt hơn.','Mất kiểm soát tài chính, chi tiêu bốc đồng.','2025-04-13 20:00:21'),(279,59,4,'Sức khỏe tinh thần suy giảm, cần chữa lành lo âu.','Căng thẳng nghiêm trọng, mất ngủ.','2025-04-13 20:00:21'),(280,59,5,'Tâm linh gặp khủng hoảng, cần đối mặt với nỗi sợ.','Mất niềm tin, từ chối khám phá tâm linh.','2025-04-13 20:00:21'),(281,60,1,'Kết thúc đau đớn trong tình yêu, cần chữa lành.','Trì hoãn chia tay, kéo dài đau khổ.','2025-04-13 20:00:21'),(282,60,2,'Thất bại lớn trong công việc, cần bắt đầu lại.','Bám víu thất bại, từ chối thay đổi.','2025-04-13 20:00:21'),(283,60,3,'Mất mát tài chính nghiêm trọng, cần xây dựng lại.','Tiếp tục thất bại, không chấp nhận thay đổi.','2025-04-13 20:00:21'),(284,60,4,'Sức khỏe suy kiệt, cần phục hồi tinh thần.','Kháng cự chữa lành, sức khỏe nghiêm trọng.','2025-04-13 20:00:21'),(285,60,5,'Tâm linh khủng hoảng, cần tìm lại niềm tin.','Mất kết nối, từ chối chữa lành tâm linh.','2025-04-13 20:00:21'),(286,61,1,'Tình yêu giao tiếp rõ ràng, tinh thần tò mò.','Thiếu chân thành, giao tiếp hời hợt.','2025-04-13 20:00:21'),(287,61,2,'Cơ hội nghề nghiệp mới, tinh thần học hỏi.','Thiếu tập trung, công việc không ổn định.','2025-04-13 20:00:21'),(288,61,3,'Cơ hội tài chính nhỏ, cần phân tích kỹ.','Chi tiêu bốc đồng, thiếu kế hoạch.','2025-04-13 20:00:21'),(289,61,4,'Sức khỏe tốt nhờ tinh thần minh mẫn.','Bất cẩn, bỏ qua chăm sóc sức khỏe.','2025-04-13 20:00:21'),(290,61,5,'Tâm linh tò mò, khám phá sự thật mới.','Mất phương hướng, thiếu kiên trì.','2025-04-13 20:00:21'),(291,62,1,'Tình yêu hành động nhanh, giao tiếp quyết đoán.','Hấp tấp, tranh cãi trong tình cảm.','2025-04-13 20:00:21'),(292,62,2,'Công việc tiến triển nhanh, đầy tham vọng.','Thiếu kế hoạch, công việc hỗn loạn.','2025-04-13 20:00:21'),(293,62,3,'Cơ hội tài chính đến nhanh, cần phân tích.','Chi tiêu bốc đồng, đầu tư rủi ro.','2025-04-13 20:00:21'),(294,62,4,'Sức khỏe tốt nhờ năng lượng tinh thần cao.','Căng thẳng do làm quá sức.','2025-04-13 20:00:21'),(295,62,5,'Tâm linh phát triển qua tư duy sắc bén.','Hấp tấp, mất kết nối tâm linh.','2025-04-13 20:00:21'),(296,63,1,'Tình yêu rõ ràng, dựa trên sự trung thực và lý trí.','Lạnh lùng, phê phán quá mức trong tình cảm.','2025-04-13 20:00:21'),(297,63,2,'Công việc thành công nhờ tư duy sắc bén.','Độc đoán, thiếu linh hoạt trong công việc.','2025-04-13 20:00:21'),(298,63,3,'Tài chính ổn định nhờ quản lý logic.','Tính toán quá mức, bỏ qua cơ hội.','2025-04-13 20:00:21'),(299,63,4,'Sức khỏe tốt nhờ tư duy rõ ràng, kỷ luật.','Căng thẳng do suy nghĩ quá nhiều.','2025-04-13 20:00:21'),(300,63,5,'Tâm linh sâu sắc, tìm kiếm sự thật bằng lý trí.','Mất niềm tin, áp đặt quan điểm.','2025-04-13 20:00:21'),(301,64,1,'Giao tiếp rõ ràng, xây dựng mối quan hệ dựa trên lý trí.','Lạnh lùng hoặc phê phán quá mức trong tình cảm.','2025-04-13 20:00:21'),(302,64,2,'Lãnh đạo công bằng, đưa ra quyết định dựa trên logic.','Độc đoán, thiếu linh hoạt trong công việc.','2025-04-13 20:00:21'),(303,64,3,'Quản lý tài chính chặt chẽ, đầu tư dựa trên phân tích.','Tính toán quá mức, bỏ qua cơ hội tài chính.','2025-04-13 20:00:21'),(304,64,4,'Sức khỏe ổn định nhờ tư duy rõ ràng, kỷ luật.','Căng thẳng tinh thần do suy nghĩ quá nhiều.','2025-04-13 20:00:21'),(305,64,5,'Khám phá tâm linh qua lý trí, tìm kiếm sự thật.','Thiếu niềm tin, áp đặt quan điểm tâm linh.','2025-04-13 20:00:21'),(306,65,1,'Mối quan hệ ổn định, xây dựng dựa trên sự an toàn.','Thiếu đầu tư cảm xúc, mối quan hệ hời hợt.','2025-04-13 20:00:21'),(307,65,2,'Cơ hội công việc mới, tiềm năng phát triển lâu dài.','Mất cơ hội nghề nghiệp do do dự.','2025-04-13 20:00:21'),(308,65,3,'Tài chính dồi dào, khởi đầu đầu tư thành công.','Thất bại tài chính, đầu tư không hiệu quả.','2025-04-13 20:00:21'),(309,65,4,'Sức khỏe tốt nhờ lối sống ổn định, thực tế.','Thiếu chăm sóc cơ thể, bỏ bê sức khỏe.','2025-04-13 20:00:21'),(310,65,5,'Tìm kiếm ý nghĩa vật chất trong tâm linh, ổn định nội tâm.','Mất kết nối tâm linh, tập trung quá vào vật chất.','2025-04-13 20:00:21'),(311,66,1,'Cân bằng cảm xúc và trách nhiệm trong tình yêu.','Mất cân bằng, mâu thuẫn trong tình cảm.','2025-04-13 20:00:21'),(312,66,2,'Cân bằng công việc và cuộc sống, quản lý thời gian tốt.','Quá tải, công việc mất cân bằng.','2025-04-13 20:00:21'),(313,66,3,'Cân bằng tài chính, quản lý nguồn lực hiệu quả.','Chi tiêu hỗn loạn, tài chính bất ổn.','2025-04-13 20:00:21'),(314,66,4,'Sức khỏe tốt nhờ cân bằng lối sống.','Căng thẳng do mất cân bằng, sức khỏe suy giảm.','2025-04-13 20:00:21'),(315,66,5,'Tâm linh cân bằng, tìm ý nghĩa qua sự ổn định.','Mất kết nối, thiếu niềm tin tâm linh.','2025-04-13 20:00:21'),(316,67,1,'Mối quan hệ phát triển nhờ hợp tác và nỗ lực.','Thiếu hợp tác, mối quan hệ trì trệ.','2025-04-13 20:00:21'),(317,67,2,'Thành công nhờ làm việc nhóm và kỹ năng.','Thiếu đoàn kết, công việc không hiệu quả.','2025-04-13 20:00:21'),(318,67,3,'Tài chính tăng trưởng nhờ hợp tác và nỗ lực.','Mất cơ hội tài chính, thiếu phối hợp.','2025-04-13 20:00:21'),(319,67,4,'Sức khỏe tốt nhờ làm việc nhóm và chăm chỉ.','Căng thẳng do làm việc quá sức.','2025-04-13 20:00:21'),(320,67,5,'Tâm linh phát triển qua sự hợp tác và học hỏi.','Mất kết nối, thiếu niềm tin tâm linh.','2025-04-13 20:00:21'),(321,68,1,'Tình yêu ổn định, bảo vệ cảm xúc và trách nhiệm.','Kiểm soát quá mức, thiếu tự do trong tình cảm.','2025-04-13 20:00:21'),(322,68,2,'Công việc ổn định, bảo vệ thành quả đạt được.','Bảo thủ, từ chối cơ hội mới.','2025-04-13 20:00:21'),(323,68,3,'Tài chính an toàn, tích lũy ổn định.','Tham lam, bỏ qua cơ hội đầu tư.','2025-04-13 20:00:21'),(324,68,4,'Sức khỏe tốt nhờ lối sống ổn định, an toàn.','Căng thẳng do lo lắng quá mức.','2025-04-13 20:00:21'),(325,68,5,'Tâm linh ổn định, tìm ý nghĩa qua sự an toàn.','Mất kết nối, tập trung quá vào vật chất.','2025-04-13 20:00:21'),(326,69,1,'Khó khăn trong tình yêu, thiếu sự hỗ trợ.','Chấp nhận và tìm kiếm sự giúp đỡ.','2025-04-13 20:00:21'),(327,69,2,'Thất bại trong công việc, cần tìm hỗ trợ.','Bám víu thất bại, từ chối giúp đỡ.','2025-04-13 20:00:21'),(328,69,3,'Mất mát tài chính, cần tìm nguồn lực mới.','Tiếp tục thất bại, không chấp nhận hỗ trợ.','2025-04-13 20:00:21'),(329,69,4,'Sức khỏe suy giảm, cần chăm sóc nhiều hơn.','Bỏ bê sức khỏe, kháng cự chữa lành.','2025-04-13 20:00:21'),(330,69,5,'Tâm linh gặp khó khăn, cần tìm lại niềm tin.','Mất kết nối, từ chối hỗ trợ tâm linh.','2025-04-13 20:00:21'),(331,70,1,'Tình yêu chia sẻ, hỗ trợ lẫn nhau về cảm xúc.','Mất cân bằng, phụ thuộc trong tình cảm.','2025-04-13 20:00:21'),(332,70,2,'Hợp tác công việc thành công, chia sẻ thành quả.','Thiếu công bằng, công việc mất cân đối.','2025-04-13 20:00:21'),(333,70,3,'Tài chính hài hòa, chia sẻ nguồn lực.','Tham lam, chi tiêu không công bằng.','2025-04-13 20:00:21'),(334,70,4,'Sức khỏe tốt nhờ sự hỗ trợ và cân bằng.','Căng thẳng do mất cân bằng.','2025-04-13 20:00:21'),(335,70,5,'Tâm linh phát triển qua sự chia sẻ và hỗ trợ.','Mất kết nối, thiếu niềm tin tâm linh.','2025-04-13 20:00:21'),(336,71,1,'Tái đánh giá tình yêu, cần kiên nhẫn xây dựng.','Thiếu kiên nhẫn, mối quan hệ trì trệ.','2025-04-13 20:00:21'),(337,71,2,'Tái đánh giá công việc, cần chờ đợi kết quả.','Mất động lực, công việc không tiến triển.','2025-04-13 20:00:21'),(338,71,3,'Tái đánh giá tài chính, cần kiên nhẫn đầu tư.','Do dự, bỏ qua cơ hội tài chính.','2025-04-13 20:00:21'),(339,71,4,'Sức khỏe cần chăm sóc lâu dài, kiên trì.','Bỏ bê sức khỏe, thiếu kiên nhẫn.','2025-04-13 20:00:21'),(340,71,5,'Tâm linh cần kiên nhẫn, tìm kiếm ý nghĩa sâu sắc.','Mất niềm tin, thiếu kiên trì tâm linh.','2025-04-13 20:00:21'),(341,72,1,'Tình yêu phát triển nhờ nỗ lực và chăm chỉ.','Thiếu nỗ lực, mối quan hệ hời hợt.','2025-04-13 20:00:21'),(342,72,2,'Thành công nhờ kỹ năng và sự tập trung.','Lười biếng, công việc không hiệu quả.','2025-04-13 20:00:21'),(343,72,3,'Tài chính tăng trưởng nhờ làm việc chăm chỉ.','Mất cơ hội tài chính, thiếu nỗ lực.','2025-04-13 20:00:21'),(344,72,4,'Sức khỏe tốt nhờ lối sống kỷ luật, chăm chỉ.','Bỏ bê sức khỏe, làm việc quá sức.','2025-04-13 20:00:21'),(345,72,5,'Tâm linh phát triển qua sự chăm chỉ và học hỏi.','Mất kết nối, thiếu nỗ lực tâm linh.','2025-04-13 20:00:21'),(346,73,1,'Tình yêu tự lập, tận hưởng sự an toàn cảm xúc.','Phụ thuộc vật chất, thiếu tự do.','2025-04-13 20:00:21'),(347,73,2,'Thành công nghề nghiệp, tự hào về thành quả.','Thiếu hài lòng, công việc không trọn vẹn.','2025-04-13 20:00:21'),(348,73,3,'Tài chính dư dả, tận hưởng sự độc lập.','Chi tiêu quá mức, không hài lòng.','2025-04-13 20:00:21'),(349,73,4,'Sức khỏe tốt nhờ lối sống thoải mái, dư dả.','Bỏ bê sức khỏe, thiếu cân bằng.','2025-04-13 20:00:21'),(350,73,5,'Tâm linh mãn nguyện, tìm thấy bình an vật chất.','Mất kết nối, tập trung quá vào vật chất.','2025-04-13 20:00:21'),(351,74,1,'Tình yêu bền vững, xây dựng gia đình hạnh phúc.','Mâu thuẫn gia đình, thiếu kết nối.','2025-04-13 20:00:21'),(352,74,2,'Thành công nghề nghiệp lâu dài, ổn định.','Thiếu đoàn kết, công việc mất cân bằng.','2025-04-13 20:00:21'),(353,74,3,'Tài chính bền vững, chia sẻ với người thân.','Tham lam, chi tiêu không đồng thuận.','2025-04-13 20:00:21'),(354,74,4,'Sức khỏe tốt nhờ sự ổn định và hỗ trợ.','Căng thẳng do bất hòa, sức khỏe suy giảm.','2025-04-13 20:00:21'),(355,74,5,'Tâm linh viên mãn, tìm ý nghĩa qua sự ổn định.','Mất kết nối, thiếu niềm tin tâm linh.','2025-04-13 20:00:21'),(356,75,1,'Tình yêu thực tế, học hỏi để xây dựng mối quan hệ.','Thiếu kiên nhẫn, mối quan hệ hời hợt.','2025-04-13 20:00:21'),(357,75,2,'Cơ hội nghề nghiệp mới, tinh thần học hỏi.','Thiếu tập trung, công việc không ổn định.','2025-04-13 20:00:21'),(358,75,3,'Cơ hội tài chính nhỏ, cần chăm chỉ.','Chi tiêu bốc đồng, thiếu kế hoạch.','2025-04-13 20:00:21'),(359,75,4,'Sức khỏe tốt nhờ tinh thần thực tế.','Bất cẩn, bỏ qua chăm sóc sức khỏe.','2025-04-13 20:00:21'),(360,75,5,'Tâm linh thực tế, khám phá ý nghĩa mới.','Mất phương hướng, thiếu kiên trì.','2025-04-13 20:00:21'),(361,76,1,'Tình yêu ổn định, hành động để xây dựng tương lai.','Chậm chạp, thiếu cam kết trong tình cảm.','2025-04-13 20:00:21'),(362,76,2,'Công việc tiến triển ổn định, chăm chỉ đạt kết quả.','Lười biếng, công việc trì trệ.','2025-04-13 20:00:21'),(363,76,3,'Tài chính tăng trưởng chậm nhưng chắc chắn.','Do dự, bỏ qua cơ hội đầu tư.','2025-04-13 20:00:21'),(364,76,4,'Sức khỏe tốt nhờ lối sống kỷ luật, chăm chỉ.','Bỏ bê sức khỏe, làm việc quá sức.','2025-04-13 20:00:21'),(365,76,5,'Tâm linh phát triển qua sự chăm chỉ và thực tế.','Mất kết nối, thiếu nỗ lực tâm linh.','2025-04-13 20:00:21'),(366,77,1,'Tình yêu nuôi dưỡng, hỗ trợ lẫn nhau về tài chính.','Phụ thuộc vật chất, thiếu tự do.','2025-04-13 20:00:21'),(367,77,2,'Thành công nhờ chăm chỉ, quản lý tốt.','Lười biếng, thiếu trách nhiệm trong công việc.','2025-04-13 20:00:21'),(368,77,3,'Tài chính dư dả, quản lý thông minh.','Chi tiêu hoang phí, thiếu kiểm soát.','2025-04-13 20:00:21'),(369,77,4,'Sức khỏe tốt nhờ lối sống lành mạnh.','Bỏ bê sức khỏe, căng thẳng tài chính.','2025-04-13 20:00:21'),(370,77,5,'Tâm linh thực tế, tìm ý nghĩa qua sự ổn định.','Mất kết nối, tập trung quá vào vật chất.','2025-04-13 20:00:21'),(371,78,1,'Mối quan hệ bền vững, hỗ trợ lẫn nhau về tài chính.','Kiểm soát hoặc phụ thuộc tài chính trong tình cảm.','2025-04-13 20:00:21'),(372,78,2,'Thành công nghề nghiệp nhờ quản lý và kế hoạch tốt.','Tham vọng quá mức, bỏ qua giá trị con người.','2025-04-13 20:00:21'),(373,78,3,'Tài chính vững chắc, đầu tư khôn ngoan, lâu dài.','Tham lam hoặc bảo thủ trong quản lý tiền bạc.','2025-04-13 20:00:21'),(374,78,4,'Sức khỏe tốt nhờ lối sống kỷ luật, chăm chỉ.','Căng thẳng do áp lực tài chính hoặc công việc.','2025-04-13 20:00:21'),(375,78,5,'Tâm linh thực tế, tìm ý nghĩa qua sự ổn định.','Thiếu kết nối tâm linh, chỉ tập trung vào vật chất.','2025-04-13 20:00:21');
/*!40000 ALTER TABLE `tarot_card_meanings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarot_cards`
--

DROP TABLE IF EXISTS `tarot_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarot_cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arcana` enum('Major','Minor') COLLATE utf8mb4_unicode_ci NOT NULL,
  `suit` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` int DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `general_upright_meaning` text COLLATE utf8mb4_unicode_ci,
  `general_reversed_meaning` text COLLATE utf8mb4_unicode_ci,
  `story` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarot_cards`
--

LOCK TABLES `tarot_cards` WRITE;
/*!40000 ALTER TABLE `tarot_cards` DISABLE KEYS */;
INSERT INTO `tarot_cards` VALUES (1,'Kẻ Ngốc','Major',NULL,1,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522725/TheFool_ewfg71.png','Một người lữ hành trẻ tuổi đứng trên bờ vực, tay cầm gậy với túi hành lý nhỏ, một con chó nhảy lên chân anh ta. Bầu trời sáng và đầy năng lượng, thể hiện sự khởi đầu mới.','Ý nghĩa chung của The Fool là sự tự do, sự khám phá và lòng tin. Nó biểu thị cơ hội mới và khả năng mở ra những chân trời mới.','Khi ngược, lá bài này biểu thị sự thiếu suy nghĩ, sợ hãi hoặc khởi đầu không ổn định. Nó cảnh báo bạn cần cẩn trọng với các quyết định.','The Fool đại diện cho sự khởi đầu, hành trình mới và tiềm năng vô tận. Lá bài này khuyến khích bạn dấn thân vào những điều chưa biết với lòng tin và sự tò mò.','2025-04-13 19:30:04'),(2,'Nhà Ảo Thuật','Major',NULL,2,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522729/TheMagician_fqzyrb.png','Một pháp sư đứng trước bàn đầy các biểu tượng của bốn nguyên tố (Cốc, Kiếm, Gậy, Đồng xu). Phía trên đầu là dấu vô cực, tay chỉ lên trời và tay kia chỉ xuống đất.','Ý nghĩa chung của The Magician là sự tự tin, sáng tạo và khả năng kiểm soát để đạt được mục tiêu.','Khi ngược, lá bài này biểu thị sự lừa dối, thiếu tập trung hoặc cảm giác bất lực trong việc biến ý tưởng thành hiện thực.','The Magician tượng trưng cho sự sáng tạo và khả năng biến ý tưởng thành hiện thực. Lá bài này nhắc nhở bạn tận dụng nguồn lực và sức mạnh nội tại.','2025-04-13 19:30:04'),(3,'Nữ Tư Tế Cấp Cao','Major',NULL,3,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522727/TheHighPriestess_epsoay.png','Một phụ nữ ngồi trên ngai, giữa hai cột đen và trắng, tay cầm cuộn sách Torah. Mặt trăng khuyết dưới chân, biểu thị sự bí ẩn và tri thức sâu sắc.','Ý nghĩa chung của The High Priestess là trực giác, sự hiểu biết sâu sắc và sự cân bằng giữa hai mặt của cuộc sống.','Khi ngược, lá bài này biểu thị sự mất kết nối với trực giác, thiếu cân bằng hoặc bí mật bị lộ.','The High Priestess đại diện cho trí tuệ nội tại và sự kết nối với tâm linh. Lá bài khuyến khích bạn lắng nghe trực giác và khám phá những bí mật trong tâm hồn.','2025-04-13 19:30:04'),(4,'Nữ Hoàng','Major',NULL,4,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522725/TheEmpress_zszjpa.png','Một phụ nữ xinh đẹp đội vương miện sao, ngồi trên ngai được bao quanh bởi thiên nhiên tươi tốt, dòng sông chảy qua và cánh đồng đầy lúa mì.','Ý nghĩa chung của The Empress là sự phong phú, thịnh vượng và tình yêu vô điều kiện. Nó khuyến khích bạn nuôi dưỡng bản thân và những người xung quanh.','Khi ngược, lá bài này biểu thị sự mất cân bằng trong việc nuôi dưỡng hoặc sự thiếu sáng tạo.','The Empress là biểu tượng của sự phong phú, tình yêu và sự nuôi dưỡng. Lá bài này nhắc nhở bạn kết nối với thiên nhiên và năng lượng sáng tạo.','2025-04-13 19:30:04'),(5,'Hoàng Đế','Major',NULL,5,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522745/TheEmperor_y1vfjk.png',' Một vị vua ngồi trên ngai vàng được trang trí bằng đầu cừu đực, tay cầm quyền trượng và quả cầu. Cảnh nền là những dãy núi hiểm trở, biểu thị sức mạnh và quyền lực.','Ý nghĩa chung của The Emperor là sự lãnh đạo, kiểm soát và khả năng đưa ra các quyết định chiến lược dài hạn.','Khi ngược, lá bài này biểu thị sự kiểm soát thái quá, cứng nhắc hoặc cảm giác mất quyền lực.','The Emperor đại diện cho quyền lực, sự ổn định và trật tự. Lá bài khuyến khích bạn sử dụng trí tuệ và kỷ luật để xây dựng nền tảng vững chắc.','2025-04-13 19:30:04'),(6,'Giáo Hoàng','Major',NULL,6,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522726/TheHierophant_n4buj1.png','Một linh mục ngồi giữa hai tín đồ, cầm cây thánh giá ba tầng và ban phước lành. Hai chiếc chìa khóa đan chéo dưới chân ông, biểu tượng cho tri thức tâm linh và thế tục.','Ý nghĩa chung của The Hierophant là kiến thức, sự khôn ngoan và sự hỗ trợ từ những nguồn lực bên ngoài.','Khi ngược, lá bài này biểu thị sự nổi loạn, không tuân theo truyền thống hoặc cảm giác bị hạn chế bởi các quy tắc cứng nhắc.','The Hierophant biểu thị sự truyền thống, giáo dục và sự hướng dẫn. Lá bài khuyến khích bạn học hỏi từ các bậc thầy và tuân theo những giá trị lâu đời.','2025-04-13 19:30:04'),(7,'Những Người Yêu Nhau','Major',NULL,7,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522728/TheLovers_wwajq8.png','Một người đàn ông và một người phụ nữ đứng dưới một thiên thần có cánh đang chúc phúc. Cây cối và ngọn núi phía sau tượng trưng cho sự lựa chọn và tình yêu.','Ý nghĩa chung của The Lovers là mối quan hệ hài hòa, sự cam kết và trách nhiệm trong các quyết định tình cảm hoặc cuộc sống.','Khi ngược, lá bài này biểu thị sự chia rẽ, xung đột hoặc quyết định sai lầm. Nó nhắc nhở bạn về tầm quan trọng của việc cân bằng và sự hòa hợp.','The Lovers đại diện cho sự kết nối sâu sắc, tình yêu và sự lựa chọn có ý nghĩa. Lá bài nhắc nhở bạn rằng mọi quyết định đều có tác động đến con đường phía trước.','2025-04-13 19:30:04'),(8,'Cỗ Xe','Major',NULL,8,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522742/TheChariot_xliwry.png','Một chiến binh đứng trên cỗ xe do hai con nhân sư kéo đi, một con đen và một con trắng, biểu thị sự kiểm soát và sức mạnh điều hướng.','Ý nghĩa chung của The Chariot là sự chiến thắng thông qua nỗ lực và kiểm soát, cũng như khả năng giữ vững mục tiêu trong những thời điểm khó khăn.','Khi ngược, lá bài này biểu thị sự mất kiểm soát, hướng đi không rõ ràng hoặc thiếu quyết tâm.','The Chariot biểu thị sự quyết tâm, ý chí mạnh mẽ và khả năng kiểm soát để đạt được chiến thắng. Lá bài này khuyến khích bạn điều hướng qua những thử thách với sự tự tin.','2025-04-13 19:30:04'),(9,'Sức Mạnh','Major',NULL,9,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522740/Strength_bqkfjy.png','Một người phụ nữ nhẹ nhàng mở miệng sư tử bằng tay không, xung quanh là cỏ xanh và núi non yên bình. Phía trên đầu cô là biểu tượng vô cực.','Ý nghĩa chung của Strength là sự kiểm soát cảm xúc, lòng trắc ẩn và sức mạnh từ bên trong để vượt qua khó khăn.','Khi ngược, lá bài này biểu thị sự thiếu tự tin, nỗi sợ hãi hoặc khó khăn trong việc kiểm soát cảm xúc.','Strength biểu thị lòng can đảm, sự dịu dàng và sức mạnh nội tại. Lá bài nhắc nhở rằng bạn có thể vượt qua thử thách bằng lòng trắc ẩn và kiên nhẫn.','2025-04-13 19:30:04'),(10,'Ẩn Sĩ','Major',NULL,10,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522726/TheHermit_kawr0b.png','Một người đàn ông già, cầm chiếc đèn lồng phát sáng và gậy chống, đứng một mình trên đỉnh núi, biểu tượng cho sự tìm kiếm tri thức nội tâm.','Ý nghĩa chung của The Hermit là sự tìm kiếm hướng đi, trí tuệ và sự soi sáng qua việc khám phá bản thân.','Khi ngược, lá bài này biểu thị sự cô lập, cảm giác lạc lối hoặc không sẵn sàng đối mặt với sự thật.','The Hermit đại diện cho sự cô lập để chiêm nghiệm và khám phá bản thân. Lá bài này nhắc nhở bạn cần thời gian yên tĩnh để tập trung vào mục tiêu thực sự của mình.','2025-04-13 19:30:04'),(11,'Vòng Quay May Mắn','Major',NULL,11,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522736/WheelOfFortune_jgkdch.png','Một bánh xe lớn được bao quanh bởi bốn sinh vật đại diện cho các yếu tố cố định của chiêm tinh học. Những biểu tượng xung quanh thể hiện sự thay đổi và vận mệnh.','Ý nghĩa chung của Wheel of Fortune là sự thay đổi, cơ hội và khả năng chấp nhận vận mệnh để tiến lên phía trước.','Khi ngược, lá bài này biểu thị sự trì trệ, khó khăn hoặc cảm giác bất lực trước những thay đổi không mong muốn.','Wheel of Fortune biểu thị sự thay đổi, vận mệnh và chu kỳ của cuộc sống. Lá bài này nhắc nhở rằng mọi thứ đều có lúc thăng trầm, và sự linh hoạt là cần thiết.','2025-04-13 19:30:04'),(12,'Công Lý','Major',NULL,12,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522739/Justice_e7uy1j.png','Một người phụ nữ ngồi trên ngai vàng, cầm một thanh kiếm thẳng đứng và một cán cân trong tay, biểu tượng cho công lý và sự cân bằng.','Ý nghĩa chung của Justice là sự cân bằng, sự rõ ràng và quyết định đúng đắn. Nó nhấn mạnh tầm quan trọng của công lý và đạo đức.','Khi ngược, lá bài này biểu thị sự bất công, thiếu trách nhiệm hoặc sự không trung thực.','Justice biểu thị sự công bằng, trung thực và trách nhiệm. Lá bài nhắc nhở rằng mọi hành động đều có hậu quả, và sự thật sẽ được phơi bày.','2025-04-13 19:30:04'),(13,'Người Treo Ngược','Major',NULL,13,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522725/TheHanged_rhoyff.png','Một người đàn ông bị treo ngược từ chân, với hào quang quanh đầu, biểu thị sự giác ngộ qua việc nhìn nhận từ góc độ khác.','Ý nghĩa chung của The Hanged Man là sự kiên nhẫn, sự đầu hàng trước hoàn cảnh và sự giác ngộ qua hy sinh. ','Khi ngược, lá bài này biểu thị sự trì trệ, cảm giác mắc kẹt hoặc sự thiếu chấp nhận để thay đổi.','The Hanged Man biểu thị sự tạm dừng, hy sinh và thay đổi quan điểm. Lá bài nhắc nhở rằng đôi khi cần phải buông bỏ để đạt được sự sáng suốt.','2025-04-13 19:30:04'),(14,'Thần Chết','Major',NULL,14,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522737/Death_djlyw0.png','Một bộ xương mặc áo giáp, cưỡi trên con ngựa trắng, cầm một lá cờ đen với bông hoa trắng. Những người xung quanh biểu thị sự chấp nhận và thay đổi.','Ý nghĩa chung của Death là sự biến đổi, buông bỏ những gì không còn phù hợp và chấp nhận sự thay đổi để tiến về phía trước.','Khi ngược, lá bài này biểu thị sự chống lại sự thay đổi, sợ hãi hoặc khó khăn trong việc buông bỏ.','Death không biểu thị cái chết vật lý mà là sự kết thúc, chuyển đổi và tái sinh. Lá bài nhắc nhở rằng sự kết thúc mở ra cơ hội cho một khởi đầu mới.','2025-04-13 19:30:04'),(15,'Sự Điều Hòa','Major',NULL,15,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522741/Temperance_mtwuhm.png','Một thiên thần đứng bên dòng sông, một chân trên mặt đất và một chân dưới nước. Tay cầm hai cốc rót nước qua lại, biểu thị sự cân bằng và hòa hợp.','Ý nghĩa chung của Temperance là sự hòa hợp, kiên nhẫn và sự phối hợp để đạt được kết quả lâu dài.','Khi ngược, lá bài này biểu thị sự mất cân bằng, thiếu kiên nhẫn hoặc khó khăn trong việc hòa hợp.','Temperance biểu thị sự cân bằng, điều độ và hài hòa. Lá bài nhắc nhở bạn cần giữ vững sự điều chỉnh trong các khía cạnh khác nhau của cuộc sống.','2025-04-13 19:30:04'),(16,'Tháp','Major',NULL,16,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522734/TheTower_lmomxv.png','Một tòa tháp bị sét đánh trúng, lửa bốc cháy, và hai người rơi xuống. Lá bài biểu thị sự sụp đổ và biến động mạnh mẽ.','Ý nghĩa chung của The Tower là sự đột phá, sự thật phũ phàng và cơ hội xây dựng lại từ đầu. Nó khuyến khích bạn đối mặt với những biến động để tiến lên mạnh mẽ hơn.','Khi ngược, lá bài này biểu thị sự giải phóng khỏi những ràng buộc, vượt qua thói quen xấu hoặc cảm giác bất lực.','The Tower biểu thị sự thay đổi đột ngột, sự phá vỡ và sự sụp đổ của những nền tảng không ổn định. Lá bài nhắc nhở rằng đôi khi những thay đổi đau đớn là cần thiết để tái thiết.','2025-04-13 19:30:04'),(17,'Ngôi Sao','Major',NULL,17,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522733/TheStar_teuak7.png','Một người phụ nữ khỏa thân quỳ bên dòng nước, tay cầm hai bình rót nước xuống đất và dòng sông. Phía trên là một bầu trời đầy sao sáng.','Ý nghĩa chung của The Star là sự lạc quan, niềm tin và khả năng tái tạo năng lượng. Nó nhắc nhở bạn rằng luôn có ánh sáng dẫn đường ngay cả trong bóng tối.','Khi ngược, lá bài này biểu thị sự chống lại thay đổi, cố gắng tránh xung đột hoặc trì hoãn sự sụp đổ cần thiết.','The Star biểu thị hy vọng, cảm hứng và sự dẫn đường của ánh sáng trong những thời điểm khó khăn. Lá bài khuyến khích bạn tin tưởng vào khả năng của mình và nhìn về phía trước.','2025-04-13 19:30:04'),(18,'Mặt Trăng','Major',NULL,18,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522732/TheMoon_wiqrp1.png','Hai con chó đứng trước mặt trăng đang mờ dần, với một con tôm đang trồi lên từ dòng nước. Con đường dẫn vào bóng tối giữa hai tòa tháp.','Ý nghĩa chung của The Moon là sự không chắc chắn, mơ hồ và kết nối với trực giác. Nó khuyến khích bạn vượt qua nỗi sợ để tìm ra ánh sáng thật sự.','Khi ngược, lá bài này biểu thị sự mất hy vọng, thiếu tự tin hoặc cảm giác bị ngắt kết nối với mục tiêu.','The Moon biểu thị sự bí ẩn, ảo tưởng và những nỗi sợ tiềm ẩn. Lá bài nhắc nhở rằng không phải tất cả mọi thứ đều như vẻ bề ngoài và cần trực giác để khám phá sự thật.','2025-04-13 19:30:04'),(19,'Mặt Trời','Major',NULL,19,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522734/TheSun_o0habh.png','Mặt trời chiếu sáng rực rỡ trên bầu trời, một đứa trẻ cưỡi ngựa trắng, bao quanh là hoa hướng dương, biểu thị sự vui vẻ và năng lượng tích cực.','Ý nghĩa chung của The Sun là sự thành công, sự rõ ràng và niềm vui trọn vẹn. Nó khuyến khích bạn tự tin bước về phía trước với năng lượng tích cực.','Khi ngược, lá bài này biểu thị sự làm sáng tỏ, vượt qua sự sợ hãi hoặc khám phá sự thật ẩn giấu.','The Sun biểu thị niềm vui, thành công và sự rõ ràng. Lá bài nhắc nhở bạn tận hưởng thành quả và cảm nhận ánh sáng tích cực trong cuộc sống.','2025-04-13 19:30:04'),(20,'Phán Xét','Major',NULL,20,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522739/Justice_e7uy1j.png','Thiên thần thổi kèn, gọi những linh hồn từ mộ trỗi dậy. Những người đàn ông, phụ nữ và trẻ em giơ tay lên đón nhận sự phán xét.','Ý nghĩa chung của Judgement là sự đánh giá, tái sinh và quyết tâm cải thiện bản thân. Nó kêu gọi bạn hành động để tiến lên một cấp độ mới trong cuộc sống.','Khi ngược, lá bài này biểu thị sự trì hoãn, thiếu lạc quan hoặc cảm giác thất vọng. Nó nhắc nhở bạn rằng ánh sáng vẫn luôn ở đó, dù hiện tại có thể bị che mờ.','Judgement biểu thị sự thức tỉnh, sự phán xét và thay đổi lớn trong cuộc đời. Lá bài nhắc nhở bạn đánh giá lại hành động của mình và sẵn sàng thay đổi.','2025-04-13 19:30:04'),(21,'Thế Giới','Major',NULL,21,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522736/TheWorld_fbqk2r.png','Một người phụ nữ khỏa thân nhảy múa bên trong vòng hoa nguyệt quế, bốn góc là các biểu tượng đại diện cho bốn yếu tố hoặc bốn sinh vật của sự sáng tạo.','Ý nghĩa chung của The World là sự hoàn thiện, hòa hợp và thành công toàn diện. Nó khuyến khích bạn tận hưởng sự viên mãn và chuẩn bị cho một khởi đầu mới.','Khi ngược, lá bài này biểu thị sự phán xét sai lầm, thiếu nhận thức hoặc cảm giác tội lỗi. Nó nhắc nhở bạn cần đánh giá lại và tha thứ cho bản thân.','The World biểu thị sự hoàn thành, thành tựu và chu kỳ khép lại. Lá bài nhắc nhở bạn rằng mọi nỗ lực đã được đền đáp và một hành trình mới đang chờ đợi.','2025-04-13 19:30:04'),(23,'Át Gậy','Minor','Gậy',1,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522819/AceOfWands_fhlfur.png','Một bàn tay vươn ra từ đám mây, cầm một cây gậy với những chồi non đang mọc, biểu thị sự khởi đầu và tiềm năng sáng tạo.','Ý nghĩa chung của Ace of Wands là cảm hứng, khởi đầu sáng tạo và sự táo bạo. Nó khuyến khích bạn bắt đầu những dự án mới với niềm đam mê và sự tự tin.','Khi ngược, lá bài này biểu thị sự chậm trễ, thiếu sáng tạo hoặc mất cảm hứng.','Ace of Wands biểu thị sự khởi đầu của năng lượng sáng tạo, nhiệt huyết và cơ hội mới. Lá bài nhắc nhở bạn nắm bắt những ý tưởng mới và dám hành động.','2025-04-13 19:30:04'),(24,'Hai Gậy','Minor','Gậy',2,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522817/TwoOfWands_s1gelh.png','Một người đứng trên ban công, cầm cây gậy và nhìn ra xa với quả cầu trên tay, biểu thị kế hoạch và tầm nhìn.','Ý nghĩa chung của Two of Wands là tầm nhìn, kế hoạch và sự chuẩn bị. Nó khuyến khích bạn cân nhắc kỹ lưỡng để đưa ra quyết định phù hợp với tương lai.','Khi ngược, lá bài này biểu thị sự thiếu kế hoạch, do dự hoặc cảm giác không chắc chắn về tương lai.','Two of Wands biểu thị sự lập kế hoạch, tầm nhìn dài hạn và sự cân nhắc giữa các lựa chọn. Lá bài nhắc nhở bạn hãy dũng cảm theo đuổi mục tiêu của mình.','2025-04-13 19:30:04'),(25,'Ba Gậy','Minor','Gậy',3,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522818/ThreeOfWands_uojynh.png','Một người đứng trên đỉnh đồi, nhìn về phía ba cây gậy cắm xuống đất, xa xa là biển và những con tàu, biểu thị sự chờ đợi và cơ hội đang đến.','Ý nghĩa chung của Three of Wands là sự chờ đợi, mở rộng và cơ hội. Nó khuyến khích bạn nhìn xa hơn và chuẩn bị cho những điều tốt đẹp đang đến.','Khi ngược, lá bài này biểu thị sự thất vọng, thiếu tiến triển hoặc các kế hoạch không thành công.','Three of Wands biểu thị sự mở rộng, chờ đợi kết quả và tìm kiếm cơ hội mới. Lá bài nhắc nhở bạn hãy kiên nhẫn và sẵn sàng để đón nhận thành công.','2025-04-13 19:30:04'),(26,'Bốn Gậy','Minor','Gậy',4,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522808/FourOfWands_spesfc.png','Bốn cây gậy được dựng lên tạo thành một cổng chào, hai người đang ăn mừng, phía sau là một ngôi nhà và cánh đồng xanh.Four of Wands biểu thị sự ổn định, lễ kỷ niệm và sự hài hòa. Lá bài nhắc nhở bạn trân trọng những khoảnh khắc đáng nhớ và cảm nhận niềm vui từ sự ổn định.','Ý nghĩa chung của Four of Wands là sự ổn định, niềm vui và thành tựu. Nó khuyến khích bạn ăn mừng và cảm nhận sự hài hòa trong cuộc sống.','Khi ngược, lá bài này biểu thị sự thiếu ổn định, xung đột hoặc cảm giác không trọn vẹn.','Four of Wands biểu thị sự ổn định, lễ kỷ niệm và sự hài hòa. Lá bài nhắc nhở bạn trân trọng những khoảnh khắc đáng nhớ và cảm nhận niềm vui từ sự ổn định.','2025-04-13 19:30:04'),(27,'Năm Gậy','Minor','Gậy',5,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522807/FiveOfWands_fmvkgg.png','Năm người mỗi người cầm một cây gậy, dường như đang tranh luận hoặc thi đấu, biểu thị xung đột và cạnh tranh.','Ý nghĩa chung của Five of Wands là sự cạnh tranh, xung đột và thách thức. Nó khuyến khích bạn biến những khó khăn thành cơ hội để phát triển.','Khi ngược, lá bài này biểu thị sự hòa giải, chấm dứt xung đột hoặc tránh đối đầu.','Five of Wands biểu thị sự cạnh tranh, mâu thuẫn và xung đột. Lá bài nhắc nhở bạn học cách làm việc cùng nhau và vượt qua những khác biệt.','2025-04-13 19:30:04'),(28,'Sáu Gậy','Minor','Gậy',6,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522815/SixOfWands_uef068.png','Một người cưỡi ngựa trắng, cầm một cây gậy có vòng nguyệt quế, xung quanh là đám đông chúc mừng, biểu thị chiến thắng và sự công nhận.','Ý nghĩa chung của Six of Wands là chiến thắng, sự công nhận và thành tựu. Nó khuyến khích bạn tự tin trong những nỗ lực của mình và tận hưởng thành quả.','Khi ngược, lá bài này biểu thị sự thất bại, thiếu công nhận hoặc cảm giác bị xem nhẹ.','Six of Wands biểu thị sự chiến thắng, sự công nhận và cảm giác tự hào. Lá bài nhắc nhở bạn trân trọng thành công của mình và tiếp tục tiến lên.','2025-04-13 19:30:04'),(29,'Bảy Gậy','Minor','Gậy',7,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522814/SevenOfWands_yngb4l.png','Một người đứng trên đỉnh đồi, cầm cây gậy, chiến đấu chống lại những đối thủ bên dưới, biểu thị sự bảo vệ và sự kiên định.','Ý nghĩa chung của Seven of Wands là sự bảo vệ, kiên trì và đối mặt với thách thức. Nó khuyến khích bạn giữ vững lòng tin vào bản thân và những mục tiêu của mình.','Khi ngược, lá bài này biểu thị sự thiếu tự tin, cảm giác bị áp đảo hoặc mất lợi thế.','Seven of Wands biểu thị sự bảo vệ, lập trường vững chắc và vượt qua thử thách. Lá bài nhắc nhở bạn giữ vững quan điểm và tiếp tục chiến đấu cho những gì bạn tin tưởng.','2025-04-13 19:30:04'),(30,'Tám Gậy','Minor','Gậy',8,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522820/EightOfWands_gbietz.png','Tám cây gậy bay nhanh qua bầu trời, biểu thị sự tiến triển và hành động nhanh chóng.','Ý nghĩa chung của Eight of Wands là tốc độ, hành động và sự thay đổi. Nó khuyến khích bạn tiếp tục tiến lên với sự tự tin và quyết t','Khi ngược, lá bài này biểu thị sự trì hoãn, gián đoạn hoặc các kế hoạch không tiến triển như mong muốn.','Eight of Wands biểu thị sự chuyển động, tiến triển nhanh chóng và những sự kiện bất ngờ. Lá bài nhắc nhở bạn hãy sẵn sàng nắm bắt cơ hội khi chúng đến.','2025-04-13 19:30:04'),(31,'Chín Gậy','Minor','Gậy',9,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522811/NineOfWands_yvkl8e.png','Một người đứng tựa vào cây gậy, với vẻ cảnh giác, phía sau là tám cây gậy dựng đứng, biểu thị sự kiên trì và sự phòng thủ.','Ý nghĩa chung của Nine of Wands là sự bền bỉ, cảnh giác và quyết tâm. Nó khuyến khích bạn tiếp tục giữ vững lòng tin vào bản thân và mục tiêu của mình.','Khi ngược, lá bài này biểu thị sự mệt mỏi, thiếu chuẩn bị hoặc cảm giác bị quá tải.','Nine of Wands biểu thị sự kiên cường, chuẩn bị và bảo vệ. Lá bài nhắc nhở bạn không từ bỏ dù đã trải qua nhiều thử thách.','2025-04-13 19:30:04'),(32,'Mười Gậy','Minor','Gậy',10,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522816/TenOfWands_euzzix.png','Một người mang trên vai mười cây gậy, bước đi nặng nề, biểu thị gánh nặng và trách nhiệm.','Ý nghĩa chung của Ten of Wands là gánh nặng, trách nhiệm và sự kiên trì. Nó khuyến khích bạn tìm cách giảm tải và phân bổ công việc hiệu quả hơn.','Khi ngược, lá bài này biểu thị sự giải thoát khỏi gánh nặng, buông bỏ trách nhiệm hoặc cảm giác quá tải.','Ten of Wands biểu thị sự áp lực, trách nhiệm và gánh nặng. Lá bài nhắc nhở bạn hãy học cách chia sẻ trách nhiệm và không tự làm mọi thứ một mình.','2025-04-13 19:30:04'),(33,'Tiểu Đồng Gậy','Minor','Gậy',11,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522812/PageOfWands_o4fj5p.png','Một người trẻ tuổi đứng trên nền đất cằn cỗi, cầm một cây gậy và nhìn về phía trước, biểu thị sự sáng tạo và tiềm năng khám phá.','Ý nghĩa chung của Page of Wands là sự sáng tạo, năng lượng mới và sự khởi đầu. Nó khuyến khích bạn mở lòng đón nhận cơ hội mới và sẵn sàng hành động.',' Khi ngược, lá bài này biểu thị sự thiếu định hướng, mất cảm hứng hoặc không sẵn sàng để khám phá điều mới.','Page of Wands biểu thị sự sáng tạo, sự tò mò và tinh thần khám phá. Lá bài nhắc nhở bạn hãy dám thử nghiệm và khám phá những ý tưởng mới.','2025-04-13 19:30:04'),(34,'Hiệp Sĩ Gậy','Minor','Gậy',12,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522810/KnightOfWands_upeuxp.png','Một hiệp sĩ cưỡi ngựa, cầm cây gậy, đang phi nhanh qua sa mạc, biểu thị sự đam mê và hành động quyết liệt.','Ý nghĩa chung của Knight of Wands là năng lượng mạnh mẽ, sự quyết đoán và đam mê. Nó khuyến khích bạn tận dụng cơ hội và hành động với sự tự tin.','Khi ngược, lá bài này biểu thị sự bốc đồng, thiếu kiên nhẫn hoặc không thể duy trì mục tiêu dài hạn.','Knight of Wands biểu thị sự nhiệt huyết, quyết đoán và tinh thần phiêu lưu. Lá bài nhắc nhở bạn hãy hành động với sự đam mê và lòng dũng cảm.','2025-04-13 19:30:04'),(35,'Hoàng Hậu Gậy','Minor','Gậy',13,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522813/QueenOfWands_f28hpp.png','Một nữ hoàng ngồi trên ngai vàng được trang trí bằng biểu tượng hoa hướng dương, tay cầm cây gậy, biểu thị sự sáng tạo và cảm hứng.','Ý nghĩa chung của Queen of Wands là sự sáng tạo, tự tin và năng lượng tích cực. Nó khuyến khích bạn theo đuổi đam mê với sự nhiệt huyết và lạc quan.','Khi ngược, lá bài này biểu thị sự thiếu tự tin, cảm giác không đủ khả năng hoặc sự kiểm soát quá mức.','Queen of Wands đại diện cho sự tự tin, sáng tạo và niềm đam mê. Lá bài nhắc nhở bạn hãy thể hiện bản thân một cách mạnh mẽ và đầy cảm hứng.','2025-04-13 19:30:04'),(36,'Vua Gậy','Minor','Gậy',14,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522809/KingOfWands_yggbgg.png','Một vị vua ngồi trên ngai vàng được trang trí bằng hình sư tử và kỳ nhông, tay cầm cây gậy, biểu thị sự lãnh đạo và sức mạnh sáng tạo.','Ý nghĩa chung của King of Wands là sự lãnh đạo, quyết tâm và sáng tạo. Nó khuyến khích bạn sử dụng tài năng và năng lượng của mình để đạt được mục tiêu.','Khi ngược, lá bài này biểu thị sự lạm dụng quyền lực, kiêu ngạo hoặc thiếu trách nhiệm.','King of Wands biểu thị sự lãnh đạo, tầm nhìn xa và khả năng truyền cảm hứng. Lá bài nhắc nhở bạn hãy sử dụng sức mạnh của mình để dẫn dắt và hỗ trợ người khác.','2025-04-13 19:30:04'),(37,'Át Cốc','Minor','Cốc',1,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523055/AceOfCups_t4w5ut.png','Một bàn tay vươn ra từ đám mây, cầm một chiếc cốc đầy nước tràn ra, phía trên là một con chim bồ câu thả xuống một đồng xu thiêng liêng.','Ý nghĩa chung của Ace of Cups là tình yêu mới, cảm hứng và khả năng đón nhận những cảm xúc sâu sắc. Nó khuyến khích bạn mở lòng và tin tưởng vào tình yêu.','Khi ngược, lá bài này biểu thị sự kìm nén cảm xúc, khó khăn trong việc bày tỏ cảm xúc hoặc cảm giác thất vọng.','Ace of Cups biểu thị sự khởi đầu của cảm xúc, tình yêu và lòng từ bi. Lá bài này là biểu tượng của sự tuôn trào cảm xúc và khả năng kết nối với trái tim.','2025-04-13 19:30:04'),(38,'Hai Cốc','Minor','Cốc',2,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1747067407/TwoOfCups_pwpskq.png',' Hai người đang nâng cốc chúc mừng nhau, phía trên là một con sư tử có cánh với biểu tượng của lòng trung thành và tình yêu.','Ý nghĩa chung của Two of Cups là mối quan hệ hài hòa, tình yêu đôi lứa và sự hợp tác. Nó khuyến khích bạn xây dựng mối quan hệ dựa trên sự tin tưởng và tôn trọng.','Khi ngược, lá bài này biểu thị sự mất cân bằng, hiểu lầm hoặc chia rẽ trong mối quan hệ.','Two of Cups đại diện cho sự hòa hợp, đối tác và kết nối. Lá bài biểu thị mối quan hệ cân bằng, đôi bên cùng có lợi và sự tôn trọng lẫn nhau.','2025-04-13 19:30:04'),(39,'Ba Cốc','Minor','Cốc',3,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1747067428/ThreeOfCups_fpi8rp.png','Ba người phụ nữ đứng cùng nhau, nâng cao cốc, xung quanh là hoa quả, biểu thị niềm vui, lễ hội và sự chia sẻ.','Ý nghĩa chung của Three of Cups là sự đoàn kết, tình bạn và chia sẻ niềm vui. Nó khuyến khích bạn tham gia vào các hoạt động xã hội và cảm nhận niềm vui từ cộng đồng.','Khi ngược, lá bài này biểu thị sự cô lập, cảm giác bị loại trừ hoặc xung đột trong các mối quan hệ.','Three of Cups biểu thị sự kỷ niệm, tình bạn và niềm vui chung. Lá bài này nhắc nhở bạn tận hưởng những khoảnh khắc hạnh phúc và trân trọng sự kết nối với người khác.','2025-04-13 19:30:04'),(40,'Bốn Cốc','Minor','Cốc',4,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523059/FourOfCups_maxvyk.png','Một người ngồi dưới gốc cây, tay khoanh lại, trước mặt là ba chiếc cốc, trong khi một chiếc cốc khác được bàn tay từ đám mây đưa ra.','Ý nghĩa chung của Four of Cups là sự chán nản, do dự và tự suy ngẫm. Nó khuyến khích bạn mở lòng đón nhận những điều mới mẻ và thay đổi quan điểm.','Khi ngược, lá bài này biểu thị sự thức tỉnh, sẵn sàng đón nhận cơ hội mới hoặc thoát khỏi trạng thái trì trệ.','Four of Cups biểu thị sự suy tư, không hài lòng hoặc bỏ qua cơ hội. Lá bài nhắc nhở bạn chú ý đến những cơ hội mới đang đến gần.','2025-04-13 19:30:04'),(41,'Năm Cốc','Minor','Cốc',5,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523058/FiveOfCups_bzawr6.png','Một người mặc áo choàng đen đứng nhìn xuống ba chiếc cốc bị đổ, trong khi hai chiếc cốc khác vẫn còn đầy, và một cây cầu dẫn đến một tòa lâu đài ở phía xa.','Ý nghĩa chung của Five of Cups là sự đau buồn, tiếc nuối và khả năng học hỏi từ những mất mát. Nó khuyến khích bạn tập trung vào những gì còn lại và tiến về phía trước.','Khi ngược, lá bài này biểu thị sự chữa lành, sự tha thứ và khả năng vượt qua mất mát.','Five of Cups biểu thị sự mất mát, tiếc nuối và tập trung vào những điều đã mất. Lá bài nhắc nhở bạn rằng vẫn còn cơ hội và hy vọng phía trước.','2025-04-13 19:30:04'),(42,'Sáu Cốc','Minor','Cốc',6,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523053/SixOfCups_p74817.png','Một đứa trẻ trao một chiếc cốc đầy hoa cho một đứa trẻ khác. Xung quanh là những chiếc cốc tương tự, và một ngôi nhà ở phía xa, biểu thị sự hoài niệm và ký ức đẹp.','Ý nghĩa chung của Six of Cups là sự hoài niệm, sự hào phóng và niềm vui từ quá khứ. Nó khuyến khích bạn tìm niềm vui trong những ký ức đẹp và chia sẻ lòng tốt với người khác.','Khi ngược, lá bài này biểu thị sự khó khăn trong việc buông bỏ quá khứ hoặc cảm giác hoài nghi về những ký ức tốt đẹp.','Six of Cups đại diện cho ký ức tuổi thơ, sự hoài niệm và lòng tốt. Lá bài này nhắc nhở bạn về giá trị của việc kết nối với quá khứ và học hỏi từ những kỷ niệm.','2025-04-13 19:30:04'),(43,'Bảy Cốc','Minor','Cốc',7,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523052/SevenOfCups_wbt3zi.png','Bảy chiếc cốc chứa đầy các vật phẩm khác nhau, từ kho báu đến rắn, biểu thị sự cám dỗ và lựa chọn khó khăn.','Ý nghĩa chung của Seven of Cups là sự lựa chọn, cám dỗ và ảo tưởng. Nó khuyến khích bạn tập trung vào những gì thực sự quan trọng và tránh bị lạc lối trong mơ mộng.','Khi ngược, lá bài này biểu thị sự tập trung, quyết tâm và việc nhìn rõ sự thật sau những ảo tưởng.','Seven of Cups biểu thị sự tưởng tượng, những giấc mơ và sự bối rối trước nhiều lựa chọn. Lá bài nhắc nhở bạn cần tỉnh táo và chọn lựa khôn ngoan.','2025-04-13 19:30:04'),(44,'Tám Cốc','Minor','Cốc',8,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523056/EightOfCups_w4ivqw.png','ột người quay lưng lại, rời đi khỏi tám chiếc cốc, hướng về ngọn núi cao, biểu thị sự từ bỏ và tìm kiếm mục tiêu cao hơn.','Ý nghĩa chung của Eight of Cups là sự buông bỏ, thay đổi và hành trình hướng tới sự hoàn thiện. Nó nhắc nhở bạn rằng đôi khi cần phải từ bỏ để tiến về phía trước.','Khi ngược, lá bài này biểu thị sự do dự, sợ hãi sự thay đổi hoặc khó khăn trong việc buông bỏ.','Eight of Cups biểu thị sự buông bỏ, rời xa những gì không còn phục vụ bạn nữa và tìm kiếm ý nghĩa mới. Lá bài khuyến khích bạn dũng cảm để theo đuổi điều tốt đẹp hơn.','2025-04-13 19:30:04'),(45,'Chín Cốc','Minor','Cốc',9,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523048/NineOfCups_pyszhw.png','Một người đàn ông ngồi tự hào trước chín chiếc cốc được xếp thành hàng, biểu thị sự hài lòng và thỏa mãn.','Ý nghĩa chung của Nine of Cups là niềm vui, sự thỏa mãn và cảm giác hoàn thành. Nó khuyến khích bạn biết ơn và tận hưởng những gì bạn đã đạt được.','Khi ngược, lá bài này biểu thị sự không hài lòng, kỳ vọng không đạt được hoặc cảm giác trống rỗng.','Nine of Cups là lá bài của sự thỏa mãn, thành công và hạnh phúc. Lá bài nhắc nhở bạn tận hưởng những thành quả mà bạn đã làm việc chăm chỉ để đạt được.','2025-04-13 19:30:04'),(46,'Mười Cốc','Minor','Cốc',10,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1747067448/TenOfCups_uoqb8c.png','Một gia đình đứng dưới cầu vồng với mười chiếc cốc, biểu thị sự hạnh phúc gia đình và hòa hợp. Phía xa là một ngôi nhà và cảnh thiên nhiên thanh bình.','Ý nghĩa chung của Ten of Cups là sự viên mãn, tình yêu và hạnh phúc trọn vẹn. Nó khuyến khích bạn trân trọng những điều quan trọng nhất trong cuộc sống.','Khi ngược, lá bài này biểu thị sự bất hòa trong gia đình, thất vọng về các mối quan hệ hoặc cảm giác không an toàn.','Ten of Cups đại diện cho hạnh phúc gia đình, tình yêu và sự hòa hợp. Lá bài này nhắc nhở bạn về giá trị của gia đình và sự kết nối với người thân yêu.','2025-04-13 19:30:04'),(47,'Tiểu Đồng Cốc','Minor','Cốc',11,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523049/PageOfCups_ojzj7r.png','Một người trẻ tuổi cầm một chiếc cốc có con cá nhảy ra, biểu thị sự ngạc nhiên và những ý tưởng sáng tạo mới mẻ.','Ý nghĩa chung của Page of Cups là sự khám phá cảm xúc, thông điệp bất ngờ và sự sáng tạo. Nó khuyến khích bạn nuôi dưỡng trí tưởng tượng và trực giác của mình.','Khi ngược, lá bài này biểu thị sự thiếu trưởng thành, khó khăn trong việc bày tỏ cảm xúc hoặc cảm giác bị từ chối.','Page of Cups biểu thị sự sáng tạo, trực giác và cảm xúc mới. Lá bài nhắc nhở bạn mở lòng để đón nhận những cảm hứng bất ngờ.','2025-04-13 19:30:04'),(48,'Hiệp Sĩ Cốc','Minor','Cốc',12,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523062/KnightOfCups_vj0vaj.png','Một hiệp sĩ mặc áo giáp, cưỡi ngựa trắng, tay cầm một chiếc cốc, biểu thị sự theo đuổi cảm xúc và lý tưởng lãng mạn.','Knight of Cups biểu thị sự lãng mạn, lòng nhiệt tình và khát vọng cảm xúc. Lá bài nhắc nhở bạn theo đuổi những gì khiến trái tim bạn rung động.','Khi ngược, lá bài này biểu thị sự không đáng tin, thất vọng hoặc cảm giác mơ hồ về phương hướng.','Ý nghĩa chung của Knight of Cups là hành động theo cảm xúc, sự lãng mạn và lý tưởng hóa. Nó khuyến khích bạn đón nhận các cơ hội cảm xúc với lòng nhiệt tình.','2025-04-13 19:30:04'),(49,'Hoàng Hậu Cốc','Minor','Cốc',13,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523050/QueenOfCups_ptzivh.png','Một nữ hoàng ngồi trên ngai, tay cầm chiếc cốc được che kín, biểu thị chiều sâu cảm xúc và trực giác mạnh mẽ.','Ý nghĩa chung của Queen of Cups là sự nuôi dưỡng cảm xúc, sự đồng cảm và trí tuệ tâm linh. Nó khuyến khích bạn thể hiện tình yêu và sự quan tâm chân thành.','Khi ngược, lá bài này biểu thị sự bất ổn cảm xúc, phụ thuộc hoặc khó khăn trong việc kiểm soát cảm xúc.','Queen of Cups đại diện cho sự đồng cảm, trực giác và tình yêu vô điều kiện. Lá bài nhắc nhở bạn lắng nghe trái tim mình và cảm nhận sâu sắc những cảm xúc xung quanh.','2025-04-13 19:30:04'),(50,'Vua Cốc','Minor','Cốc',14,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523061/KingOfCups_xusbfk.png','Một vị vua ngồi trên ngai vàng được trang trí bằng biểu tượng nước, tay cầm chiếc cốc, biểu thị sự kiểm soát cảm xúc và sự trưởng thành.','Ý nghĩa chung của King of Cups là sự lãnh đạo với lòng từ bi, trí tuệ cảm xúc và sự trưởng thành. Nó khuyến khích bạn kiểm soát cảm xúc của mình để đưa ra quyết định đúng đắn.','Khi ngược, lá bài này biểu thị sự lạm dụng cảm xúc, khó kiểm soát cảm xúc hoặc hành vi thao túng.Khi ngược, lá bài này biểu thị sự nhầm lẫn, thiếu rõ ràng hoặc các quyết định không sáng suốt.','King of Cups đại diện cho sự cân bằng cảm xúc, lòng từ bi và trí tuệ. Lá bài nhắc nhở bạn duy trì sự ổn định và sử dụng cảm xúc một cách khôn ngoan.','2025-04-13 19:30:04'),(51,'Át Kiếm','Minor','Kiếm',1,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522843/AceOfSwords_f1fzqw.png','Một bàn tay vươn ra từ đám mây, cầm một thanh kiếm thẳng đứng, phía trên là vương miện và vòng nguyệt quế, biểu thị chiến thắng và sự rõ ràng.','Ý nghĩa chung của Ace of Swords là sự rõ ràng, quyết định và sự chiến thắng thông qua trí tuệ. Nó khuyến khích bạn sử dụng khả năng phân tích để vượt qua thử thách.','Khi ngược, lá bài này biểu thị sự nhầm lẫn, thiếu rõ ràng hoặc các quyết định không sáng suốt.','Ace of Swords biểu thị sự bắt đầu của trí tuệ, sự rõ ràng và khả năng phân tích. Lá bài nhắc nhở bạn về sức mạnh của sự thật và logic.','2025-04-13 19:30:04'),(52,'Hai Kiếm','Minor','Kiếm',2,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522840/TwoOfSwords_f05rgm.png','Một người ngồi bịt mắt, cầm hai thanh kiếm bắt chéo, phía sau là bầu trời tối và biển cả, biểu thị sự do dự và bế tắc.','Ý nghĩa chung của Two of Swords là sự cân bằng, do dự và bế tắc. Nó khuyến khích bạn tìm kiếm sự rõ ràng để vượt qua tình trạng mâu thuẫn.','Khi ngược, lá bài này biểu thị sự trì hoãn trong việc đưa ra quyết định, căng thẳng hoặc sự bế tắc kéo dài.','Two of Swords biểu thị sự đấu tranh nội tâm và những quyết định khó khăn. Lá bài nhắc nhở bạn cần cân nhắc kỹ lưỡng để đưa ra lựa chọn đúng đắn.','2025-04-13 19:30:04'),(53,'Ba Kiếm','Minor','Kiếm',3,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522842/ThreeOfSwords_nhm5h5.png','Ba thanh kiếm đâm xuyên qua một trái tim giữa bầu trời mưa bão, biểu thị sự đau khổ và mất mát trong cảm xúc.','Ý nghĩa chung của Three of Swords là sự đau buồn, tổn thương và học hỏi từ những thất bại cảm xúc. Nó khuyến khích bạn chữa lành và tiếp tục tiến lên.','Khi ngược, lá bài này biểu thị sự chữa lành, tha thứ hoặc nỗ lực vượt qua nỗi đau cũ.','Three of Swords biểu thị nỗi đau, sự tổn thương và mất mát. Lá bài nhắc nhở bạn rằng dù đau khổ, bạn vẫn có thể học hỏi và trưởng thành từ những trải nghiệm đó.','2025-04-13 19:30:04'),(54,'Bốn Kiếm','Minor','Kiếm',4,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522846/FourOfSwords_fgtbpw.png','Một người nằm trên chiếc giường bằng đá, tay chắp lại như đang cầu nguyện, với ba thanh kiếm treo trên tường phía trên.','Ý nghĩa chung của Four of Swords là sự tĩnh lặng, nghỉ ngơi và chuẩn bị. Nó khuyến khích bạn tìm sự yên bình và tái cân bằng trong cuộc sống.','Khi ngược, lá bài này biểu thị sự kiệt sức, căng thẳng kéo dài hoặc không dành đủ thời gian để nghỉ ngơi.','Four of Swords biểu thị sự nghỉ ngơi, hồi phục và suy ngẫm. Lá bài nhắc nhở bạn cần dành thời gian để tái tạo năng lượng và chuẩn bị cho những thử thách tiếp theo.','2025-04-13 19:30:04'),(55,'Năm Kiếm','Minor','Kiếm',5,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522845/FiveOfSwords_sdeegr.png','Một người cầm ba thanh kiếm, nhìn về hai người khác đang rời đi trong thất vọng, biểu thị sự xung đột và chiến thắng không trọn vẹn.','Ý nghĩa chung của Five of Swords là sự căng thẳng, xung đột và bài học từ thất bại. Nó khuyến khích bạn học hỏi từ những sai lầm và cải thiện cách giải quyết vấn đề.','Khi ngược, lá bài này biểu thị sự hòa giải, chấm dứt xung đột hoặc nhận ra các sai lầm trong hành động.','Five of Swords biểu thị sự xung đột, mất mát và hậu quả của chiến thắng không công bằng. Lá bài nhắc nhở bạn cần cân nhắc về cách hành xử và quyết định của mình.','2025-04-13 19:30:04'),(56,'Sáu Kiếm','Minor','Kiếm',6,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522838/SixOfSwords_muvksz.png','Một người chèo thuyền đưa một phụ nữ và một đứa trẻ qua dòng nước yên bình, với sáu thanh kiếm dựng đứng trên thuyền.','Ý nghĩa chung của Six of Swords là sự di chuyển, chữa lành và giải thoát khỏi căng thẳng. Nó khuyến khích bạn tiến về phía trước với hy vọng và sự bình an.','Khi ngược, lá bài này biểu thị sự mắc kẹt, khó khăn trong việc di chuyển hoặc không thể buông bỏ quá khứ.','Six of Swords biểu thị sự chuyển đổi, vượt qua khó khăn và hướng tới một tương lai tốt đẹp hơn. Lá bài nhắc nhở bạn cần chấp nhận sự thay đổi để đạt được bình yên.','2025-04-13 19:30:04'),(57,'Bảy Kiếm','Minor','Kiếm',7,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522837/SevenOfSwords_innw4v.png','Một người lén lút mang theo năm thanh kiếm, để lại hai thanh kiếm phía sau, nhìn quanh như sợ bị phát hiện.','Ý nghĩa chung của Seven of Swords là sự lừa dối, chiến lược và hành động thận trọng. Nó khuyến khích bạn đánh giá lại ý định và hành động của mình để tránh rủi ro.','Khi ngược, lá bài này biểu thị sự hối hận, bị lộ kế hoạch hoặc cảm giác không trung thực với chính mình.','Seven of Swords biểu thị sự mưu mẹo, trốn tránh và hành động lén lút. Lá bài nhắc nhở bạn cần trung thực và cẩn thận để tránh hậu quả không mong muốn.','2025-04-13 19:30:04'),(58,'Tám Kiếm','Minor','Kiếm',8,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522844/EightOfSwords_kajc9g.png','Một người bị bịt mắt và trói đứng giữa tám thanh kiếm cắm xuống đất, xung quanh là một vùng nước nông, biểu thị sự ràng buộc và cảm giác bị mắc kẹt.','Ý nghĩa chung của Eight of Swords là sự hạn chế, cảm giác bị mắc kẹt và nỗi sợ hãi. Nó khuyến khích bạn nhìn nhận vấn đề từ một góc độ mới để tìm cách giải quyết.','Khi ngược, lá bài này biểu thị sự giải thoát khỏi các hạn chế, vượt qua nỗi sợ và tìm lại tự do.','Eight of Swords biểu thị sự sợ hãi, hạn chế và cảm giác bất lực. Lá bài nhắc nhở bạn rằng nhiều rào cản là do tự tạo ra và có thể vượt qua.','2025-04-13 19:30:04'),(59,'Chín Kiếm','Minor','Kiếm',9,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522834/NineOfSwords_nijfvj.png','Một người ngồi trên giường, tay ôm đầu trong tư thế đau khổ, phía sau là chín thanh kiếm treo trên tường.','Ý nghĩa chung của Nine of Swords là sự lo âu, ám ảnh và đau khổ. Nó khuyến khích bạn vượt qua nỗi sợ để tìm lại sự bình yên nội tâm.','Khi ngược, lá bài này biểu thị sự giảm bớt lo âu, chữa lành hoặc tìm thấy sự an tâm sau khó khăn.','Nine of Swords biểu thị nỗi lo lắng, ám ảnh và cảm giác tội lỗi. Lá bài nhắc nhở bạn cần đối mặt với nỗi sợ hãi và tìm cách chữa lành tinh thần.','2025-04-13 19:30:04'),(60,'Mười Kiếm','Minor','Kiếm',10,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522839/TenOfSwords_jerven.png','Một người nằm sấp trên mặt đất với mười thanh kiếm đâm vào lưng, bầu trời phía trên đen tối nhưng có ánh sáng le lói ở đường chân trời.','Ý nghĩa chung của Ten of Swords là sự kết thúc, mất mát và sự tái sinh. Nó khuyến khích bạn chấp nhận sự thay đổi để hướng tới một khởi đầu mới.','Khi ngược, lá bài này biểu thị sự tái sinh, kết thúc khó khăn và khởi đầu mới.','Ten of Swords biểu thị sự kết thúc đau đớn, phản bội và sự sụp đổ. Lá bài nhắc nhở bạn rằng sau sự sụp đổ là cơ hội để tái sinh và bắt đầu lại.','2025-04-13 19:30:04'),(61,'Tiểu Đồng Kiếm','Minor','Kiếm',11,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522835/PageOfSwords_zikkcf.png','Một người trẻ tuổi cầm kiếm, đứng trên một ngọn đồi, nhìn ra xa với tư thế sẵn sàng, biểu thị sự tò mò và cảnh giác.','Ý nghĩa chung của Page of Swords là sự khám phá, sự nhanh nhạy và ý chí học hỏi. Nó khuyến khích bạn giữ tinh thần cởi mở và kiên nhẫn trước những thử thách.','Khi ngược, lá bài này biểu thị sự tò mò không lành mạnh, tin tức sai lệch hoặc sự thiếu chuẩn bị.','Page of Swords biểu thị sự tò mò, trí thông minh và khao khát tìm hiểu. Lá bài nhắc nhở bạn luôn cảnh giác và sẵn sàng học hỏi những điều mới.','2025-04-13 19:30:04'),(62,'Hiệp Sĩ Kiếm','Minor','Kiếm',12,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522833/KnightOfSwords_xqydss.png','Một hiệp sĩ cưỡi ngựa phi nhanh, tay cầm kiếm, lao về phía trước, biểu thị sự quyết tâm và hành động táo bạo.','Ý nghĩa chung của Knight of Swords là sự quyết đoán, hành động và trí tuệ sắc bén. Nó khuyến khích bạn hành động mạnh mẽ nhưng không quên cân nhắc kỹ lưỡng.','Khi ngược, lá bài này biểu thị sự bốc đồng, hành động thiếu suy nghĩ hoặc mất kiểm soát.','Knight of Swords biểu thị sự hành động nhanh chóng, táo bạo và khả năng vượt qua thử thách. Lá bài nhắc nhở bạn cần có kế hoạch trước khi hành động để tránh rủi ro.','2025-04-13 19:30:04'),(63,'Hoàng Hậu Kiếm','Minor','Kiếm',13,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522836/QueenOfSwords_zhonxv.png','Một nữ hoàng ngồi trên ngai vàng, tay cầm kiếm thẳng đứng, phía sau là bầu trời quang đãng và cây cối, biểu thị sự rõ ràng và sự thẳng thắn.','Ý nghĩa chung của Queen of Swords là sự thông thái, sự khách quan và tính độc lập. Nó khuyến khích bạn tìm kiếm sự thật và đối mặt với thực tế.','Khi ngược, lá bài này biểu thị sự lạnh lùng, thiếu cảm xúc hoặc sử dụng lời nói để thao túng người khác.','Queen of Swords đại diện cho sự thông minh, tính độc lập và khả năng đưa ra quyết định rõ ràng. Lá bài nhắc nhở bạn sử dụng trí tuệ và lý trí để giải quyết vấn đề.','2025-04-13 19:30:04'),(64,'Vua Kiếm','Minor','Kiếm',14,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745522832/KingOfSwords_hibs62.png','Một vị vua ngồi trên ngai vàng, tay cầm kiếm, biểu thị quyền lực, trí tuệ và khả năng lãnh đạo. Cảnh nền là bầu trời và núi cao, tượng trưng cho tầm nhìn rộng lớn.','Ý nghĩa chung của King of Swords là sự lãnh đạo, công lý và trí tuệ sắc bén. Nó khuyến khích bạn lãnh đạo bằng sự công bằng và trí tuệ.','Khi ngược, lá bài này biểu thị sự lạm quyền, thao túng hoặc sử dụng trí tuệ để kiểm soát người khác.','King of Swords biểu thị sự lãnh đạo, trí tuệ và khả năng đưa ra quyết định công bằng. Lá bài nhắc nhở bạn sử dụng lý trí và công lý để giải quyết vấn đề.','2025-04-13 19:30:04'),(65,'Át Tiền','Minor','Tiền',1,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523010/AceOfPentacles_vuges6.png','Một bàn tay vươn ra từ đám mây, cầm một đồng tiền vàng lớn, phía dưới là một khu vườn tươi tốt với con đường dẫn đến ngọn núi xa.','Ý nghĩa chung của Ace of Pentacles là tiềm năng thịnh vượng, cơ hội mới và sự khởi đầu đầy hứa hẹn trong các lĩnh vực vật chất.','Khi ngược, lá bài này biểu thị cơ hội bị bỏ lỡ, thiếu ổn định hoặc sự khởi đầu không thuận lợi.','Ace of Pentacles biểu thị sự khởi đầu của cơ hội tài chính, thành công vật chất và sự thịnh vượng. Lá bài nhắc nhở bạn nắm bắt cơ hội để phát triển.','2025-04-13 19:30:04'),(66,'Hai Tiền','Minor','Tiền',2,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523008/TwoOfPentacles_agbu0n.png','Một người đang tung hứng hai đồng tiền được kết nối bằng một vòng vô cực, phía sau là sóng biển gợn sóng, biểu thị sự cân bằng và thích ứng.','Ý nghĩa chung của Two of Pentacles là sự cân bằng, linh hoạt và quản lý hiệu quả các nguồn lực và trách nhiệm.','Khi ngược, lá bài này biểu thị sự mất cân bằng, quản lý kém hoặc cảm giác bị áp lực.','Two of Pentacles đại diện cho sự cân bằng giữa các trách nhiệm và khả năng thích nghi với hoàn cảnh thay đổi. Lá bài nhắc nhở bạn giữ vững sự linh hoạt.','2025-04-13 19:30:04'),(67,'Ba Tiền','Minor','Tiền',3,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523009/ThreeofPentacles_j0kffg.png','Ba người đứng trong một nhà thờ đang xây dựng, hợp tác để tạo ra điều lớn lao hơn. Một người cầm bản vẽ, biểu thị sự lập kế hoạch và làm việc nhóm.','Ý nghĩa chung của Three of Pentacles là sự hợp tác, kỹ năng và sự công nhận nỗ lực. Nó khuyến khích bạn làm việc nhóm và trau dồi khả năng cá nhân.','Khi ngược, lá bài này biểu thị sự thiếu hợp tác, không đánh giá đúng năng lực hoặc công việc kém chất lượng.','Three of Pentacles biểu thị sự hợp tác, kỹ năng và công nhận. Lá bài nhắc nhở bạn làm việc cùng người khác để đạt được mục tiêu chung.','2025-04-13 19:30:04'),(68,'Bốn Tiền','Minor','Tiền',4,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523014/FourOfPentacles_pxon77.png','Một người đàn ông ngồi trên ghế, giữ chặt một đồng tiền vàng trước ngực, với hai đồng tiền dưới chân và một đồng tiền trên đầu, biểu thị sự bảo vệ và kiểm soát tài sản.','Ý nghĩa chung của Four of Pentacles là sự bảo vệ, kiểm soát và ổn định trong lĩnh vực tài chính. Nó khuyến khích bạn cân bằng giữa tiết kiệm và chia sẻ.','Khi ngược, lá bài này biểu thị sự buông bỏ, mất kiểm soát hoặc tiêu xài không hợp lý.','Four of Pentacles biểu thị sự giữ gìn, ổn định tài chính và nỗi sợ mất mát. Lá bài nhắc nhở bạn cẩn thận với cách quản lý tài sản.','2025-04-13 19:30:04'),(69,'Năm Tiền','Minor','Tiền',5,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523013/FiveOfPentacles_npbfyw.png','Hai người ăn mặc rách rưới đi qua một cửa sổ kính màu sáng chói của nhà thờ, biểu thị sự khó khăn và thiếu thốn.','Ý nghĩa chung của Five of Pentacles là sự khó khăn, mất mát và thách thức. Nó khuyến khích bạn tìm kiếm hỗ trợ và không đánh mất hy vọng.','Khi ngược, lá bài này biểu thị sự phục hồi, tìm thấy sự hỗ trợ hoặc vượt qua khó khăn tài chính.','Five of Pentacles biểu thị sự thiếu thốn, khó khăn tài chính và cảm giác bị cô lập. Lá bài nhắc nhở bạn tìm kiếm sự giúp đỡ và giữ vững niềm tin.','2025-04-13 19:30:04'),(70,'Sáu Tiền','Minor','Tiền',6,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523005/SixOfPentacles_uzgyfh.png','Một người đàn ông giàu có, cầm cân, trao tiền cho hai người nghèo khó đang quỳ dưới chân ông, biểu thị sự chia sẻ và lòng hào phóng.','Ý nghĩa chung của Six of Pentacles là sự hào phóng, hỗ trợ và cân bằng trong các mối quan hệ tài chính hoặc xã hội.','Khi ngược, lá bài này biểu thị sự bất công, lạm dụng lòng tốt hoặc sự thiếu cân bằng trong việc cho và nhận.','Six of Pentacles biểu thị sự cân bằng giữa cho và nhận, lòng hào phóng và sự hỗ trợ. Lá bài nhắc nhở bạn về giá trị của việc giúp đỡ người khác và sự công bằng.','2025-04-13 19:30:04'),(71,'Bảy Tiền','Minor','Tiền',7,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523004/SevenOfPentacles_ysccld.png','Một người nông dân tựa vào cây gậy, nhìn vào những đồng tiền vàng mọc trên cây, biểu thị sự kiên nhẫn và chờ đợi thành quả lao động.','Ý nghĩa chung của Seven of Pentacles là sự kiên nhẫn, lập kế hoạch và đầu tư lâu dài. Nó khuyến khích bạn xem xét kỹ lưỡng những gì bạn đã và đang làm.','Khi ngược, lá bài này biểu thị sự thiếu kiên nhẫn, không hài lòng với kết quả hoặc cảm giác lãng phí thời gian.','Seven of Pentacles đại diện cho sự kiên nhẫn, đầu tư dài hạn và chờ đợi kết quả. Lá bài nhắc nhở bạn đánh giá lại những nỗ lực của mình và kiên trì hướng tới mục tiêu.','2025-04-13 19:30:04'),(72,'Tám Tiền','Minor','Tiền',8,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523011/EightOfPentacles_y7o9k9.png','Một người thợ chăm chỉ khắc các đồng tiền vàng, tập trung vào từng chi tiết của công việc, biểu thị sự chăm chỉ và học hỏi.','Ý nghĩa chung của Eight of Pentacles là sự làm việc chăm chỉ, học hỏi và cải thiện bản thân. Nó khuyến khích bạn tập trung vào việc nâng cao khả năng của mình.','Khi ngược, lá bài này biểu thị sự thiếu tập trung, công việc kém chất lượng hoặc cảm giác không có tiến triển.','Eight of Pentacles biểu thị sự chăm chỉ, trau dồi kỹ năng và cống hiến cho công việc. Lá bài nhắc nhở bạn về giá trị của việc nỗ lực và cam kết để đạt được sự thành thạo.','2025-04-13 19:30:04'),(73,'Chín Tiền','Minor','Tiền',9,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523001/NineOfPentacles_tboaqv.png','Một người phụ nữ đứng trong khu vườn đầy nho chín, tay cầm một con chim, biểu thị sự thành đạt và tự hào về những gì mình đạt được.','Ý nghĩa chung của Nine of Pentacles là sự độc lập, thành tựu và niềm tự hào về công việc của bạn. Nó khuyến khích bạn biết ơn và tận hưởng thành quả lao động.','Khi ngược, lá bài này biểu thị sự phụ thuộc, mất tự tin hoặc cảm giác không hài lòng với thành quả.','Nine of Pentacles đại diện cho sự độc lập, tự hào và thành tựu cá nhân. Lá bài nhắc nhở bạn tận hưởng kết quả của những nỗ lực lâu dài.','2025-04-13 19:30:04'),(74,'Mười Tiền','Minor','Tiền',10,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523007/TenOfPentacles_wtphlj.png','Một gia đình ba thế hệ đứng dưới vòm đầy đồng tiền vàng, bên cạnh là hai chú chó, biểu thị sự thịnh vượng và gắn kết gia đình.','Ý nghĩa chung của Ten of Pentacles là sự thịnh vượng, ổn định và di sản gia đình. Nó khuyến khích bạn suy nghĩ xa hơn để đảm bảo sự bền vững.','Khi ngược, lá bài này biểu thị sự mất mát, xung đột gia đình hoặc các vấn đề về di sản.','Ten of Pentacles biểu thị sự giàu có, di sản và sự ổn định lâu dài. Lá bài nhắc nhở bạn về giá trị của việc xây dựng nền tảng bền vững cho tương lai.','2025-04-13 19:30:04'),(75,'Tiểu Đồng Tiền','Minor','Tiền',11,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523002/PageOfPentacles_n3hnmq.png','Một người trẻ tuổi cầm đồng tiền vàng, nhìn chăm chú, phía sau là cánh đồng rộng lớn, biểu thị sự khởi đầu và tiềm năng phát triển.','Ý nghĩa chung của Page of Pentacles là sự khởi đầu, học hỏi và tiềm năng. Nó khuyến khích bạn tập trung vào việc phát triển kỹ năng và khám phá cơ hội mới.','Khi ngược, lá bài này biểu thị sự thiếu tập trung, thiếu cam kết hoặc bỏ lỡ cơ hội học hỏi.','Page of Pentacles đại diện cho sự tò mò, học hỏi và khám phá trong lĩnh vực vật chất hoặc tài chính. Lá bài nhắc nhở bạn mở lòng để học hỏi và phát triển.','2025-04-13 19:30:04'),(76,'Hiệp Sĩ Tiền','Minor','Tiền',12,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523016/KnightOfPentacles_mhht9n.png','Một hiệp sĩ cưỡi ngựa đứng yên, cầm đồng tiền vàng, xung quanh là cánh đồng cày bừa sẵn sàng trồng trọt, biểu thị sự kiên nhẫn và bền bỉ.','Ý nghĩa chung của Knight of Pentacles là sự kiên trì, kỷ luật và làm việc chăm chỉ. Nó khuyến khích bạn duy trì sự ổn định để đạt được thành công.','Khi ngược, lá bài này biểu thị sự trì trệ, lười biếng hoặc quá tập trung vào chi tiết mà bỏ qua bức tranh lớn.','Knight of Pentacles biểu thị sự kiên nhẫn, trách nhiệm và sự nỗ lực để đạt được mục tiêu lâu dài. Lá bài nhắc nhở bạn tập trung vào công việc và kiên trì.','2025-04-13 19:30:04'),(77,'Hoàng Hậu Tiền','Minor','Tiền',13,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523003/QueenOfPentacles_tjolog.png','Một nữ hoàng ngồi trên ngai vàng được trang trí bằng các biểu tượng thiên nhiên, tay cầm một đồng tiền vàng, biểu thị sự nuôi dưỡng và phong phú.','Ý nghĩa chung của Queen of Pentacles là sự nuôi dưỡng, phong phú và thực tế. Nó khuyến khích bạn tận dụng nguồn lực của mình để chăm sóc bản thân và những người xung quanh.','Khi ngược, lá bài này biểu thị sự mất cân bằng giữa công việc và gia đình, hoặc cảm giác thiếu sự ổn định.','Queen of Pentacles đại diện cho sự phong phú, thực tế và sự chăm sóc. Lá bài nhắc nhở bạn kết hợp sự ổn định vật chất với lòng yêu thương và sự quan tâm.','2025-04-13 19:30:04'),(78,'Vua Tiền','Minor','Tiền',14,'https://res.cloudinary.com/dfp2ne3nn/image/upload/v1745523015/KingOfPentacles_n9g4vz.png','Một vị vua ngồi trên ngai vàng được trang trí bằng hình chạm khắc các con bò đực, tay cầm đồng tiền vàng, biểu thị sự ổn định và thành công.','Ý nghĩa chung của King of Pentacles là sự ổn định, lãnh đạo và thành công vật chất. Nó khuyến khích bạn xây dựng nền tảng vững chắc và tận hưởng thành quả.','Khi ngược, lá bài này biểu thị sự tham lam, thiếu trách nhiệm hoặc cảm giác không đủ khả năng để quản lý tài sản.','King of Pentacles biểu thị sự thành công, ổn định và khả năng lãnh đạo trong lĩnh vực vật chất. Lá bài nhắc nhở bạn sử dụng tài nguyên của mình một cách khôn ngoan.','2025-04-13 19:30:04');
/*!40000 ALTER TABLE `tarot_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarot_readings`
--

DROP TABLE IF EXISTS `tarot_readings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarot_readings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `topic_id` int NOT NULL,
  `spread_id` int NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `topic_id` (`topic_id`),
  KEY `spread_id` (`spread_id`),
  CONSTRAINT `tarot_readings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tarot_readings_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `tarot_topics` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tarot_readings_ibfk_3` FOREIGN KEY (`spread_id`) REFERENCES `tarot_spreads` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=662 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarot_readings`
--

LOCK TABLES `tarot_readings` WRITE;
/*!40000 ALTER TABLE `tarot_readings` DISABLE KEYS */;
INSERT INTO `tarot_readings` VALUES (565,5,1,1,'Tình yêu của tôi có tiến triển trong tháng này không?','2025-04-01 08:30:00'),(566,6,2,2,'Tôi có nên chuyển việc để phát triển sự nghiệp không?','2025-04-01 09:15:00'),(567,7,3,3,'Tài chính của tôi tuần này sẽ thế nào?','2025-04-01 10:00:00'),(568,8,4,1,'Tôi cần chú ý gì để cải thiện sức khỏe?','2025-04-01 11:45:00'),(569,9,5,2,'Tôi đang đi đúng hướng tâm linh không?','2025-04-01 13:20:00'),(570,10,1,3,'Làm sao để gia đình hòa thuận hơn?','2025-04-01 14:10:00'),(571,11,2,1,'Học tập của tôi có thuận lợi trong kỳ thi tới không?','2025-04-01 15:30:00'),(572,12,4,2,'Chuyến đi Đà Lạt sắp tới sẽ mang lại gì?','2025-04-01 16:50:00'),(573,13,1,3,'Người ấy có ý định nghiêm túc với tôi không?','2025-04-01 18:00:00'),(574,14,2,1,'Tôi nên chọn công việc nào để ổn định hơn?','2025-04-01 19:25:00'),(575,15,3,2,'Tôi có nên đầu tư vào dự án mới không?','2025-04-02 07:40:00'),(576,16,4,3,'Sức khỏe tinh thần của tôi cần cải thiện ra sao?','2025-04-02 08:55:00'),(577,17,5,1,'Trực giác của tôi đang nói gì về quyết định này?','2025-04-02 09:10:00'),(578,18,1,2,'Mối quan hệ với bố mẹ sẽ cải thiện thế nào?','2025-04-02 10:20:00'),(579,19,2,3,'Tôi có vượt qua bài kiểm tra tuần này không?','2025-04-02 11:30:00'),(580,20,4,1,'Nên đi du lịch ở đâu để thư giãn?','2025-04-02 12:45:00'),(581,21,1,2,'Mối quan hệ này có đáng để tiếp tục không?','2025-04-02 14:00:00'),(582,22,2,3,'Công việc hiện tại có phải là lựa chọn tốt nhất?','2025-04-02 15:15:00'),(583,23,3,1,'Tôi có nên tiết kiệm nhiều hơn không?','2025-04-02 16:30:00'),(584,24,4,2,'Tôi có cần thay đổi thói quen để khỏe hơn không?','2025-04-02 17:50:00'),(585,25,5,3,'Làm sao để kết nối sâu hơn với tâm linh?','2025-04-03 08:00:00'),(586,26,1,1,'Gia đình tôi có đón tin vui tháng này không?','2025-04-03 09:20:00'),(587,27,2,2,'Tôi nên tập trung vào môn học nào?','2025-04-03 10:40:00'),(588,28,4,3,'Chuyến đi sắp tới có an toàn không?','2025-04-03 11:55:00'),(589,29,1,1,'Tôi có gặp được người phù hợp trong năm nay không?','2025-04-03 13:10:00'),(590,30,2,2,'Dự án mới có thành công như mong đợi không?','2025-04-03 14:25:00'),(591,31,3,3,'Tài chính của tôi có ổn định trong quý tới không?','2025-04-03 15:40:00'),(592,32,4,1,'Tôi nên tập thể dục thế nào để khỏe hơn?','2025-04-03 16:50:00'),(593,33,5,2,'Tôi có nên tham gia khóa thiền không?','2025-04-03 18:00:00'),(594,34,1,3,'Làm sao để gắn kết với anh chị em trong nhà?','2025-04-03 19:15:00'),(595,35,2,1,'Kỳ thi tháng này sẽ thuận lợi chứ?','2025-04-04 08:30:00'),(596,36,4,2,'Du lịch nước ngoài có hợp với tôi bây giờ không?','2025-04-04 09:45:00'),(597,37,1,3,'Tình cảm của tôi có bền vững không?','2025-04-04 11:00:00'),(598,38,2,1,'Tôi có nên xin nghỉ việc để khởi nghiệp không?','2025-04-04 12:15:00'),(599,39,3,2,'Có nên mua cổ phiếu vào lúc này không?','2025-04-04 13:30:00'),(600,40,4,3,'Sức khỏe của tôi năm nay sẽ thế nào?','2025-04-04 14:45:00'),(601,41,5,1,'Tôi có đang bỏ lỡ điều gì tâm linh không?','2025-04-04 16:00:00'),(602,42,1,2,'Gia đình tôi có nên chuyển nhà không?','2025-04-04 17:20:00'),(603,43,2,3,'Tôi có nên học thêm một kỹ năng mới không?','2025-04-04 18:35:00'),(604,44,4,1,'Chuyến đi Phú Quốc sẽ mang lại gì?','2025-04-04 19:50:00'),(605,45,1,2,'Tôi có nên bày tỏ tình cảm với người ấy không?','2025-04-05 08:10:00'),(606,46,2,3,'Công việc mới có phù hợp với tôi không?','2025-04-05 09:25:00'),(607,47,3,1,'Tôi có nên chi tiêu nhiều vào việc này không?','2025-04-05 10:40:00'),(608,48,4,2,'Tôi cần làm gì để ngủ ngon hơn?','2025-04-05 11:55:00'),(609,49,5,3,'Hành trình tâm linh của tôi sẽ đi đâu?','2025-04-05 13:10:00'),(610,50,1,1,'Mối quan hệ với con cái sẽ thế nào?','2025-04-05 14:25:00'),(611,5,2,2,'Tôi có nên đăng ký khóa học online không?','2025-04-05 15:40:00'),(612,6,4,3,'Chuyến đi Hà Nội có đáng để mong chờ không?','2025-04-05 16:55:00'),(613,7,1,1,'Tình yêu hiện tại có phải định mệnh không?','2025-04-05 18:10:00'),(614,8,2,2,'Tôi có được thưởng cuối năm không?','2025-04-05 19:25:00'),(615,9,3,3,'Tài chính tháng này có dư dả không?','2025-04-06 08:30:00'),(616,10,4,1,'Tôi có cần kiểm tra sức khỏe định kỳ không?','2025-04-06 09:45:00'),(617,11,5,2,'Tôi có nên tin vào giấc mơ gần đây không?','2025-04-06 11:00:00'),(618,12,1,3,'Gia đình có đón thêm thành viên mới không?','2025-04-06 12:15:00'),(619,13,2,1,'Học tập của tôi có cải thiện không?','2025-04-06 13:30:00'),(620,14,4,2,'Chuyến đi Sapa sẽ mang lại cảm hứng gì?','2025-04-06 14:45:00'),(621,15,1,3,'Tôi có nên tiếp tục chờ đợi người ấy không?','2025-04-06 16:00:00'),(622,16,2,1,'Tôi nên chọn ngành nghề nào để phát triển?','2025-04-06 17:15:00'),(623,17,3,2,'Có nên bán tài sản lúc này không?','2025-04-06 18:30:00'),(624,18,4,3,'Tôi có thể cải thiện tinh thần thế nào?','2025-04-06 19:45:00'),(625,19,5,1,'Tôi có đang kết nối đúng với tâm linh không?','2025-04-07 08:00:00'),(626,20,1,2,'Làm sao để hòa giải với người thân?','2025-04-07 09:15:00'),(627,21,2,3,'Khóa học mới có đáng để đầu tư không?','2025-04-07 10:30:00'),(628,22,4,1,'Chuyến đi Đà Nẵng sẽ thế nào?','2025-04-07 11:45:00'),(629,23,1,2,'Tình yêu của tôi có vượt qua thử thách không?','2025-04-07 13:00:00'),(630,24,2,3,'Tôi có nên mở rộng kinh doanh không?','2025-04-07 14:15:00'),(631,25,3,1,'Tài chính của tôi có ổn trong tháng tới không?','2025-04-07 15:30:00'),(632,26,4,2,'Tôi nên ăn uống thế nào để khỏe hơn?','2025-04-07 16:45:00'),(633,27,5,3,'Tôi có nên thử phương pháp tâm linh mới không?','2025-04-07 18:00:00'),(634,28,1,1,'Gia đình tôi có nên tổ chức họp mặt không?','2025-04-07 19:15:00'),(635,29,2,2,'Học tập của tôi sẽ tiến bộ ra sao?','2025-04-08 08:30:00'),(636,30,4,3,'Chuyến đi Huế có mang lại bình yên không?','2025-04-08 09:45:00'),(637,31,1,1,'Tôi có gặp được tình yêu mới không?','2025-04-08 11:00:00'),(638,32,2,2,'Công việc hiện tại có mang lại thành công không?','2025-04-08 12:15:00'),(639,33,3,3,'Tôi có nên đầu tư vào vàng không?','2025-04-08 13:30:00'),(640,34,4,1,'Sức khỏe của tôi cần cải thiện điều gì?','2025-04-08 14:45:00'),(641,35,5,2,'Tôi có đang bỏ lỡ thông điệp tâm linh nào không?','2025-04-08 16:00:00'),(642,36,1,3,'Làm sao để cải thiện mối quan hệ gia đình?','2025-04-08 17:15:00'),(643,37,2,1,'Tôi có nên tham gia khóa học ngắn hạn không?','2025-04-08 18:30:00'),(644,38,4,2,'Chuyến đi Hội An sẽ mang lại gì?','2025-04-08 19:45:00'),(645,39,1,3,'Tình yêu của tôi sẽ ra sao trong tương lai?','2025-04-09 08:00:00'),(646,40,2,1,'Tôi có nên hợp tác với đối tác mới không?','2025-04-09 09:15:00'),(647,41,3,2,'Tài chính của tôi có khởi sắc không?','2025-04-10 10:30:00'),(648,42,4,3,'Tôi cần làm gì để giảm căng thẳng?','2025-04-10 11:45:00'),(649,43,5,1,'Trực giác của tôi đang dẫn tôi đi đâu?','2025-04-11 13:00:00'),(650,44,1,2,'Gia đình tôi có vượt qua khó khăn không?','2025-04-11 14:15:00'),(651,45,2,3,'Học tập của tôi có kết quả tốt không?','2025-04-12 15:30:00'),(652,46,4,1,'Chuyến đi Nha Trang sẽ thế nào?','2025-04-12 16:45:00'),(653,47,1,2,'Tôi có nên tin tưởng vào mối quan hệ này không?','2025-04-13 18:00:00'),(654,48,2,3,'Công việc của tôi sẽ phát triển thế nào?','2025-04-13 19:15:00'),(655,49,3,1,'Tôi có nên tiết kiệm cho kế hoạch lớn không?','2025-04-13 20:30:00'),(656,50,4,2,'Tôi có cần thay đổi lối sống để khỏe hơn không?','2025-04-13 21:45:00'),(657,5,5,3,'Tôi nên thực hành tâm linh như thế nào?','2025-04-09 10:00:00'),(658,6,1,1,'Mối quan hệ với anh trai sẽ thế nào?','2025-04-09 14:00:00'),(659,7,2,2,'Tôi có nên học tiếp lên cao học không?','2025-04-10 16:00:00'),(660,8,4,3,'Chuyến đi biển sắp tới có vui không?','2025-04-11 18:00:00'),(661,9,1,1,'Tôi có nên hẹn hò với đồng nghiệp không?','2025-04-12 20:00:00');
/*!40000 ALTER TABLE `tarot_readings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarot_spreads`
--

DROP TABLE IF EXISTS `tarot_spreads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarot_spreads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `position_labels` json DEFAULT NULL,
  `number_of_cards` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarot_spreads`
--

LOCK TABLES `tarot_spreads` WRITE;
/*!40000 ALTER TABLE `tarot_spreads` DISABLE KEYS */;
INSERT INTO `tarot_spreads` VALUES (1,'Ba Lá','Bố cục đơn giản để xem quá khứ, hiện tại, tương lai.','{\"positions\": [{\"index\": 1, \"label\": \"Quá Khứ\"}, {\"index\": 2, \"label\": \"Hiện Tại\"}, {\"index\": 3, \"label\": \"Tương Lai\"}]}',3),(3,'Một Lá','Rút một lá để nhận thông điệp nhanh.','{\"positions\": [{\"index\": 1, \"label\": \"Thông Điệp\"}]}',1);
/*!40000 ALTER TABLE `tarot_spreads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarot_topics`
--

DROP TABLE IF EXISTS `tarot_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarot_topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarot_topics`
--

LOCK TABLES `tarot_topics` WRITE;
/*!40000 ALTER TABLE `tarot_topics` DISABLE KEYS */;
INSERT INTO `tarot_topics` VALUES (1,'Tình Yêu','Tìm hiểu về mối quan hệ, tình cảm và những kết nối cá nhân.'),(2,'Sự Nghiệp','Khám phá cơ hội, thách thức và định hướng trong công việc.'),(3,'Tài Chính','Xem xét tình hình tài chính, đầu tư và quản lý tiền bạc.'),(4,'Sức Khỏe','Nhận gợi ý về sức khỏe thể chất và tinh thần.'),(5,'Tâm Linh','Kết nối với bản thân và tìm kiếm sự bình an trong tâm hồn.');
/*!40000 ALTER TABLE `tarot_topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_achievements`
--

DROP TABLE IF EXISTS `user_achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `achievement_id` int NOT NULL,
  `achieved_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_achievement` (`user_id`,`achievement_id`),
  KEY `achievement_id` (`achievement_id`),
  CONSTRAINT `user_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_achievements_ibfk_2` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_achievements`
--

LOCK TABLES `user_achievements` WRITE;
/*!40000 ALTER TABLE `user_achievements` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorites`
--

DROP TABLE IF EXISTS `user_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_type` enum('card','spread','topic','post') COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_favorite` (`user_id`,`item_type`,`item_id`),
  CONSTRAINT `user_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorites`
--

LOCK TABLES `user_favorites` WRITE;
/*!40000 ALTER TABLE `user_favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_follows`
--

DROP TABLE IF EXISTS `user_follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_follows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower_id` int NOT NULL,
  `following_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_follow` (`follower_id`,`following_id`),
  KEY `following_id` (`following_id`),
  CONSTRAINT `user_follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_follows_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follows`
--

LOCK TABLES `user_follows` WRITE;
/*!40000 ALTER TABLE `user_follows` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES (2,52,'Trần Bằng',NULL,NULL,NULL,'2025-04-25 20:08:42','2025-04-25 20:08:42',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ranks`
--

DROP TABLE IF EXISTS `user_ranks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ranks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `min_points` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `badge_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ranks`
--

LOCK TABLES `user_ranks` WRITE;
/*!40000 ALTER TABLE `user_ranks` DISABLE KEYS */;
INSERT INTO `user_ranks` VALUES (1,'Nhà Khám Phá','Thành viên mới bắt đầu hành trình Tarot',0,'2025-04-20 17:32:00',NULL,NULL),(2,'Tầm Linh Học','Đã có kiến thức cơ bản về Tarot',100,'2025-04-20 17:32:00',NULL,NULL),(3,'Hiền Triết','Thành viên có kiến thức sâu rộng về Tarot',500,'2025-04-20 17:32:00',NULL,NULL),(4,'Cộng Đồng','Thành viên tích cực đóng góp cho cộng đồng',1000,'2025-04-20 17:32:00',NULL,NULL);
/*!40000 ALTER TABLE `user_ranks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_stats`
--

DROP TABLE IF EXISTS `user_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `readings_count` int DEFAULT '0',
  `forum_posts_count` int DEFAULT '0',
  `forum_comments_count` int DEFAULT '0',
  `last_reading_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `user_stats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_stats`
--

LOCK TABLES `user_stats` WRITE;
/*!40000 ALTER TABLE `user_stats` DISABLE KEYS */;
INSERT INTO `user_stats` VALUES (2,52,0,0,0,NULL,'2025-04-25 20:08:42','2025-04-25 20:08:42');
/*!40000 ALTER TABLE `user_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `user_summary`
--

DROP TABLE IF EXISTS `user_summary`;
/*!50001 DROP VIEW IF EXISTS `user_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_summary` AS SELECT 
 1 AS `id`,
 1 AS `username`,
 1 AS `display_name`,
 1 AS `avatar_url`,
 1 AS `rank_name`,
 1 AS `points`,
 1 AS `is_premium`,
 1 AS `member_since`,
 1 AS `readings_count`,
 1 AS `forum_posts_count`,
 1 AS `favorite_topic`,
 1 AS `achievements_count`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `is_premium` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `rank_id` int DEFAULT NULL,
  `points` int DEFAULT '0',
  `last_login` datetime DEFAULT NULL,
  `premium_until` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `email_4` (`email`),
  KEY `idx_username` (`username`),
  KEY `idx_email` (`email`),
  KEY `rank_id` (`rank_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rank_id`) REFERENCES `user_ranks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin1','admin1@tarot.vn','$2b$10$exampleHashForAdmin1','admin',0,'2025-04-13 19:34:54','2025-04-13 19:34:54',NULL,0,NULL,NULL),(2,'nguyenanh','nguyenanh@gmail.com','$2b$10$exampleHashForUser1','user',0,'2025-04-13 19:34:54','2025-04-13 19:34:54',NULL,0,NULL,NULL),(3,'trangcute','trangcute@gmail.com','$2b$10$exampleHashForUser2','user',1,'2025-04-13 19:34:54','2025-04-13 19:34:54',NULL,0,NULL,NULL),(4,'minhpro','minhpro@gmail.com','$2b$10$exampleHashForUser3','user',0,'2025-04-13 19:34:54','2025-04-13 19:34:54',NULL,0,NULL,NULL),(5,'lanhuong','lanhuong@gmail.com','$2b$10$hashForUser5','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(6,'hoanglong','hoanglong@gmail.com','$2b$10$hashForUser6','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(7,'thanhmai','thanhmai@gmail.com','$2b$10$hashForUser7','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(8,'minhduc','minhduc@gmail.com','$2b$10$hashForUser8','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(9,'ngoctram','ngoctram@gmail.com','$2b$10$hashForUser9','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(10,'phuonganh','phuonganh@gmail.com','$2b$10$hashForUser10','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(11,'quangvinh','quangvinh@gmail.com','$2b$10$hashForUser11','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(12,'huyenmi','huyenmi@gmail.com','$2b$10$hashForUser12','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(13,'tuananh','tuananh@gmail.com','$2b$10$hashForUser13','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(14,'kimlien','kimlien@gmail.com','$2b$10$hashForUser14','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(15,'baoloc','baoloc@gmail.com','$2b$10$hashForUser15','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(16,'thuha','thuha@gmail.com','$2b$10$hashForUser16','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(17,'duongminh','duongminh@gmail.com','$2b$10$hashForUser17','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(18,'hongngoc','hongngoc@gmail.com','$2b$10$hashForUser18','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(19,'vietanh','vietanh@gmail.com','$2b$10$hashForUser19','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(20,'thuyduong','thuyduong@gmail.com','$2b$10$hashForUser20','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(21,'khanhlinh','khanhlinh@gmail.com','$2b$10$hashForUser21','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(22,'ngochai','ngochai@gmail.com','$2b$10$hashForUser22','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(23,'trunghieu','trunghieu@gmail.com','$2b$10$hashForUser23','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(24,'anhtuyet','anhtuyet@gmail.com','$2b$10$hashForUser24','user',1,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(25,'binhminh','binhminh@gmail.com','$2b$10$hashForUser25','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(26,'thuylinh','thuylinh@gmail.com','$2b$10$hashForUser26','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(27,'hoangyen','hoangyen@gmail.com','$2b$10$hashForUser27','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(28,'danhthanh','danhthanh@gmail.com','$2b$10$hashForUser28','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(29,'maianh','maianh@gmail.com','$2b$10$hashForUser29','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(30,'tamngoc','tamngoc@gmail.com','$2b$10$hashForUser30','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(31,'quanghuy','quanghuy@gmail.com','$2b$10$hashForUser31','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(32,'phuongthao','phuongthao@gmail.com','$2b$10$hashForUser32','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(33,'minhquan','minhquan@gmail.com','$2b$10$hashForUser33','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(34,'thuytrang','thuytrang@gmail.com','$2b$10$hashForUser34','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(35,'anhthu','anhthu@gmail.com','$2b$10$hashForUser35','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(36,'ngoclam','ngoclam@gmail.com','$2b$10$hashForUser36','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(37,'hoangkha','hoangkha@gmail.com','$2b$10$hashForUser37','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(38,'thanhhuong','thanhhuong@gmail.com','$2b$10$hashForUser38','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(39,'ducanh','ducanh@gmail.com','$2b$10$hashForUser39','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(40,'thutrang','thutrang@gmail.com','$2b$10$hashForUser40','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(41,'minhhang','minhhang@gmail.com','$2b$10$hashForUser41','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(42,'quocbao','quocbao@gmail.com','$2b$10$hashForUser42','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(43,'ngocanh','ngocanh@gmail.com','$2b$10$hashForUser43','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(44,'thuytien','thuytien@gmail.com','$2b$10$hashForUser44','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(45,'tronghieu','tronghieu@gmail.com','$2b$10$hashForUser45','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(46,'yennhi','yennhi@gmail.com','$2b$10$hashForUser46','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(47,'vananh','vananh@gmail.com','$2b$10$hashForUser47','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(48,'khoinguyen','khoinguyen@gmail.com','$2b$10$hashForUser48','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(49,'linhchi','linhchi@gmail.com','$2b$10$hashForUser49','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(50,'phucanh','phucanh@gmail.com','$2b$10$hashForUser50','user',0,'2025-04-13 20:09:51','2025-04-13 20:09:51',NULL,0,NULL,NULL),(52,'trần_bằng','tranbang1445@gmail.com','$2b$10$sCi8Ixq4xpT8p9Qr/4AUJuMYKUt3wIjz1cFcDtM.ayggG0.soxeq2','user',0,'2025-04-25 20:08:42','2025-04-25 20:16:15',1,0,'2025-04-25 20:16:15',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `user_summary`
--

/*!50001 DROP VIEW IF EXISTS `user_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_summary` AS select `u`.`id` AS `id`,`u`.`username` AS `username`,coalesce(`up`.`full_name`,`u`.`username`) AS `display_name`,`up`.`avatar_url` AS `avatar_url`,`ur`.`name` AS `rank_name`,`u`.`points` AS `points`,`u`.`is_premium` AS `is_premium`,`u`.`created_at` AS `member_since`,coalesce(`us`.`readings_count`,0) AS `readings_count`,coalesce(`us`.`forum_posts_count`,0) AS `forum_posts_count`,NULL AS `favorite_topic`,(select count(0) from `user_achievements` where (`user_achievements`.`user_id` = `u`.`id`)) AS `achievements_count` from ((((`users` `u` left join `user_profiles` `up` on((`u`.`id` = `up`.`user_id`))) left join `user_ranks` `ur` on((`u`.`rank_id` = `ur`.`id`))) left join `user_stats` `us` on((`u`.`id` = `us`.`user_id`))) left join `tarot_topics` `t` on((1 = 0))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-13 20:50:18


