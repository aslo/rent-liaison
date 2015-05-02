module.exports = {
  /**
   * confirmUserIfUnconfirmed
   *
   * If a user has not yet been confirmed, its status will be marked as ACTIVE.
   * Calls back with the user object if an update was peformed, null if otherwise.
   */
  confirmUserIfUnconfirmed: function(user, cb) {
    if (user.isUnconfirmed()) {
      sails.log.debug('Confirming new user with id', user.id);
      User.update(user.id, {status: 'ACTIVE'}, cb);
    } else {
      cb(null, null);
    }
  }
}
