const { collection } = require('forest-express-sequelize');
const { INCREMENT, DECREMENT, VALUE, PERCENTAGE } = require('../constant/index')

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('spaces', {
  actions: [{ name: 'Approve', endpoint: '/forest/actions/spaces/approve' }, { name: 'Reject', endpoint: '/forest/actions/spaces/reject' }, { name: 'Un List', endpoint: '/forest/actions/spaces/un-list' },
  {
    name: 'Bulk Price Change',
    endpoint: '/forest/actions/spaces/bulk-price-change',
    type: 'bulk',
    fields: [{
      field: 'Increment or Decrement',
      type: 'Enum',
      enums: [INCREMENT, DECREMENT],
      description: 'Select whether you want to do an increment or a decrement',
      isRequired: true
    },
    {
      field: 'Value or Percentage',
      type: 'Enum',
      enums: [VALUE, PERCENTAGE],
      description: 'Select whether you want to do a change by value or by percentage',
      isRequired: true
    },
    {
      field: 'Numerical Value',
      type: 'Number',
      isRequired: true
    }
    ]
  },
  {
    name: 'Set Price',
    endpoint: '/forest/actions/spaces/set-price',
    type: 'bulk',
    fields: [
      {
        field: 'New Price',
        type: 'Number',
        description: 'Enter new price for the space/spaces',
        isRequired: true
      }
    ]
  }
  ],
  fields: [],
  segments: [],
});
