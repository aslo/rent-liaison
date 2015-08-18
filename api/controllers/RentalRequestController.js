/**
 * RentalRequestController
 *
 * @description :: Server-side logic for managing rentalrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');
var Promise = require('bluebird');

module.exports = {

  create: function(req, res) {
    var rentRequest = req.body;

    RentalRequest.create(rentRequest, this)
    .then(function(result){
      var mailTo = result.email;
      var uri = result.uri;
      return Promise.promisify(MailService.sendActivationEmail)(mailTo, uri);
    })
    .then(function(){
      res.send(202, {});
    })
    .catch(function(err){
      if (err) res.serverError(err);
    });
  },

  findByUri: function(req, res) {
    var renderData;

    RentalRequest.findOne({ uri: req.params.uri })
    .then(function(result){
      // if it doesn't exist, bail
      if (!result) {
        return res.notFound();
      // else, continue
      } else {
        return RentalRequestService.prepareRentalRequestDisplayData({ uri: req.params.uri })
        .then(function(data){
          renderData = data;
          if (!renderData) {
            return res.notFound();
          } else {
            // activate rentalrequest if necessary
            return RentalRequestService.activateRentalRequestIfInactive(renderData.rentalRequest);
          }
        })
        .then(function(isNew){
          return res.view('modules/rentalRequest/rentalRequest', _.extend(renderData, {
            welcome: isNew
          }));
        })
        .catch(function(err){
          return res.serverError(err);
        });
      }
    })
    .catch(function(err){
      return res.serverError(err);
    });

  },

  patch: function (req, res, next) {
    RentalRequest.update(req.params.id, req.body)
    .then(function(result) { res.json(result); })
    .catch(next);
  }

};
