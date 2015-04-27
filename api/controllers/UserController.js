/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  patch: function (req, res, next) {
    // TODO validate

    User.update(req.params.id, req.body)
    .then(function(result) {
      if (result.length != 1) {
        return next(new Error('Should not be making more than 1 update'))
      }
      res.json(result[0]);
    });
  }
};

