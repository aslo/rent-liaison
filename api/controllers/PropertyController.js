var Promise = require('bluebird');

module.exports = {

  get: function(req, res) {
    Property.findOne({ slug: req.params.slug })
      .populate('user')
      .populate('images')
      .populate('destination')
      .populate('propertyAttributes')
      .populate('externalListings')
    .then(function(property){
      if (!property) {
        return res.notFound();
      } else {
        return res.view('modules/property/property', {
          property: property,
          amenities: property.getAmenities(),
          locations: property.getLocations(),
          destination: property.getDestination()
        });
      }
    })
    .catch(function(err){
      return res.serverError(err);
    });
  }
};
