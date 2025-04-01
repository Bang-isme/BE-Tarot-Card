import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Card from './Card.js';

const DailyTarot = sequelize.define('DailyTarot', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Card,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: true
  },
  isReversed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Thông điệp của lá bài cho ngày hôm nay'
  },
  advice: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Lời khuyên cho ngày hôm nay dựa trên lá bài'
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
  tableName: 'daily_tarot',
  timestamps: true
});

// Định nghĩa quan hệ
DailyTarot.belongsTo(Card, {
  foreignKey: 'cardId',
  as: 'card'
});

export default DailyTarot; 