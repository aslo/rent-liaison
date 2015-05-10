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
    Step(
      function(){

        RentalRequest.find({ status: 'ACTIVE' })
        .populate('user')
        .exec(this.parallel())

        Property.find({ user: req.user.id })
        .exec(this.parallel())

      }, function(err, rentalRequests, propertyProfiles) {
        if (err) return next(err);

        res.view('modules/propertyowners/rentalrequests', {
          moment: moment,
          rentalRequests: rentalRequests,
          propertyProfiles: propertyProfiles
        })
      }
    )
  },

  respondToRentalRequest: function(req, res, next) {
    Step(
      function(){
        RentalRequest.findOne(req.params.id)
        .populate('user')
        .exec(this)
      },
      function(err, rentRequest){
        if (err) return next(err)

        console.log(req.user.email)
        MailService.sendRentRequestResponseEmail(rentRequest, req.user, req.body.message, this)
      },
      function(err){
        if (err) return next(err)
        res.send(200, {})
      }
    )
  }
};

