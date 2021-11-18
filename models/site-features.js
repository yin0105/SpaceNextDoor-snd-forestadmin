// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const SiteFeatures = sequelize.define('siteFeatures', {
    createdBy: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('now()'),
    },
  }, {
    tableName: 'site_features',
    underscored: true,
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  SiteFeatures.associate = (models) => {
    SiteFeatures.belongsTo(models.platformFeatures, {
      foreignKey: {
        name: 'featureIdKey',
        field: 'feature_id',
      },
      as: 'feature',
    });
    SiteFeatures.belongsTo(models.sites, {
      foreignKey: {
        name: 'siteIdKey',
        field: 'site_id',
      },
      as: 'site',
    });
  };

  return SiteFeatures;
};
