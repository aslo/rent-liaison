var Promise = require('bluebird')

module.exports = {

  index: function (req, res, next) {
    Promise.join(
      Property.find({ user: req.user.id })
        .populate('images')
        .populate('destination')
        .populate('propertyAttributes')
        .populate('externalListings')
      .sort({ createdAt: 'DESC' })
    ,
      PropertyService.getAllPropertyCharacteristics()
    ,
      function(properties, propData){
        return res.view('modules/propertyowners/properties', _.extend({ properties: properties }, propData));
      }
    )
    .catch(function(err){
      next(err);
    })
  },

  create: function (req, res, next) {
    var property = req.body;
    property.user = req.user;

    Property.create(property, function(err, result){
      if (err) return next(err)
      res.json(result);
    })
  },

  addImageToProperty: function(req, res, next) {
    if (!req.file('file')) {
      return res.badRequest()
    }

    UploadService.s3upload(req.file('file'))
    .then(function(uploadedFiles){
      if (uploadedFiles.length > 0) {
        var uploads = [];
        uploadedFiles.forEach(function(file){
          uploads.push(Image.create({
            property: req.params.id,
            url: file.extra.Location
          }))
        })
        return Promise.all(uploads)
      } else {
        return res.serverError();
      }
    })
    .then(function(uploadedFiles){
      return res.json({
        files: uploadedFiles,
        textParams: req.params.all()
      })
    })
    .catch(function(err){
      return res.serverError(err)
    })
  },

  get: function(req, res, next) {
    Property.findOne({ slug: req.params.slug })
      .populate('user')
      .populate('images')
      .populate('destination')
      .populate('propertyAttributes')
      .populate('externalListings')

    .then(function(property){
      return res.view('modules/property/property', {
        property: property,
        amenities: property.getAmenities(),
        locations: property.getLocations(),
        destination: property.getDestination()
      });
    })
    .catch(function(err){
      return next(err);
    })
  }
}
