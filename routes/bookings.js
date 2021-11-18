const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter } = require('forest-express-sequelize');
const { bookings, sites, siteAddresses, cities, countries, districts } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('bookings');
const axios = require('axios');

// This file contains the logic of every route in Forest Admin for the collection bookings:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Booking
router.post('/bookings', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Booking
router.put('/bookings/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Booking
router.delete('/bookings/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Bookings
router.get('/bookings', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Bookings
router.get('/bookings/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Booking
router.get('/bookings/:recordId(?!count)', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Bookings
router.get('/bookings.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Bookings
router.delete('/bookings', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

// Cancel booking
router.post('/actions/bookings/cancel', permissionMiddlewareCreator.smartAction(), (req, res) => {
  return new RecordsGetter(bookings).getIdsFromRequest(req)
    .then((bookingIds) => {
      return bookings
        .update({ status: 'CANCELLED' }, { where: { id: bookingIds }})
        .then(() => {
          res.send({ success: 'Booking is now Cancelled!' });
        });
    });
});
// Send Email to Customer
router.post('/actions/bookings/send-email', permissionMiddlewareCreator.smartAction(), (req, response) => {
  return new RecordsGetter(bookings).getIdsFromRequest(req)
    .then((bookingId) => {
      bookings
      .findOne({ where: { id: bookingId }, include: [{model: sites, as: 'site', include: [{model: siteAddresses, as: 'address', include: [{model: cities, as: 'city'}, {model: countries, as: 'country'}, {model: districts, as: 'district'}]}] }]})
      .then((booking) => {
        let apiUrl = 'https://api-dev.spacenextdoor.com/graphql';
        let token = process.env.ADMIN_API_TOKEN;
        if (process.env.NODE_ENV == 'development') {
          apiUrl = 'https://api-dev.spacenextdoor.com/graphql';
        }
        else if (process.env.NODE_ENV == 'staging') {
          apiUrl = 'https://api-stag.spacenextdoor.com/graphql';
        }
        else if (process.env.NODE_ENV == 'production') {
          apiUrl = 'https://api.spacenextdoor.com/graphql';
        }
        const templateId = 'd-9f93d1b673da4357a55089c64c70c3d3';
        const customerEmail = booking.customerEmail;
        const siteAddress = `${booking.site.address.street} ${
          booking.site.address.flat || ''
        } ${booking.site.address.district.nameEn}, ${
          booking.site.address.city.nameEn
        }, ${booking.site.address.country.nameEn} - ${
          booking.site.address.postalCode || ''
        }`;
        return axios({
          url: apiUrl,
          method: 'post',
          data: {
            query: `mutation{
              sendNotification(payload: {template_id: "${templateId}", template_body: {booking_id: ${booking.id}, site_name: "${booking.siteName}", move_in_date: "${booking.moveInDate}", unit_id: "${booking.unitId}", first_name: "${booking.customerName}", address: "${siteAddress}"}, type: EMAIL}, where: {username: {_eq: "${customerEmail}"} }) {
                isSent
              }
             }`
          },
          headers: {
            'authorization': token
          }
        })
          .then(res => {
            if (!res.data.errors) {
              return response.send({ success: 'Email Successfully sent!' });
            }
    
            return response.send({
              error: res.data.errors[0].message
            })
          })
          .catch(err => {
            return response.send({
              error: err.message
            })
          });
      });
    });
});

module.exports = router;
