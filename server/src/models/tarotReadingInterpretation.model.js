module.exports = (sequelize, Sequelize) => {
  const TarotReadingInterpretation = sequelize.define('tarot_reading_interpretation', {
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
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      comment: 'The AI-generated interpretation content in JSON format'
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'tarot_reading_interpretations',
    timestamps: false
  });

  return TarotReadingInterpretation;
}; 