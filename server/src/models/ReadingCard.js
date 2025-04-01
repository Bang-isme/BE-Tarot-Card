import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Reading from './Reading.js';
import Card from './Card.js';

const ReadingCard = sequelize.define('ReadingCard', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  readingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Reading,
      key: 'id'
    }
  },
  cardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Card,
      key: 'id'
    }
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Vị trí của lá bài trong trải bài'
  },
  isReversed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  positionMeaning: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Ý nghĩa của vị trí này trong loại bài'
  },
  interpretation: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Diễn giải lá bài ở vị trí này'
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
  tableName: 'reading_cards',
  timestamps: true
});

// Định nghĩa quan hệ
ReadingCard.belongsTo(Reading, {
  foreignKey: 'readingId',
  as: 'reading'
});

ReadingCard.belongsTo(Card, {
  foreignKey: 'cardId',
  as: 'card'
});

// Định nghĩa quan hệ many-to-many giữa Reading và Card
Reading.belongsToMany(Card, {
  through: ReadingCard,
  foreignKey: 'readingId',
  otherKey: 'cardId',
  as: 'cards'
});

Card.belongsToMany(Reading, {
  through: ReadingCard,
  foreignKey: 'cardId',
  otherKey: 'readingId',
  as: 'readings'
});

export default ReadingCard; 