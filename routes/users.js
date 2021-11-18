const express = require('express');
const axios = require('axios')

const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { users } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('users');

// This file contains the logic of every route in Forest Admin for the collection users:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a User
router.post('/users', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a User
router.put('/users/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a User
router.delete('/users/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Users
router.get('/users', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Users
router.get('/users/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a User
router.get('/users/:recordId(?!count)', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Users
router.get('/users.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Users
router.delete('/users', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

router.post('/actions/users/impersonate', permissionMiddlewareCreator.smartAction(), (request, response) => {
    let userId = request.body.data.attributes.ids[0];
    let token = process.env.ADMIN_API_TOKEN;

    let apiUrl = 'https://api-dev.spacenextdoor.com/graphql';
    let sndSiteUrl = 'https://dev.spacenextdoor.com';
    if (process.env.NODE_ENV == 'staging') {
      apiUrl = 'https://api-stag.spacenextdoor.com/graphql';
      sndSiteUrl = 'https://stag.spacenextdoor.com';
    }
    else if (process.env.NODE_ENV == 'production') {
      apiUrl = 'https://api.spacenextdoor.com/graphql';
      sndSiteUrl = 'https://spacenextdoor.com';
    }

    console.log('impersonate: apiUrl: ', apiUrl)
    console.log('impersonate: sndSiteUrl: ', sndSiteUrl)

    return axios({
      url: apiUrl,
      method: 'post',
      data: {
        query: `mutation{
          loginAdminAsUser(payload:{user_id: ${userId}}){
            access_token
            refresh_token
          }
         }`
      },
      headers: {
        'authorization': token
      }
    })
      .then(res => {
        if (!res.data.errors) {
          const access_token = res.data.data.loginAdminAsUser.access_token
          const refresh_token = res.data.data.loginAdminAsUser.refresh_token || 'TEST'
          return response.send({
            success: `Impersonating user ${userId}`, // The success message that will be toasted.
            redirectTo: `${sndSiteUrl}/auth?token=${access_token}&refresh_token=${refresh_token}`,
          })
        }

        return response.send({
          error: res.data.errors[0].message
        })
      })
      .catch(err => {
        console.log(err.message);
        return response.send({
          error: err.message
        })
      });
});

module.exports = router;
