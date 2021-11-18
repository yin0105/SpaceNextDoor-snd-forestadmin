const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter } = require('forest-express-sequelize');
const { spaces, prices } = require('../models');
const { INCREMENT, DECREMENT, VALUE, PERCENTAGE } = require('../constant/index')

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('spaces');

// This file contains the logic of every route in Forest Admin for the collection spaces:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Space
router.post('/spaces', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Space
router.put('/spaces/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Space
router.delete('/spaces/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Spaces
router.get('/spaces', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Spaces
router.get('/spaces/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Space
router.get('/spaces/:recordId(?!count)', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Spaces
router.get('/spaces.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Spaces
router.delete('/spaces', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

router.post('/actions/spaces/approve', permissionMiddlewareCreator.smartAction(), (req, res) => {
  return new RecordsGetter(spaces).getIdsFromRequest(req)
    .then((spaceIds) => {
      return spaces
        .update({ status: 'ACTIVE' }, { where: { id: spaceIds } })
        .then(() => {
          res.send({ success: 'Space is now Active!' });
        });
    });
});

router.post('/actions/spaces/reject', permissionMiddlewareCreator.smartAction(), (req, res) => {
  return new RecordsGetter(spaces).getIdsFromRequest(req)
    .then((spaceIds) => {
      return spaces
        .update({ status: 'REJECTED' }, { where: { id: spaceIds } })
        .then(() => {
          res.send({ success: 'Space is now Rejected!' });
        });
    });
});

router.post('/actions/spaces/un-list', permissionMiddlewareCreator.smartAction(), (req, res) => {
  return new RecordsGetter(spaces).getIdsFromRequest(req)
    .then((spaceIds) => {
      return spaces
        .update({ status: 'IN_ACTIVE' }, { where: { id: spaceIds } })
        .then(() => {
          res.send({ success: 'Space is now In Active!' });
        });
    });
});

const handleChange = (currentPrice, attrs) => {
  const typeOfChange = attrs['Increment or Decrement']
  const change = attrs['Value or Percentage']
  const value = parseFloat(attrs['Numerical Value'])
  const currPrice = parseFloat(currentPrice)

  const sign = (type) => type === INCREMENT ? 1 : -1;

  if (change === VALUE) {
    return parseFloat((currPrice + value * sign(typeOfChange)).toFixed(2))
  }
  if (change === PERCENTAGE) {
    return parseFloat((currPrice + currPrice * sign(typeOfChange) * (value / 100)).toFixed(2))
  }

}

router.post('/actions/spaces/bulk-price-change', permissionMiddlewareCreator.smartAction(), (req, res) => {
  const attrs = req.body.data.attributes.values;
  const spaceIds = req.body.data.attributes.ids
  const updates = spaceIds.map((spaceId) =>
    prices
      .findOne({ where: { space_id: spaceId } })
      .then((price) => {
        const updatedPrice = handleChange(price.pricePerMonth, attrs)
        price
          .update({ pricePerMonth: updatedPrice })
      })
  )
  Promise.all(updates)
    .then(() =>
      res.send({ success: 'Price updated successfully!' })
    )
});

router.post('/actions/spaces/set-price', permissionMiddlewareCreator.smartAction(), (req, res) => {
  const attrs = req.body.data.attributes.values;
  const spaceIds = req.body.data.attributes.ids
  const newPrice = attrs['New Price']
  const updates = spaceIds.map((spaceId) =>
    prices
      .findOne({ where: { space_id: spaceId } })
      .then((price) => {
        price
          .update({ pricePerMonth: newPrice })
      })
  )
  Promise.all(updates)
    .then(() =>
      res.send({ success: 'Price updated successfully!' })
    )
});

module.exports = router;
