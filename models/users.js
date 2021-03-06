// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPhoneVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    facebookUserId: {
      type: DataTypes.STRING,
    },
    googleUserId: {
      type: DataTypes.STRING,
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
    oldUserId: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'users',
    underscored: true,
    schema: process.env.DATABASE_SCHEMA,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Users.associate = (models) => {
    Users.belongsTo(models.customers, {
      foreignKey: {
        name: 'customerIdKey',
        field: 'customer_id',
      },
      as: 'customer',
    });
    Users.belongsTo(models.providers, {
      foreignKey: {
        name: 'providerIdKey',
        field: 'provider_id',
      },
      as: 'provider',
    });
    Users.hasMany(models.spaces, {
      foreignKey: {
        name: 'userIdKey',
        field: 'user_id',
      },
      as: 'spaces',
    });
    Users.hasMany(models.promotionsRedeem, {
      foreignKey: {
        name: 'customerIdKey',
        field: 'customer_id',
      },
      as: 'customerPromotionsRedeems',
    });
    Users.hasMany(models.bookings, {
      foreignKey: {
        name: 'customerIdKey',
        field: 'customer_id',
      },
      as: 'customerBookings',
    });
    Users.hasMany(models.bookings, {
      foreignKey: {
        name: 'providerIdKey',
        field: 'provider_id',
      },
      as: 'providerBookings',
    });
    Users.hasMany(models.ordersHistory, {
      foreignKey: {
        name: 'changedByKey',
        field: 'changed_by',
      },
      as: 'changedByOrdersHistories',
    });
    Users.hasMany(models.orders, {
      foreignKey: {
        name: 'customerIdKey',
        field: 'customer_id',
      },
      as: 'customerOrders',
    });
    Users.hasMany(models.sites, {
      foreignKey: {
        name: 'userIdKey',
        field: 'user_id',
      },
      as: 'sites',
    });
    Users.hasMany(models.bookingsHistory, {
      foreignKey: {
        name: 'changedByKey',
        field: 'changed_by',
      },
      as: 'changedByBookingsHistories',
    });
    Users.hasMany(models.payouts, {
      foreignKey: {
        name: 'providerIdKey',
        field: 'provider_id',
      },
      as: 'providerPayouts',
    });
  };

  return Users;
};
