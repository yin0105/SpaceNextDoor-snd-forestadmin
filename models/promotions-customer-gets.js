// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const PromotionsCustomerGets = sequelize.define('promotionsCustomerGets', {
    type: {
      type: DataTypes.ENUM(
        'FIXED_AMOUNT_DISCOUNT',
        'PERCENTAGE_DISCOUNT',
        'TOTAL_AMOUNT',
      ),
      allowNull: false,
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    maxAmountPerBooking: {
      type: DataTypes.DOUBLE,
    },
    forType: {
      type: DataTypes.ENUM(
        'FIRST_MONTHS',
        'LAST_MONTHS',
      ),
      allowNull: false,
    },
    forValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'promotions_customer_gets',
    underscored: true,
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  PromotionsCustomerGets.associate = (models) => {
    PromotionsCustomerGets.belongsTo(models.promotions, {
      foreignKey: {
        name: 'promotionIdKey',
        field: 'promotion_id',
      },
      as: 'promotion',
    });
  };

  return PromotionsCustomerGets;
};