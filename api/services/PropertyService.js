var Promise = require('bluebird')

module.exports = {

  getAllPropertyCharacteristics: function(){
    return Promise.props({
      destinations: Destination.findAll(),
      amenities: PropertyAttribute.findAllAmenities(),
      locations: PropertyAttribute.findAllLocations()
    });
  }

}
