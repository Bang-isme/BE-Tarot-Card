const jwt = require('jsonwebtoken');
const axios = require('axios');
const db = require('../models');
const User = db.users;
const UserProfile = db.userProfiles;
const UserStats = db.userStats;
const SocialAuth = db.socialAuth;
const { Op } = db.Sequelize;

// Helper function to generate token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'c83aa3a0b3e6a32ddb3d67e0d1bc5de4ba44581ebae8ec98a3c05394f67795d010f2751fcccc971c01f8cf09592ace9b874ec6b0808f2e8b7cba8a884574d3875c5d44f50d684b5ff6cacfef44d32e0fd574e954ad86a77655f697f4388db2f9adf9506bda1a45a20d6f2bb6ac5335090f097f33ea9e49e05726a67febeba10b2b92bf9ae4dfa9f768a5e24e7b76969e6f58e7371e85f2d28a21eb2b9c71f93e319745585b64cefce9820837610370a1f9ad8151e83923a6737276f60a5f81d188250e093c0a18e8cb1100fecb79c61b702b60021d31be431e6f291a9c34d27c44488b9dad22058b9f384fa53e9ffa5cbc582c77d13870ae40044d519cca13e1',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Handler cho Facebook login
exports.facebookLogin = async (req, res, next) => {
  try {
    const { accessToken, userInfo } = req.body;
    
    console.log('Received Facebook login request:', { 
      hasAccessToken: !!accessToken,
      hasUserInfo: !!userInfo,
      deviceInfo: req.body.clientInfo || 'Not provided'
    });
    
    if (!accessToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Access token is required',
        errorCode: 'MISSING_ACCESS_TOKEN'
      });
    }
    
    // Verify token with Facebook Graph API
    let fbUserData;
    try {
      // Sử dụng API phiên bản v22
      const fbResponse = await axios.get('https://graph.facebook.com/v22.0/me', {
        params: {
          fields: 'id,name,email,picture.type(large)',
          access_token: accessToken
        },
        timeout: 10000 // Thêm timeout 10 giây
      });
      fbUserData = fbResponse.data;
      
      // Xác thực dữ liệu trả về
      if (!fbUserData || !fbUserData.id) {
        console.error('Invalid data returned from Facebook API');
        return res.status(401).json({
          status: 'error',
          message: 'Invalid data returned from Facebook API',
          errorCode: 'INVALID_FB_DATA'
        });
      }
      
      console.log('Facebook user data retrieved:', {
        id: fbUserData.id,
        name: fbUserData.name,
        hasEmail: !!fbUserData.email,
        hasPicture: !!fbUserData.picture?.data?.url
      });
    } catch (error) {
      console.error('Facebook API Error:', error.response ? error.response.data : error.message);
      
      let errorMessage = 'Invalid Facebook access token';
      let errorCode = 'INVALID_FB_TOKEN';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Connection to Facebook API timed out';
        errorCode = 'FB_API_TIMEOUT';
      } else if (error.response) {
        errorMessage = `Facebook API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`;
        errorCode = `FB_API_ERROR_${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No response received from Facebook API';
        errorCode = 'FB_API_NO_RESPONSE';
      }
      
      return res.status(401).json({
        status: 'error',
        message: errorMessage,
        errorCode: errorCode,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    // Check if we have this Facebook account in our system
    let user = null;
    let socialAuth = null;
    
    try {
      // Chỉ lấy các trường cơ bản trước để tránh lỗi
      socialAuth = await SocialAuth.findOne({
        where: {
          provider: 'facebook',
          provider_id: fbUserData.id
        },
        include: [{
          model: User,
          attributes: ['id', 'username', 'email', 'role', 'is_premium', 'points', 'created_at']
        }]
      });
      
      if (socialAuth) {
        console.log('Found existing social auth record:', socialAuth.id);
      }
    } catch (error) {
      console.error('Error finding social auth record:', error);
      
      // Vẫn tiếp tục vì có thể đây là lần đầu đăng nhập
      socialAuth = null;
    }
    
    // Transaction to ensure data consistency
    const transaction = await db.sequelize.transaction();
    
    try {
      if (socialAuth) {
        // User with this Facebook account exists
        user = socialAuth.user;
        
        // Update user's last login
        await User.update(
          { last_login: new Date() },
          { 
            where: { id: user.id },
            transaction
          }
        );
        
        // Cập nhật thông tin SocialAuth nếu có email mới
        if (fbUserData.email && socialAuth.provider_email !== fbUserData.email) {
          await SocialAuth.update(
            { provider_email: fbUserData.email },
            { 
              where: { id: socialAuth.id },
              transaction
            }
          );
        }
        
        // Cập nhật access_data để lưu thông tin mới nhất
        await SocialAuth.update(
          { 
            access_data: {
              last_token_date: new Date().toISOString(),
              picture: fbUserData.picture?.data?.url || null
            }
          },
          { 
            where: { id: socialAuth.id },
            transaction
          }
        );
      } else {
        // No user with this Facebook id exists yet, check if email exists
        let existingUser = null;
        if (fbUserData.email) {
          existingUser = await User.findOne({
            where: { email: fbUserData.email },
            transaction
          });
        }
        
        if (existingUser) {
          // User with this email exists, link Facebook account
          await SocialAuth.create({
            user_id: existingUser.id,
            provider: 'facebook',
            provider_id: fbUserData.id,
            provider_email: fbUserData.email || null,
            access_data: {
              linked_at: new Date().toISOString(),
              picture: fbUserData.picture?.data?.url || null
            }
          }, { transaction });
          
          // Update user's profile
          const userProfile = await UserProfile.findOne({
            where: { user_id: existingUser.id },
            transaction
          });
          
          // Update avatar if the user doesn't have one
          if (userProfile && !userProfile.avatar_url && fbUserData.picture?.data?.url) {
            await UserProfile.update(
              { avatar_url: fbUserData.picture.data.url },
              { 
                where: { user_id: existingUser.id },
                transaction
              }
            );
          }
          
          // Update last login
          await User.update(
            { last_login: new Date() },
            { 
              where: { id: existingUser.id },
              transaction
            }
          );
          
          user = await User.findByPk(existingUser.id, {
            attributes: ['id', 'username', 'email', 'role', 'is_premium', 'points', 'created_at'],
            transaction
          });
        } else {
          // Create new user
          // Generate username from name or use a placeholder
          const baseUsername = fbUserData.name?.toLowerCase().replace(/\s+/g, '_') || `fb_user_${Date.now()}`;
          let username = baseUsername;
          let counter = 1;
          
          // Check for username conflicts
          while (await User.findOne({ where: { username }, transaction })) {
            username = `${baseUsername}${counter++}`;
          }
          
          // Get the default rank_id
          const defaultRank = await db.userRanks.findOne({ 
            order: [['min_points', 'ASC']], 
            transaction 
          });
          
          // Create user with random password for security
          const newUser = await User.create({
            username,
            email: fbUserData.email || null, // Có thể null nếu user không chia sẻ email
            password_hash: Math.random().toString(36).slice(-8), // Password ngẫu nhiên
            role: 'user',
            is_premium: false,
            points: 0,
            last_login: new Date(),
            rank_id: defaultRank?.id || 1 // Đảm bảo rank_id hợp lệ
          }, { transaction });
          
          // Create user profile with avatar from Facebook
          await UserProfile.create({
            user_id: newUser.id,
            avatar_url: fbUserData.picture?.data?.url || null,
            full_name: fbUserData.name || null
          }, { transaction });
          
          // Create user stats
          await UserStats.create({
            user_id: newUser.id,
            readings_count: 0,
            forum_posts_count: 0,
            forum_comments_count: 0
          }, { transaction });
          
          // Create social auth record with all available data
          await SocialAuth.create({
            user_id: newUser.id,
            provider: 'facebook',
            provider_id: fbUserData.id,
            provider_email: fbUserData.email || null,
            access_data: {
              created_at: new Date().toISOString(),
              picture: fbUserData.picture?.data?.url || null,
              name: fbUserData.name || null
            }
          }, { transaction });
          
          user = await User.findByPk(newUser.id, {
            attributes: ['id', 'username', 'email', 'role', 'is_premium', 'points', 'created_at'],
            transaction
          });
        }
      }
      
      // Get user profile to include in response
      const userProfile = await UserProfile.findOne({
        where: { user_id: user.id },
        attributes: ['avatar_url', 'full_name'],
        transaction
      });
      
      // Enriched user data with profile info
      const userData = {
        ...user.get(),
        avatar_url: userProfile?.avatar_url || null,
        full_name: userProfile?.full_name || null
      };
      
      // Commit transaction
      await transaction.commit();
      
      // Generate token
      const token = generateToken(user.id);
      
      // Return success response
      res.status(200).json({
        status: 'success',
        message: 'Facebook login successful',
        data: {
          accessToken: token,
          userInfo: {
            id: userData.id,
            name: userData.full_name || userData.username,
            avatar_url: userData.avatar_url
          }
        }
      });
    } catch (error) {
      // Rollback in case of error
      await transaction.rollback();
      console.error('Transaction error:', error);
      
      // Xử lý lỗi "Unknown column" với thông báo rõ ràng hơn
      if (error.name === 'SequelizeDatabaseError' && error.parent && error.parent.code === 'ER_BAD_FIELD_ERROR') {
        return res.status(500).json({
          status: 'error',
          message: 'Database schema mismatch - please run database migration',
          errorCode: 'DB_SCHEMA_MISMATCH',
          details: error.parent.sqlMessage
        });
      }
      
      // Phân loại các lỗi database khác
      if (error.name === 'SequelizeDatabaseError') {
        return res.status(500).json({
          status: 'error',
          message: 'Database error during authentication',
          errorCode: 'DB_ERROR',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
      
      throw error;
    }
  } catch (error) {
    console.error('Facebook login error:', error);
    
    // Đảm bảo luôn trả về response chi tiết cho client
    if (!res.headersSent) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error during authentication',
        errorCode: 'AUTH_INTERNAL_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    next(error);
  }
}; 