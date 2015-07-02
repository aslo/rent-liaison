var Promise = require('bluebird');

module.exports = {
  /**
   * activateRentalRequestIfInactive
   *
   * If a rental request is not active, and has not been deleted, etc, its status will be marked as ACTIVE.
   * Calls back with the user object if an update was peformed, null if otherwise. Also performs similar logic for
   * the rentalrequest's user.
   */
  activateRentalRequestIfInactive: function(rentalRequest) {
    return Promise.join(
      UserService.confirmUserIfUnconfirmed(rentalRequest.user)
    ,
      Promise.try(function(){
        if (rentalRequest.isUnconfirmed()) {
          sails.log.debug('Confirming new rentalRequest with id', rentalRequest.id);
          return RentalRequest.update(rentalRequest.id, {status: 'ACTIVE'});
        } else {
          return;
        }
      })
    )
    .then(function(user, rentalRequest){
      var isNew = false;

      if (rentalRequest) {
        isNew = true;
      }
      return isNew;
    })
  },

  prepareRentalRequestDisplayData: function(searchParams) {
    var result = undefined;

    //TODO some of this code is shared with PropertyService.getAllPropertyCharacteristics.
    // DRY this up

    return Promise.props({
      rentalRequest: RentalRequest.findOneWithAssociations(searchParams),
      destinations: Destination.findAll(),
      amenities: PropertyAttribute.findAllAmenities(),
      locations: PropertyAttribute.findAllLocations()
    })
    .then(function(r){
      result = r;
      if (!result.rentalRequest) {
        return;
      } else if (result.rentalRequest.user.renterDetails) {
        return RenterDetails.findOne(result.rentalRequest.user.renterDetails)
      } else {
        return {};
      }
    })
    .then(function(renterDetails){
      result.rentalRequest.user.renterDetails = renterDetails;
      return result;
    })
  }
}
