// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const PlatformPolicies = sequelize.define('platformPolicies', {
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
    type: {
      type: DataTypes.STRING,
    },
    days: {
      type: DataTypes.INTEGER,
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
  }, {
    tableName: 'platform_policies',
    underscored: true,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  PlatformPolicies.associate = (models) => {
    PlatformPolicies.hasMany(models.sitePolicies, {
      foreignKey: {
        name: 'policyIdKey',
        field: 'policy_id',
      },
      as: 'policySitePolicies',
    });
  };

  return PlatformPolicies;
};
