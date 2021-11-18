const service = require('./rabbitmq');

const esRoutingKey = process.env.SND_UPDATE_ES_KEY;
const stockRoutingKey = process.env.SND_UPDATE_STOCK_KEY;

const afterCreate = async (record = {}) => {
  console.log(`After Create hook ${record.id}`);

  let payload = {};
  // make sure its SITE which is being create and create in ES
  if (
    !!record.stock_management_type &&
    !!record.property_type_id &&
    !record.site_id
  ) {
    payload = { is_created: true };
  }

  const data = getInfoBasedOnInstance(record, payload);
  if (!data.length) {
    return;
  }
  await Promise.all(data.map((d) => service.pushToQueue(d.key, d.data)));
};

const afterUpdate = async (record = {}) => {
  console.log(`After Update hook ${record.id}`);
  const data = getInfoBasedOnInstance(record);
  if (!data.length) {
    return;
  }
  await Promise.all(data.map((d) => service.pushToQueue(d.key, d.data)));
};

const afterDelete = async (record = {}) => {
  console.log(`After Delete hook ${record.id}`);
  const data = getInfoBasedOnInstance(record, {
    is_deleted: true,
  });
  if (!data.length) {
    return;
  }
  await Promise.all(data.map((d) => service.pushToQueue(d.key, d.data)));
};

module.exports = {
  afterCreate: afterCreate,
  afterUpdate: afterUpdate,
  afterDelete: afterDelete,
};

/**
 * IMPORTANT: Its a hack to identify the table of the record, as wasn't able to find
 * From the hook instance, as soon as we find that, we'll remove this and get table name directly from hook
 *
 * @param record db table record
 */
const getInfoBasedOnInstance = (record = {}, preData = {}) => {
  if (
    record.shortId &&
    record.moveInDate &&
    record.siteIdKey &&
    record.spaceIdKey
  ) {
    // means something created/updated/deleted in bookings table
    //
    const siteId = record.siteIdKey;
    return [
      {
        key: stockRoutingKey,
        data: {
          site_id: siteId,
          site_ids: [siteId],
          ...preData,
        },
      },
    ];
  }

  if (record.siteIdKey || record.stockManagementType) {
    const respData = [];
    // means something updated/created/deleted in sites related records
    //
    const siteId = record.siteIdKey || record.id;
    respData.push({
      key: esRoutingKey,
      data: {
        site_id: siteId,
        site_ids: [siteId],
        ...preData,
      },
    });

    if (record.stockManagementType) {
      // means something updated/created/deleted in sites or spaces
      // so we update stock as well
      const siteId = record.siteIdKey || record.id;
      respData.push({
        key: stockRoutingKey,
        data: {
          site_id: siteId,
          site_ids: [siteId],
          ...preData,
        },
      });
    }

    return respData;
  }

  return [];
};
