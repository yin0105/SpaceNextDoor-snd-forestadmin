// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Prices = sequelize.define('prices', {
    pricePerDay: {
      type: DataTypes.DOUBLE,
    },
    pricePerWeek: {
      type: DataTypes.DOUBLE,
    },
    pricePerMonth: {
      type: DataTypes.DOUBLE,
    },
    pricePerYear: {
      type: DataTypes.DOUBLE,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    currency: {
      type: DataTypes.STRING,
    },
    currencySign: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('now()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('now()'),
    },
  }, {
    tableName: 'prices',
    underscored: true,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Prices.associate = (models) => {
    Prices.belongsTo(models.spaces, {
      foreignKey: {
        name: 'spaceIdKey',
        field: 'space_id',
      },
      as: 'space',
    });
  };

  return Prices;
};
