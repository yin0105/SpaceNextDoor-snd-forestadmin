const { collection } = require('forest-express-sequelize');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('sites', {
  actions: [{name: 'Approve', endpoint: '/forest/actions/sites/approve'}, {name: 'Reject', endpoint: '/forest/actions/sites/reject'}, {name: 'Un List', endpoint: '/forest/actions/sites/un-list'}],
  fields: [],
  segments: [],
});
