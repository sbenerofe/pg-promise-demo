const User = require('./user.js');

module.exports = (sequelize, DataTypes) => {
  const Jcoin = sequelize.define('Jcoin', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    total_received: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    content: {
      type: DataTypes.STRING(10000),
    },
    total_togive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lastCoinDistribution_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
  Jcoin.associate = (models) => {
    Jcoin.belongsTo(models.User);
  };

  //user that created post
  User.associate = (models) => {
    User.hasOne(models.Jcoin);
  };

  return Jcoin;
};
