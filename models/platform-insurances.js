// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const PlatformInsurances = sequelize.define('platformInsurances', {
    nameEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameTh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameJp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameKr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thirdPartyProvider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coveredAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pricePerDay: {
      type: DataTypes.DOUBLE,
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
    tableName: 'platform_insurances',
    underscored: true,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  PlatformInsurances.associate = (models) => {
    PlatformInsurances.belongsTo(models.countries, {
      foreignKey: {
        name: 'countryIdKey',
        field: 'country_id',
      },
      as: 'country',
    });
    PlatformInsurances.hasMany(models.renewals, {
      foreignKey: {
        name: 'insuranceIdKey',
        field: 'insurance_id',
      },
      as: 'insuranceRenewals',
    });
    PlatformInsurances.hasMany(models.bookings, {
      foreignKey: {
        name: 'insuranceIdKey',
        field: 'insurance_id',
      },
      as: 'insuranceBookings',
    });
  };

  return PlatformInsurances;
};
