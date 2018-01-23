export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid Email Address'
        }
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  });

  // Relations
  User.associate = (models) => {
    User.hasMany(models.Event, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Center, {
      foreignKey: 'userId',
    });
  };

  return User;
};