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

      // TODO MailService.sendActivationEmail

      res.json(202, {});
    });

  },

  findByUri: function(req, res) {

    // TODO validate the uri

    RentalRequest.find({ where: { uri: req.params.uri }, limit: 1 })
    .populate('user')
    .then(function(rentalRequests) {
      // 400
      if (rentalRequests.length < 1) return next();

      rentalRequest = rentalRequests[0]
      res.render('rentalRequest', { rentalRequest: rentalRequest });
    });
  }
};

