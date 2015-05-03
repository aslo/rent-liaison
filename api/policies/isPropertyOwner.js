
module.exports = function(req, res, next) {
  if (req.user && req.user.isPropertyOwner()) {
    return next();
  }

  return res.forbidden('You are not permitted to perform this action.');

};
