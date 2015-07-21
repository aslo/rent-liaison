/**
 * RentalRequestController
 *
 * @description :: Server-side logic for managing rentalrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

// var Step = require('step');
var _ = require('lodash');

module.exports = {

  create: function(req, res, next) {
    var rentRequest = req.body;
    rentRequest.user.type = 'RENTER';

    RentalRequest.create(rentRequest, this)
    .then(function(result){
      return RentalRequest.findOne(result.id).populate('user');
    })
    .then(function(result){
      var mailTo = result.user.email;
      var uri = result.uri;
      return MailService.sendActivationEmail(mailTo, uri, this);
    })
    .then(function(){
      res.send(202, {});
    })
    .catch(function(err){
      if (err) res.serverError(err);
    });
  },

  findByUri: function(req, res, next) {
    var renderData;

    RentalRequestService.prepareRentalRequestDisplayData({ uri: req.params.uri })
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
      res.view('rentalRequest', _.extend(renderData, {
        _: _,
        welcome: isNew
      }));
    })
    .catch(next);

  },

  patch: function (req, res, next) {
    RentalRequest.update(req.params.id, req.body).populate('user')
    .then(function(result) { res.json(result); })
    .catch(next);
  }

};
