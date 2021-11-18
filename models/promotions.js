// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Promotions = sequelize.define('promotions', {
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
    format: {
      type: DataTypes.ENUM(
        'PUBLIC',
        'CODE',
        'VOUCHER',
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        'DRAFT',
        'ACTIVE',
        'IN_ACTIVE',
        'FINISH',
      ),
      defaultValue: "DRAFT",
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    max: {
      type: DataTypes.INTEGER,
    },
    maxPerDay: {
      type: DataTypes.INTEGER,
    },
    maxPerCustomer: {
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
  }, {
    tableName: 'promotions',
    underscored: true,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Promotions.associate = (models) => {
    Promotions.hasMany(models.renewals, {
      foreignKey: {
        name: 'promotionIdKey',
        field: 'promotion_id',
      },
      as: 'renewals',
    });
    Promotions.hasMany(models.promotionsRedeem, {
      foreignKey: {
        name: 'promotionIdKey',
        field: 'promotion_id',
      },
      as: 'promotionsRedeems',
    });
    Promotions.hasMany(models.promotionsCustomerBuys, {
      foreignKey: {
        name: 'promotionIdKey',
        field: 'promotion_id',
      },
      as: 'promotionsCustomerBuys',
    });
    Promotions.hasMany(models.bookingsPromotions, {
      foreignKey: {
        name: 'promotionIdKey',
        field: 'promotion_id',
      },
      as: 'bookingsPromotions',
    });
    Promotions.hasMany(models.promotionsCustomerGets, {
      foreignKey: {
        name: 'promotionIdKey',
        field: 'promotion_id',
      },
      as: 'promotionsCustomerGets',
    });
  };

  return Promotions;
};
