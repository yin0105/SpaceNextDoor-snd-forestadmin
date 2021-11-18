// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Sites = sequelize.define('sites', {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    floor: {
      type: DataTypes.INTEGER,
    },
    providerType: {
      type: DataTypes.ENUM(
        'INDIVIDUAL',
        'BUSINESS',
      ),
    },
    status: {
      type: DataTypes.ENUM(
        'ACTIVE',
        'DRAFT',
        'INACTIVE',
        'READY_TO_REVIEW',
        'REJECTED',
      ),
      defaultValue: "DRAFT",
      allowNull: false,
    },
    rejectionReason: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    stockManagementType: {
      type: DataTypes.ENUM(
        'SND',
        'THIRD_PARTY',
        'AFFILIATE',
      ),
      defaultValue: "SND",
      allowNull: false,
    },
    thirdPartyProvider: {
      type: DataTypes.STRING,
    },
    thirdPartySiteId: {
      type: DataTypes.STRING,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('now()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('now()'),
    },
    googleReviewsWidgetId: {
      type: DataTypes.STRING,
    },
    sourceSiteLink: {
      type: DataTypes.STRING,
    },
    hostFees: {
      type: DataTypes.DOUBLE,
      defaultValue: "0",
    },
    sourceSiteName: {
      type: DataTypes.STRING,
    },
    nameEn: {
      type: DataTypes.STRING,
    },
    nameTh: {
      type: DataTypes.STRING,
    },
    nameJp: {
      type: DataTypes.STRING,
    },
    nameKr: {
      type: DataTypes.STRING,
    },
    descriptionEn: {
      type: DataTypes.STRING,
    },
    descriptionTh: {
      type: DataTypes.STRING,
    },
    descriptionJp: {
      type: DataTypes.STRING,
    },
    descriptionKr: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'sites',
    underscored: true,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Sites.associate = (models) => {
    Sites.belongsTo(models.siteAddresses, {
      foreignKey: {
        name: 'addressIdKey',
        field: 'address_id',
      },
      as: 'address',
    });
    Sites.belongsTo(models.platformAgreements, {
      foreignKey: {
        name: 'agreementIdKey',
        field: 'agreement_id',
      },
      as: 'agreement',
    });
    Sites.belongsTo(models.platformCommissions, {
      foreignKey: {
        name: 'commissionIdKey',
        field: 'commission_id',
      },
      as: 'commission',
    });
    Sites.belongsTo(models.platformPropertyTypes, {
      foreignKey: {
        name: 'propertyTypeIdKey',
        field: 'property_type_id',
      },
      as: 'propertyType',
    });
    Sites.belongsTo(models.users, {
      foreignKey: {
        name: 'userIdKey',
        field: 'user_id',
      },
      as: 'user',
    });
    Sites.hasMany(models.bookings, {
      foreignKey: {
        name: 'siteIdKey',
        field: 'site_id',
      },
      as: 'bookings',
    });
    Sites.hasMany(models.entityTaxes, {
      foreignKey: {
        name: 'siteIdKey',
        field: 'site_id',
      },
      as: 'entityTaxes',
    });
    Sites.hasMany(models.siteDoors, {
      foreignKey: {
        name: 'siteIdKey',
        field: 'site_id',
      },
      as: 'siteDoors',
    });
    Sites.hasMany(models.siteFeatures, {
      foreignKey: {
        name: 'siteIdKey',
        field: 'site_id',
      },
      as: 'siteFeatures',
    });
    Sites.hasMany(models.spaces, {
      foreignKey: {
        name: 'siteIdKey',
        field: 'site_id',
      },
      as: 'spaces',
    });
    Sites.hasMany(models.sitePolicies, {
      foreignKey: {
        name: 'siteIdKey',
        field: 'site_id',
      },
      as: 'sitePolicies',
    });
    Sites.hasMany(models.siteRules, {
      foreignKey: {
        name: 'siteIdKey',
        field: 'site_id',
      },
      as: 'siteRules',
    });
  };

  return Sites;
};
