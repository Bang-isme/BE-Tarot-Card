module.exports = (sequelize, Sequelize) => {
  const TarotReading = sequelize.define('tarot_reading', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    topic_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    spread_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    question: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tarot_readings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return TarotReading;
}; 