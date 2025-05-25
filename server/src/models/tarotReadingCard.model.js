module.exports = (sequelize, Sequelize) => {
  const TarotReadingCard = sequelize.define('tarot_reading_card', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reading_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tarot_readings',
        key: 'id'
      }
    },
    card_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tarot_cards',
        key: 'id'
      }
    },
    position: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: 'Position of the card in the spread (1, 2, 3, etc.)'
    },
    is_reversed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'Whether the card is upright (false) or reversed (true)'
    }
  }, {
    tableName: 'tarot_reading_cards',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return TarotReadingCard;
}; 