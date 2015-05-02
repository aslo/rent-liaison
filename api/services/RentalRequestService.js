var Step = require('step');

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
  }
}
