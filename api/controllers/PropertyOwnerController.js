/**
 * RentalRequestController
 *
 * @description :: Server-side logic for managing rentalrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Step = require('step'),
    Promise = require('bluebird');

module.exports = {

  home: function (req, res, next) {
    res.view('modules/propertyowners/home', {
      user: req.user
    });
  },

  showRentalRequests: function (req, res) {
    return Promise.join(
      RentalRequest.findWithAssociations({ status: 'ACTIVE' }) // TODO limit, paginate
    ,
      Property.findForUser(req.user.id)
    ,
      function(rentalRequests, myProperties) {
        res.view('modules/propertyowners/rentalrequests', {
          rentalRequests: rentalRequests,
          propertyProfiles: myProperties
        })
      }
    )
    .catch(function (err) {
      return res.serverError(err);
    })
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

