const Post = require('./post.js');
const User = require('./user.js');

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    location_link: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      isUrl: true,
    },
    title: {
      type: DataTypes.STRING(255),
    },
    content: {
      type: DataTypes.STRING(10000),
    },
  });

  Post.associate = (models) => {
    Post.hasMany(models.Image, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  User.associate = (models) => {
    User.hasOne(models.Image, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  Image.associate = (models) => {
    Image.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Image.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Image;
};
