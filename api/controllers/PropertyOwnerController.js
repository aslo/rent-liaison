/**
 * RentalRequestController
 *
 * @description :: Server-side logic for managing rentalrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Step = require('step'),
    Promise = require('bluebird');

module.exports = {

  home: function (req, res, next) {
    res.view('modules/propertyowners/home', {
      user: req.user
    });
  },

  showRentalRequests: function (req, res) {
    // TODO assert that req.query is a properly-formed waterline query

    var query = { status: 'ACTIVE' };

    var dates = ['startDate', 'endDate'];
    if (req.query) {
      for (var i in dates) {
        var dateField = dates[i];
        if (req.query[dateField]) {
          for (var operator in req.query[dateField]) {
            if (req.query[dateField][operator]) {
              req.query[dateField][operator] = new Date(+req.query[dateField][operator]);
            }
          }
        }
      }
      query = _.extend(query, req.query);
    }

    return Promise.join(
      RentalRequest.findWithAssociations({ where: query }), // TODO limit, paginate
      Property.findForUser(req.user.id),

      function(rentalRequests, myProperties) {
        res.format({
          json: function(){
            res.json(rentalRequests);
          },
          html: function(){
            res.view('modules/propertyowners/rentalrequests', {
              rentalRequests: rentalRequests,
              myProperties: myProperties
            });
          }
        });
      }
    )
    .catch(function (err) {
      return res.serverError(err);
    });
  },

  respondToRentalRequest: function(req, res) {
    var propertyIds = req.body.propertyIds;
    if (!propertyIds || propertyIds.length < 1) {
      return res.badRequest('Expected at least one propertyId');
    }

    Step(
      function(){
        RentalRequest.findOne(req.params.id)
        .populate('user')
        .exec(this.parallel());

        Property.find({id: req.body.propertyIds})
        .exec(this.parallel());
      },
      function(err, rentRequest, properties){
        if (err) return res.serverError(err);
        MailService.sendRentRequestResponseEmail(rentRequest, req.user, properties, this);
      },
      function(err){
        if (err) return res.serverError(err);
        res.ok();
      }
    );
  },

  indexProperties: function (req, res, next) {
    Promise.join(
      Property.find({ user: req.user.id })
        .populate('images')
        .populate('destination')
        .populate('propertyAttributes')
        .populate('externalListings')
      .sort({ createdAt: 'DESC' }),

      PropertyService.getAllPropertyCharacteristics(),

      function(properties, propData){
        return res.view('modules/propertyowners/properties', _.extend({ properties: properties }, propData));
      }
    )
    .catch(function(err){
      next(err);
    });
  },

  createProperty: function (req, res, next) {
    var property = req.body;
    property.user = req.user;

    Property.create(property, function(err, result){
      if (err) return next(err);
      res.json(result);
    });
  },

  addImageToProperty: function(req, res, next) {
    if (!req.file('file')) {
      return res.badRequest();
    }

    UploadService.s3upload(req.file('file'))
    .then(function(uploadedFiles){
      if (uploadedFiles.length > 0) {
        var uploads = [];
        uploadedFiles.forEach(function(file){
          uploads.push(Image.create({
            property: req.params.id,
            url: file.extra.Location
          }));
        });
        return Promise.all(uploads);
      } else {
        return res.serverError();
      }
    })
    .then(function(uploadedFiles){
      return res.json({
        files: uploadedFiles,
        textParams: req.params.all()
      });
    })
    .catch(function(err){
      return res.serverError(err);
    });
  },

  deleteImage: function (req, res) {
    Image.destroy(req.params.imageId)
    .then(function(){
      return res.ok();
    })
    .catch(function(){
      return res.serverError(err);
    });
  },

};
