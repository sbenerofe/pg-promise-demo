// import { Sequelize, DataTypes } from 'sequelize';
// const sequelize = new Sequelize('sqlite::memory:');
const User = require('./user.js');
const Post = require('./post.js');

module.exports = (sequelize, DataTypes) => {
  const PostVote = sequelize.define('PostVote', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    upvote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.PostVote, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  PostVote.associate = (models) => {
    PostVote.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return PostVote;
};
