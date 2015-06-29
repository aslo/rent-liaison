var Step = require('step');
var Promise = require('bluebird');

module.exports = {
  /**
   * activateRentalRequestIfInactive
   *
   * If a rental request is not active, and has not been deleted, etc, its status will be marked as ACTIVE.
   * Calls back with the user object if an update was peformed, null if otherwise. Also performs similar logic for
   * the rentalrequest's user.
   */
  activateRentalRequestIfInactive: function(rentalRequest, cb) {
    Step(
      function(){
        if (rentalRequest.isUnconfirmed()) {
          sails.log.debug('Confirming new rentalRequest with id', rentalRequest.id);
          RentalRequest.update(rentalRequest.id, {status: 'ACTIVE'}, this.parallel());
        } else {
          this.parallel()(null, null);
        }

        UserService.confirmUserIfUnconfirmed(rentalRequest.user, this.parallel());

      },
      function(err, rentalrequest, user) {
        if (err) return cb(err);

        if (rentalrequest && user) {
          rentalrequest.user = user
        }
        cb(null, rentalrequest);
      }
    )
  },

  prepareRentalRequestDisplayData: function(searchParams, cb) {
    var result = undefined;

    Promise.props({
      rentalRequests: RentalRequest.find({ where: searchParams, limit: 1 })
        .populate('user')
        .populate('destinations')
        .populate('desiredPropertyAttributes'),
      destinations: Destination.find({}),
      amenities: PropertyAttribute.findAllAmenities(),
      locations: PropertyAttribute.findAllLocations()
    })
    .then(function(r){
      result = r;
      if (result.rentalRequests.length < 1) {
        return cb();
      } else {
        result.rentalRequest = result.rentalRequests[0];

        return RenterDetails.find({ id: result.rentalRequest.user.renterDetails , limit: 1})
      }
    })
    .then(function(renterDetailses){
      if (renterDetailses.length > 0) {
        result.rentalRequest.user.renterDetails = renterDetailses[0];
      } else {
        // TODO should create one on user creation
        result.rentalRequest.user.renterDetails = {};
      }

      cb(null, result);
    })
    .catch(cb)
  }
}
