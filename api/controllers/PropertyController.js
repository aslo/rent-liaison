var Step = require('step')
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

  addImageToProperty: function(req, res) {
    if (!req.file('file')) {
      return res.badRequest()
    }

    Step(
      function(){
        UploadService.s3upload(req.file('file'), this);
      },
      function(err, uploadedFiles){
        if (err) return res.serverError(err);

        if (uploadedFiles.length > 0) {
          var group = this.group()

          uploadedFiles.forEach(function(file){
            Image.create({
              property: req.params.id,
              url: file.extra.Location
            }).exec(group());
          })

        } else {
          // something went wrong
          // TODO how to send error text? err object? or just string?
          return res.serverError();
        }

      },
      function(err, updatedImages){
        if (err) return res.serverError(err);
        res.json(updatedImages);
      }
    )

    UploadService.s3upload(req.file('file'), function(err, uploadedFiles){
      if (err) return res.serverError(err);
      else return res.json({
        files: uploadedFiles,
        textParams: req.params.all()
      });
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
