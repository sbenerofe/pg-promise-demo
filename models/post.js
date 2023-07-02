const User = require('./user.js');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(10000),
    },
    // total_votes: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 0,
    // },
  });
  //Post.isHierarchy();
  Post.associate = (models) => {
    Post.belongsTo(models.User);

    // sequelize-hierarchy-next takes care of setting up the necsesary columns for setting up the hierarchy
    Post.hasMany(
      models.Post,
      { as: 'child', foreignKey: 'parentId' },
      { allowNull: true }
    );
    Post.belongsTo(
      models.Post,
      { as: 'parent', foreignKey: 'parentId' },
      { allowNull: true }
    );
  };

  //user that created post
  User.associate = (models) => {
    User.hasOne(models.Post);
  };

  //this sets up the hierarchy for the posts
  //see: https://www.npmjs.com/package/sequelize-hierarchy-ts
  //
  // Post.isHierarchy();

  async function asyncCall() {
    console.log('calling');
    const result = await Post.rebuildHierarchy();
    console.log(result);
    // Expected output: "resolved"
  }

  // asyncCall();

  return Post;
};
