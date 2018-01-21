export default (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    lga: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    eventType: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

  });

  // Relations
  Center.associate = (models) => {
    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
    });
    Center.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Center;
};
