/**
 * RentalRequestController
 *
 * @description :: Server-side logic for managing rentalrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {

    // TODO validate
    // * end date after start, etc

    RentalRequest.create(req.body)
    .then(function(result){
      res.json(202, {});
    });

  },

  findByUri: function(req, res) {

    // TODO validate the uri

    RentalRequest.find({ where: { uri: req.params.uri }, limit: 1 })
    .populate('user')
    .then(function(result) {
      res.json(result);
    });
  }
};

