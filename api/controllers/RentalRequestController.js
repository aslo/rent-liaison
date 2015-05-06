/**
 * RentalRequestController
 *
 * @description :: Server-side logic for managing rentalrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Step = require('step');

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
    // TODO validate the uri

    var rentalRequest = undefined;
    Step(
      function(){
        RentalRequest.find({ where: { uri: req.params.uri }, limit: 1 })
        .populate('user')
        .exec(this);
      },
      function(err, rentalRequests) {
        if (err) return next(err);

        // 400
        if (rentalRequests.length < 1) return next();
        rentalRequest = rentalRequests[0];

        // activate rentalrequest if necessary
        RentalRequestService.activateRentalRequestIfInactive(rentalRequest, this);
      },
      function(err, user) {
        if (err) return next(err);

        // if the user was just confirmed
        if (user) {
          req.flash('message', 'welcome');
        }

        res.render('rentalRequest', {
          rentalRequest: rentalRequest,
          messages: req.flash('message')
        });
      }
    )
  },

  patch: function (req, res, next) {
    // TODO validate

    RentalRequest.update(req.params.id, req.body)
    .exec(function(){
      RentalRequest.findOne(req.params.id)
      .populate('user')
      .exec(function(err, result) {
        if (err) return next(err);
        res.json(result);
      });
    })
  }
};

