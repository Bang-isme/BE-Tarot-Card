import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Card from './Card.js';

const Reading = sequelize.define('Reading', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('daily', 'three_card', 'celtic_cross', 'career', 'love', 'custom'),
    allowNull: false
  },
  question: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cards: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Array of card IDs and positions'
  },
  interpretation: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'readings',
  timestamps: true
});

// Định nghĩa quan hệ
Reading.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Gắn model Reading vào model User
User.hasMany(Reading, {
  foreignKey: 'userId',
  as: 'readings'
});

export default Reading; 