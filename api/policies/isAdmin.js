var _ = require('lodash');

module.exports = function(req, res, next) {
  var admins = [
    'sloan623@gmail.com',
    'bfedner@gmail.com'
  ];

  if (_.contains(admins, req.user.email)) {
    return next();
  } else {
    return res.forbidden();
  }

};
