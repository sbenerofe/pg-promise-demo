const User = require('./user.js');

module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
    },
    content: {
      type: DataTypes.STRING(200),
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Banner, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  Banner.associate = (models) => {
    Banner.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  
    

  return Banner;
};
