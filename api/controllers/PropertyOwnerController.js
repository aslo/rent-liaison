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

  showRentalRequests: function (req, res) {
    Step(
      function(){

        RentalRequest.find({ status: 'ACTIVE' })
        .populate('user')
        .exec(this.parallel())

        Property.find({ user: req.user.id })
        .exec(this.parallel())

      },
      function(err, rentalRequests, propertyProfiles) {
        if (err) return res.serverError(err);

        res.view('modules/propertyowners/rentalrequests', {
          moment: moment,
          rentalRequests: rentalRequests,
          propertyProfiles: propertyProfiles
        })
      }
    )
  },

  respondToRentalRequest: function(req, res) {
    var propertyIds = req.body.propertyIds;
    if (!propertyIds || propertyIds.length < 1) {
      return res.badRequest('Expected at least one propertyId')
    }

    Step(
      function(){
        RentalRequest.findOne(req.params.id)
        .populate('user')
        .exec(this.parallel())

        Property.find({id: req.body.propertyIds})
        .exec(this.parallel())
      },
      function(err, rentRequest, properties){
        if (err) return res.serverError(err)
        MailService.sendRentRequestResponseEmail(rentRequest, req.user, properties, this)
      },
      function(err){
        if (err) return res.serverError(err)
        res.ok()
      }
    )
  }
};

