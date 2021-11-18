// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Countries = sequelize.define('countries', {
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencySign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('now()'),
    },
  }, {
    tableName: 'countries',
    underscored: true,
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Countries.associate = (models) => {
    Countries.hasMany(models.cities, {
      foreignKey: {
        name: 'countryIdKey',
        field: 'country_id',
      },
      as: 'cities',
    });
    Countries.hasMany(models.platformBanks, {
      foreignKey: {
        name: 'countryIdKey',
        field: 'country_id',
      },
      as: 'platformBanks',
    });
    Countries.hasMany(models.platformSpaceTypes, {
      foreignKey: {
        name: 'countryIdKey',
        field: 'country_id',
      },
      as: 'platformSpaceTypes',
    });
    Countries.hasMany(models.platformInsurances, {
      foreignKey: {
        name: 'countryIdKey',
        field: 'country_id',
      },
      as: 'platformInsurances',
    });
    Countries.hasMany(models.bookingSiteAddresses, {
      foreignKey: {
        name: 'countryIdKey',
        field: 'country_id',
      },
      as: 'bookingSiteAddresses',
    });
    Countries.hasMany(models.siteAddresses, {
      foreignKey: {
        name: 'countryIdKey',
        field: 'country_id',
      },
      as: 'siteAddresses',
    });
    Countries.hasMany(models.platformServices, {
      foreignKey: {
        name: 'countryIdKey',
        field: 'country_id',
      },
      as: 'platformServices',
    });
  };

  return Countries;
};