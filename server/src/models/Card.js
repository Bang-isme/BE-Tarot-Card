import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nameEn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  arcana: {
    type: DataTypes.ENUM('major', 'minor'),
    allowNull: false
  },
  suit: {
    type: DataTypes.ENUM('major', 'wands', 'cups', 'swords', 'pentacles'),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  keywords: {
    type: DataTypes.JSON,
    allowNull: false
  },
  upright: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  reversed: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  uprightKeywords: {
    type: DataTypes.JSON,
    allowNull: false
  },
  reversedKeywords: {
    type: DataTypes.JSON,
    allowNull: false
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
  tableName: 'cards',
  timestamps: true
});

export default Card; 