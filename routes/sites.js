const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter } = require('forest-express-sequelize');
const { sites } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('sites');

// This file contains the logic of every route in Forest Admin for the collection sites:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Site
router.post('/sites', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Site
router.put('/sites/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Site
router.delete('/sites/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Sites
router.get('/sites', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Sites
router.get('/sites/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Site
router.get('/sites/:recordId(?!count)', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Sites
router.get('/sites.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Sites
router.delete('/sites', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

router.post('/actions/sites/approve', permissionMiddlewareCreator.smartAction(), (req, res) => {
  return new RecordsGetter(sites).getIdsFromRequest(req)
    .then((siteIds) => {
      return sites
        .update({ status: 'ACTIVE' }, { where: { id: siteIds }})
        .then(() => {
          res.send({ success: 'Site is now Active!' });
        });
    });
});

router.post('/actions/sites/reject', permissionMiddlewareCreator.smartAction(), (req, res) => {
  return new RecordsGetter(sites).getIdsFromRequest(req)
    .then((siteIds) => {
      return sites
        .update({ status: 'REJECTED' }, { where: { id: siteIds }})
        .then(() => {
          res.send({ success: 'Site is now Rejected!' });
        });
    });
});

router.post('/actions/sites/un-list', permissionMiddlewareCreator.smartAction(), (req, res) => {
  return new RecordsGetter(sites).getIdsFromRequest(req)
    .then((siteIds) => {
      return sites
        .update({ status: 'INACTIVE' }, { where: { id: siteIds }})
        .then(() => {
          res.send({ success: 'Site is now In Active!' });
        });
    });
});

module.exports = router;
