module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: {
        args: true,
        msg: 'That username is already in use.',
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Must be an EMAIL ##CUSTOM MESSAGE##',
        },
      },
      unique: {
        args: true,
        msg: 'That email address is already in use.',
      },
    },
    hashedPassword: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    grade: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 0,
        max: 12,
      },
      defaultValue: 1,
    },
  });

  return User;
};
