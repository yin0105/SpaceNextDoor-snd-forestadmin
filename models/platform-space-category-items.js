// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const PlatformSpaceCategoryItems = sequelize.define('platformSpaceCategoryItems', {
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
    unit: {
      type: DataTypes.ENUM(
        'cm',
      ),
      allowNull: false,
    },
    height: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    width: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    dimension: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'platform_space_category_items',
    underscored: true,
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  PlatformSpaceCategoryItems.associate = (models) => {
    PlatformSpaceCategoryItems.belongsTo(models.platformSpaceCategories, {
      foreignKey: {
        name: 'categoryIdKey',
        field: 'category_id',
      },
      as: 'category',
    });
  };

  return PlatformSpaceCategoryItems;
};
