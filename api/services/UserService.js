module.exports = {
  /**
   * confirmUserIfUnconfirmed
   *
   * If a user has not yet been confirmed, its status will be marked as ACTIVE.
   * Calls back with the user object if an update was peformed, null if otherwise.
   */
  confirmUserIfUnconfirmed: function(userId) {
    return User.findOne(userId)
    .then(function(user){
      if (user.isUnconfirmed()) {
        sails.log.debug('Confirming new user with id', user.id);
        return User.update(user.id, {status: 'ACTIVE'});
      } else {
        return;
      }
    })
  },

  deactivateUser: function(userId) {
    return User.findOne(userId)
    .then(function(user){
      if (user.status != 'INACTIVE') {
        return User.update(user.id, {status: 'INACTIVE'});
      } else {
        return;
      }
    })
  }
}
