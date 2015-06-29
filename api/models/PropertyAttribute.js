module.exports = {

  attributes: {
    // associations
    properties: {
      collection: 'Property',
      via: 'propertyAttributes'
    },

    // attributes
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    type: {
      type: 'string',
      enum: ['AMENITY', 'LOCATION'],
      required: true
    }
  },

  findAllAmenities: function() {
    return this.find({ type: 'AMENITY' })
  },

  findAllLocations: function() {
    return this.find({ type: 'LOCATION' })
  }
}
