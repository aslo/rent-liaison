module.exports = {

  attributes: {
    //associations
    user: {
      model: 'user',
      via: 'property'
    },

    //attributes
    name: {
      type: 'string',
      required: true,
      minLength: 8,
      regex: '[\w\s]+' // alphanumeric plus spaces
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

  beforeCreate: function(values, cb) {
    var slug = values.name.replace('\s', '-')
    // check to make sure the slug is unique
    this.prototype.find({ slug: slug }, function(err, properties){
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

