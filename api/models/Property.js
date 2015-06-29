module.exports = {

  attributes: {
    //associations
    user: {
      model: 'User',
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
      enum: ['HOUSE', 'CONDO', 'HOTEL', 'MOTEL', 'B&B', 'BOAT'],
      required: true
    },
    description: {
      type: 'string'
    },
    location: {
      type: 'string'
    },
    amenities: {
      type: 'string'
    }
  },

  beforeValidate: function(values, cb) {
    if (!values.name) return cb(); // will be caught in validation

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

