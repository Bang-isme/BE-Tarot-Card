/**
 * Các phương thức xác thực token từ các nhà cung cấp xã hội (Facebook, Google)
 */
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');

// Tạo Google OAuth2 client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Xác thực token từ Facebook và lấy thông tin người dùng
 * @param {string} token - Access token từ Facebook
 * @returns {Promise<object>} - Thông tin người dùng Facebook
 */
async function verifyFacebookToken(token) {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
    );
    
    // Kiểm tra dữ liệu cần thiết
    if (!response.data.id || !response.data.email) {
      throw new Error('Token Facebook không chứa đủ thông tin người dùng');
    }
    
    return response.data;
  } catch (error) {
    console.error('Lỗi xác thực Facebook:', error.message);
    if (error.response) {
      console.error('Facebook API response:', error.response.data);
    }
    throw new Error('Token Facebook không hợp lệ hoặc đã hết hạn');
  }
}

/**
 * Xác thực ID token từ Google và lấy thông tin người dùng
 * @param {string} token - ID token từ Google
 * @returns {Promise<object>} - Thông tin người dùng Google
 */
async function verifyGoogleToken(token) {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    
    // Kiểm tra dữ liệu cần thiết
    if (!payload.sub || !payload.email) {
      throw new Error('Token Google không chứa đủ thông tin người dùng');
    }
    
    return payload;
  } catch (error) {
    console.error('Lỗi xác thực Google:', error.message);
    throw new Error('Token Google không hợp lệ hoặc đã hết hạn');
  }
}

module.exports = {
  verifyFacebookToken,
  verifyGoogleToken
}; 