const jwt = require('jsonwebtoken');
const axios = require('axios');
const db = require('../models');
const User = db.users;
const UserProfile = db.userProfiles;
const UserStats = db.userStats;
const SocialAuth = db.socialAuth;
const { Op } = db.Sequelize;
const { OAuth2Client } = require('google-auth-library');

// Helper function to generate token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || '3fc984d477522ac580222373842700cee3d14127eb60c7b81278df98bf6202f1d69f91fa5565d4a23d8434510befb0188e3a8f1ac3acedcc9ea99ebf0ec01119',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Handle generic social login (Google, Facebook)
exports.socialLogin = async (req, res, next) => {
  try {
    const { provider, token, email, name, id } = req.body;

    if (!token || !provider || (!email && !id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required social login information'
      });
    }

    let socialId, socialEmail, socialName;

    // Verify token based on provider
    if (provider === 'google') {
      try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        socialId = payload.sub;
        socialEmail = payload.email;
        socialName = payload.name;
      } catch (error) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid Google token'
        });
      }
    } else if (provider === 'facebook') {
      // For Facebook we trust the data sent from frontend
      // In a production app, you would verify the token with Facebook API
      socialId = id;
      socialEmail = email;
      socialName = name;
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Unsupported social login provider'
      });
    }

    // Find or create user
    let user = await User.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { email: socialEmail },
          { [`${provider}_id`]: socialId }
        ]
      }
    });

    if (!user) {
      // Create new user
      user = await User.create({
        username: socialName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
        email: socialEmail,
        password_hash: Math.random().toString(36).slice(-8), // Random password
        [`${provider}_id`]: socialId,
        role: 'user',
        is_premium: false,
        points: 0
      });

      // Create user profile
      await UserProfile.create({
        user_id: user.id
      });

      // Create user stats
      await UserStats.create({
        user_id: user.id,
        readings_count: 0,
        forum_posts_count: 0,
        forum_comments_count: 0
      });
    } else {
      // Update social ID if not already set
      if (!user[`${provider}_id`]) {
        await user.update({
          [`${provider}_id`]: socialId
        });
      }
    }

    // Update last login
    await user.update({
      last_login: new Date()
    });

    // Generate token
    const jwtToken = generateToken(user.id);

    // Return response
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      is_premium: user.is_premium,
      points: user.points,
      created_at: user.created_at
    };

    res.status(200).json({
      status: 'success',
      message: 'Social login successful',
      data: {
        user: userData,
        token: jwtToken
      }
    });
  } catch (error) {
    next(error);
  }
};

// Specific Facebook login handler
exports.facebookLogin = async (req, res, next) => {
  try {
    const { accessToken, userId } = req.body;

    if (!accessToken || !userId) {
      return res.status(400).json({
        status: 'error',
        message: 'Facebook access token and user ID are required'
      });
    }

    // In a real implementation, verify the token with Facebook Graph API
    // For simplicity, we'll trust the token provided

    // Find or create user by Facebook ID
    let user = await User.findOne({
      where: { facebook_id: userId }
    });

    if (!user) {
      // Create new user (in a real app, fetch profile data from Facebook)
      user = await User.create({
        username: 'fb_user_' + userId.substring(0, 8),
        email: `fb_${userId}@placeholder.com`, // Would get real email from Facebook API
        password_hash: Math.random().toString(36).slice(-8), // Random password
        facebook_id: userId,
        role: 'user',
        is_premium: false,
        points: 0
      });

      // Create user profile
      await UserProfile.create({
        user_id: user.id
      });

      // Create user stats
      await UserStats.create({
        user_id: user.id,
        readings_count: 0,
        forum_posts_count: 0,
        forum_comments_count: 0
      });
    }

    // Update last login
    await user.update({
      last_login: new Date()
    });

    // Generate token
    const token = generateToken(user.id);

    // Return response
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      is_premium: user.is_premium,
      points: user.points,
      created_at: user.created_at
    };

    res.status(200).json({
      status: 'success',
      message: 'Facebook login successful',
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Google OAuth callback
exports.googleCallback = async (req, res, next) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).send('Authorization code is required');
    }

    // In a real implementation, exchange code for tokens
    // For simplicity, redirect to frontend with a placeholder status
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/google/callback?status=success`;
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
}; 