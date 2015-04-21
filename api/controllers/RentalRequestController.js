/**
 * RentalRequestController
 *
 * @description :: Server-side logic for managing rentalrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  findByUri: function(req, res, next){

    // TODO validate the uri

    RentalRequest.find({ where: { uri: req.params.uri }, limit: 1 })
    .populate('user')
    .then(function(result) {
      res.json(result);
    })
    .error(next);
  }
};

