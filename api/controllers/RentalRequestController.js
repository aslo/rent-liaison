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
    // TODO validate the uri
    var renderData = undefined;

    Step(
      function(){
        RentalRequestService.prepareRentalRequestDisplayData({ uri: req.params.uri }, this);
      },
      function(err, result){
        if (err) {
          return next(err);
        } else if (!result) {
          return res.notFound();
        } else {
          renderData = result;

          // activate rentalrequest if necessary
          RentalRequestService.activateRentalRequestIfInactive(renderData.rentalRequest, this.parallel());
        }
      },
      function(err, user) {
        if (err) return next(err);

        // if the user was just confirmed
        if (user) {
          req.flash('message', 'welcome');
        }

        res.view('rentalRequest', _.extend(renderData, {
          _: _,
          messages: req.flash('message')
        }));
      }
    )
  },

  patch: function (req, res, next) {
    // TODO validate

    RentalRequest.update(req.params.id, req.body)
    .then(function(){
      RentalRequest.findOne(req.params.id).populate('user')
    })
    .then(function(result){
      res.json(result);
    })
    .catch(next)
  }

};
