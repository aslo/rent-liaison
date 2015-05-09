/**
 * RentalRequestController
 *
 * @description :: Server-side logic for managing rentalrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Step = require('step'),
    moment = require('moment');

module.exports = {

  home: function (req, res, next) {
    res.view('modules/propertyowners/home', {
      user: req.user
    });
  },

  showRentalRequests: function (req, res, next) {
    RentalRequest.find({ status: 'ACTIVE' })
    .populate('user')
    .exec(function(err, results) {
      if (err) return next(err);

      res.view('modules/propertyowners/rentalrequests', {
        moment: moment,
        rentalRequests: results
      })
    });
  },

  showProperties: function (req, res, next) {
    Property.find({ user: req.user.id }, function(err, properties){
      res.view('modules/propertyowners/properties', {
        properties: properties
      });
    });
  }
};

