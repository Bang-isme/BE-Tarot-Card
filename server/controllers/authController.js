/**
 * Controller xử lý các chức năng xác thực
 */
const { pool } = require('../config/database');
const { verifyFacebookToken, verifyGoogleToken } = require('../utils/socialAuth');
const { generateToken } = require('../utils/jwt');
const axios = require('axios');

/**
 * Xử lý đăng nhập bằng Facebook
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
async function facebookLogin(req, res) {
  // Lấy kết nối từ pool
  const connection = await pool.getConnection();
  
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token không được cung cấp'
      });
    }
    
    // Xác thực token với Facebook API
    const facebookData = await verifyFacebookToken(token);
    
    await connection.beginTransaction();
    
    // Kiểm tra xem người dùng đã tồn tại trong bảng social_auth chưa
    const [socialUsers] = await connection.execute(
      'SELECT * FROM social_auth WHERE provider = ? AND provider_id = ?',
      ['facebook', facebookData.id]
    );
    
    let userId;
    
    if (socialUsers.length > 0) {
      // Người dùng đã đăng nhập bằng Facebook trước đó
      userId = socialUsers[0].user_id;
      
      // Cập nhật token mới
      await connection.execute(
        'UPDATE social_auth SET token = ?, updated_at = NOW() WHERE id = ?',
        [token, socialUsers[0].id]
      );
    } else {
      // Kiểm tra xem email đã tồn tại trong hệ thống chưa
      const [existingUsers] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [facebookData.email]
      );
      
      if (existingUsers.length > 0) {
        // Người dùng đã tồn tại với email này, liên kết tài khoản
        userId = existingUsers[0].id;
        
        // Thêm vào bảng social_auth
        await connection.execute(
          'INSERT INTO social_auth (user_id, provider, provider_id, token, profile_data, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
          [userId, 'facebook', facebookData.id, token, JSON.stringify(facebookData)]
        );
      } else {
        // Tạo người dùng mới
        const [result] = await connection.execute(
          'INSERT INTO users (username, email, status, role, created_at) VALUES (?, ?, ?, ?, NOW())',
          [facebookData.name.substring(0, 50), facebookData.email, 'active', 'user']
        );
        
        userId = result.insertId;
        
        // Thêm vào bảng social_auth
        await connection.execute(
          'INSERT INTO social_auth (user_id, provider, provider_id, token, profile_data, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
          [userId, 'facebook', facebookData.id, token, JSON.stringify(facebookData)]
        );
        
        // Kiểm tra và tạo profile cho người dùng
        const [existingProfile] = await connection.execute(
          'SELECT * FROM user_profiles WHERE user_id = ?',
          [userId]
        );
        
        if (existingProfile.length === 0) {
          // Tạo profile cho người dùng
          await connection.execute(
            'INSERT INTO user_profiles (user_id, display_name, avatar_url, created_at) VALUES (?, ?, ?, NOW())',
            [userId, facebookData.name, facebookData.picture?.data?.url || null]
          );
        }
      }
    }
    
    // Lấy thông tin người dùng
    const [users] = await connection.execute(
      `SELECT u.*, p.display_name, p.avatar_url 
       FROM users u 
       LEFT JOIN user_profiles p ON u.id = p.user_id 
       WHERE u.id = ?`,
      [userId]
    );
    
    if (users.length === 0) {
      throw new Error('Người dùng không tồn tại');
    }
    
    const user = users[0];
    
    await connection.commit();
    
    // Tạo JWT token
    const jwtToken = generateToken(user);
    
    // Trả về thông tin người dùng và token
    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.display_name || user.username,
          email: user.email,
          avatar: user.avatar_url,
          isAdmin: user.role === 'admin'
        },
        token: jwtToken
      }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Facebook login error:', error);
    return res.status(401).json({
      success: false,
      message: 'Xác thực Facebook thất bại: ' + error.message
    });
  } finally {
    connection.release();
  }
}

/**
 * Xử lý đăng nhập bằng Google
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
async function googleLogin(req, res) {
  // Lấy kết nối từ pool
  const connection = await pool.getConnection();
  
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token không được cung cấp'
      });
    }
    
    // Lấy thông tin người dùng từ token sử dụng Google API
    const googleUserResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Dữ liệu người dùng từ Google
    const googleData = googleUserResponse.data;
    
    await connection.beginTransaction();
    
    // Kiểm tra xem người dùng đã tồn tại trong bảng social_auth chưa
    const [socialUsers] = await connection.execute(
      'SELECT * FROM social_auth WHERE provider = ? AND provider_id = ?',
      ['google', googleData.id]
    );
    
    let userId;
    
    if (socialUsers.length > 0) {
      // Người dùng đã đăng nhập bằng Google trước đó
      userId = socialUsers[0].user_id;
      
      // Cập nhật token mới
      await connection.execute(
        'UPDATE social_auth SET token = ?, updated_at = NOW() WHERE id = ?',
        [token, socialUsers[0].id]
      );
    } else {
      // Kiểm tra xem email đã tồn tại trong hệ thống chưa
      const [existingUsers] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [googleData.email]
      );
      
      if (existingUsers.length > 0) {
        // Người dùng đã tồn tại với email này, liên kết tài khoản
        userId = existingUsers[0].id;
        
        // Thêm vào bảng social_auth
        await connection.execute(
          'INSERT INTO social_auth (user_id, provider, provider_id, token, profile_data, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
          [userId, 'google', googleData.id, token, JSON.stringify(googleData)]
        );
      } else {
        // Tạo người dùng mới
        const [result] = await connection.execute(
          'INSERT INTO users (username, email, status, role, created_at) VALUES (?, ?, ?, ?, NOW())',
          [googleData.name.substring(0, 50), googleData.email, 'active', 'user']
        );
        
        userId = result.insertId;
        
        // Thêm vào bảng social_auth
        await connection.execute(
          'INSERT INTO social_auth (user_id, provider, provider_id, token, profile_data, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
          [userId, 'google', googleData.id, token, JSON.stringify(googleData)]
        );
        
        // Kiểm tra và tạo profile cho người dùng
        const [existingProfile] = await connection.execute(
          'SELECT * FROM user_profiles WHERE user_id = ?',
          [userId]
        );
        
        if (existingProfile.length === 0) {
          // Tạo profile cho người dùng
          await connection.execute(
            'INSERT INTO user_profiles (user_id, display_name, avatar_url, created_at) VALUES (?, ?, ?, NOW())',
            [userId, googleData.name, googleData.picture || null]
          );
        }
      }
    }
    
    // Lấy thông tin người dùng
    const [users] = await connection.execute(
      `SELECT u.*, p.display_name, p.avatar_url 
       FROM users u 
       LEFT JOIN user_profiles p ON u.id = p.user_id 
       WHERE u.id = ?`,
      [userId]
    );
    
    if (users.length === 0) {
      throw new Error('Người dùng không tồn tại');
    }
    
    const user = users[0];
    
    await connection.commit();
    
    // Tạo JWT token
    const jwtToken = generateToken(user);
    
    // Trả về thông tin người dùng và token
    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.display_name || user.username,
          email: user.email,
          avatar: user.avatar_url,
          isAdmin: user.role === 'admin'
        },
        token: jwtToken
      }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Google login error:', error);
    return res.status(401).json({
      success: false,
      message: 'Xác thực Google thất bại: ' + error.message
    });
  } finally {
    connection.release();
  }
}

/**
 * Xử lý trao đổi Google authorization code lấy token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
async function googleExchangeCode(req, res) {
  // Lấy kết nối từ pool
  const connection = await pool.getConnection();
  
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Authorization code không được cung cấp'
      });
    }
    
    // Lấy Google Client ID và Secret từ biến môi trường
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = 'http://localhost:3000';
    
    if (!clientId || !clientSecret) {
      throw new Error('Google Client ID hoặc Client Secret không được cấu hình');
    }
    
    // Trao đổi code lấy token từ Google OAuth2
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    });
    
    const { id_token, access_token } = tokenResponse.data;
    
    if (!id_token) {
      throw new Error('Không nhận được ID token từ Google');
    }
    
    // Xác thực ID token và lấy thông tin người dùng
    const googleData = await verifyGoogleToken(id_token);
    
    await connection.beginTransaction();
    
    // Kiểm tra xem người dùng đã tồn tại trong bảng social_auth chưa
    const [socialUsers] = await connection.execute(
      'SELECT * FROM social_auth WHERE provider = ? AND provider_id = ?',
      ['google', googleData.sub]
    );
    
    let userId;
    
    if (socialUsers.length > 0) {
      // Người dùng đã đăng nhập bằng Google trước đó
      userId = socialUsers[0].user_id;
      
      // Cập nhật token mới
      await connection.execute(
        'UPDATE social_auth SET token = ?, updated_at = NOW() WHERE id = ?',
        [id_token, socialUsers[0].id]
      );
    } else {
      // Kiểm tra xem email đã tồn tại trong hệ thống chưa
      const [existingUsers] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [googleData.email]
      );
      
      if (existingUsers.length > 0) {
        // Người dùng đã tồn tại với email này, liên kết tài khoản
        userId = existingUsers[0].id;
        
        // Thêm vào bảng social_auth
        await connection.execute(
          'INSERT INTO social_auth (user_id, provider, provider_id, token, profile_data, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
          [userId, 'google', googleData.sub, id_token, JSON.stringify({...googleData, access_token})]
        );
      } else {
        // Tạo người dùng mới
        const [result] = await connection.execute(
          'INSERT INTO users (username, email, status, role, created_at) VALUES (?, ?, ?, ?, NOW())',
          [googleData.name.substring(0, 50), googleData.email, 'active', 'user']
        );
        
        userId = result.insertId;
        
        // Thêm vào bảng social_auth
        await connection.execute(
          'INSERT INTO social_auth (user_id, provider, provider_id, token, profile_data, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
          [userId, 'google', googleData.sub, id_token, JSON.stringify({...googleData, access_token})]
        );
        
        // Kiểm tra và tạo profile cho người dùng
        const [existingProfile] = await connection.execute(
          'SELECT * FROM user_profiles WHERE user_id = ?',
          [userId]
        );
        
        if (existingProfile.length === 0) {
          // Tạo profile cho người dùng
          await connection.execute(
            'INSERT INTO user_profiles (user_id, display_name, avatar_url, created_at) VALUES (?, ?, ?, NOW())',
            [userId, googleData.name, googleData.picture || null]
          );
        }
      }
    }
    
    // Lấy thông tin người dùng
    const [users] = await connection.execute(
      `SELECT u.*, p.display_name, p.avatar_url 
       FROM users u 
       LEFT JOIN user_profiles p ON u.id = p.user_id 
       WHERE u.id = ?`,
      [userId]
    );
    
    if (users.length === 0) {
      throw new Error('Người dùng không tồn tại');
    }
    
    const user = users[0];
    
    await connection.commit();
    
    // Tạo JWT token
    const jwtToken = generateToken(user);
    
    // Trả về thông tin người dùng và token
    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.display_name || user.username,
          email: user.email,
          avatar: user.avatar_url,
          isAdmin: user.role === 'admin'
        },
        token: jwtToken
      }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Google OAuth2 code exchange error:', error);
    return res.status(401).json({
      success: false,
      message: 'Xác thực Google OAuth2 thất bại: ' + error.message
    });
  } finally {
    connection.release();
  }
}

module.exports = {
  facebookLogin,
  googleLogin,
  googleExchangeCode
}; 