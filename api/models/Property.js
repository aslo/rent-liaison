var _ = require('lodash')

module.exports = {

  attributes: {
    //associations
    user: {
      model: 'User',
      required: true
    },
    destination: {
      model: 'Destination',
      required: true
    },
    images: {
      collection: 'Image',
      via: 'property'
    },
    propertyAttributes: {
      collection: 'PropertyAttribute',
      via: 'properties'
    },
    externalListings: {
      collection: 'ExternalListing',
      via: 'property'
    },

    //attributes
    name: {
      type: 'string',
      required: true,
      minLength: 8,
      regex: /^[\w\s]+$/
    },
    slug: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },
    type: {
      type: 'string',
      enum: ['HOUSE', 'CONDO', 'HOTEL', 'MOTEL', 'BED_AND_BREAKFAST', 'BOAT'],
      required: true
    },
    description: {
      type: 'string'
    },
    bedrooms: {
      type: 'finite',
      required: true,
      defaultsTo: 1,
      min: 0
    },
    bathrooms: {
      type: 'finite',
      required: true,
      defaultsTo: 1,
      min: 0
    },
    sleeps: {
      type: 'finite',
      required: true,
      defaultsTo: 1,
      min: 0
    },
    amenitiesDescription: {
      type: 'string',
      maxLength: 1500
    },

    // instance methods
    getAmenities: function() {
      return this.getPropertyAttributesForType('AMENITY')
    },

    getLocations: function() {
      return this.getPropertyAttributesForType('LOCATION')
    },

    getPropertyAttributesForType: function(type) {
      if (this.propertyAttributes && this.propertyAttributes.length) {
        return _.filter(this.propertyAttributes, { type: type })
      }
      return [];
    },

    getDestination: function() {
      return this.destination ? this.destination : null;
    }

  },

  findForUser: function(userId) {
    return this.find({ user: userId })
  },

  beforeValidate: function(values, cb) {
    if (!values.name) return cb(); // will be caught in validation
    if (values.slug) return cb();

    var slug = values.name.trim().toLowerCase().replace(/\s+/g, '-');

    // check to make sure the slug is unique
    Property.find({ slug: slug }, function(err, properties){
      if (err) return cb(err);

      if (properties.length > 0) {
        slug += '0'

        // TODO
        // var matches = slug.match(/^([\w-]+)(\d+)$/);

        // if (matches) {
        //   // the slug ends with a number - parse it and increment
        //   var firstPart = matches[1];
        //   var number = +matches[2];

        //   number++;
        //   slug = firstPart + number.toString()

        // } else {
        //   // if the regex didn't match, there is no number at the end
        //   slug = slug + '1'
        // }
      }

      values.slug = slug;
      cb();

    });
  }

}

