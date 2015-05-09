module.exports = {

  attributes: {
    //associations
    user: {
      model: 'user',
      via: 'property',
      required: true
    },

    //attributes
    name: {
      type: 'string',
      required: true,
      minLength: 8,
      regex: /[\w\s]+/
    },
    slug: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
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
    // TODO pictures:
  },

  beforeValidate: function(values, cb) {
    if (!name) cb(); // will be caught in validation

    var slug = values.name.toLowerCase().replace(/\s+/g, '-');

    // check to make sure the slug is unique
    Property.find({ slug: slug }, function(err, properties){
      if (err) return cb(err);

      if (properties.length > 0) {

        var matches = slug.match(/^([\w-])(\d+)$/);
        var firstPart = matches[0];
        var number = +matches[1];

        // if it already ends with a number, increment
        if (!isNaN(number)) {
          number++;
          slug = firstPart + number.toString()
        }
      }

      values.slug = slug;
      cb();

    });
  }

}

