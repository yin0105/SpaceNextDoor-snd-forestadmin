// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Payouts = sequelize.define('payouts', {
    status: {
      type: DataTypes.ENUM(
        'PAID',
        'PENDING',
      ),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    commissionPercentage: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'payouts',
    underscored: true,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Payouts.associate = (models) => {
    Payouts.belongsTo(models.bookings, {
      foreignKey: {
        name: 'bookingIdKey',
        field: 'booking_id',
      },
      as: 'booking',
    });
    Payouts.belongsTo(models.users, {
      foreignKey: {
        name: 'providerIdKey',
        field: 'provider_id',
      },
      as: 'provider',
    });
    Payouts.belongsTo(models.renewals, {
      foreignKey: {
        name: 'renewalIdKey',
        field: 'renewal_id',
      },
      as: 'renewal',
    });
  };

  return Payouts;
};
