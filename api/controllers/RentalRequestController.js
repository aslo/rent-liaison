/**
 * RentalRequestController
 *
 * @description :: Server-side logic for managing rentalrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Step = require('step');
var _ = require('lodash');

module.exports = {

  create: function(req, res, next) {
    // TODO validate
    // * end date after start, etc

    var rentRequest = req.body;
    rentRequest.user.type = 'RENTER';

    Step(
      function(){
        RentalRequest.create(rentRequest, this);
      },
      function(err, result){
        if (err) return next(err);
        RentalRequest
          .findOne(result.id)
          .populate('user')
          .exec(this);
      },
      function(err, result){
        if (err) return next(err);

        var mailTo = result.user.email;
        var uri = result.uri;
        MailService.sendActivationEmail(mailTo, uri, this);
      },
      function(err, mailerResult){
        if (err) return next(err);
        res.send(202, {});
      }
    )
  },

  findByUri: function(req, res, next) {
    var renderData = undefined;

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
    .catch(next)

  },

  patch: function (req, res, next) {
    RentalRequest.update(req.params.id, req.body).populate('user')
    .then(function(result) { res.json(result) })
    .catch(next)
  }

};
