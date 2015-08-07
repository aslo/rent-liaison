_      = require('lodash');
moment = require('moment');

var URI_LENGTH = 24;

module.exports = {

  attributes: {

    // associations
    destinations: {
      required: true,
      collection: 'Destination'
    },
    desiredPropertyAttributes: {
      collection: 'PropertyAttribute'
    },

    // fields
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE', 'UNCONFIRMED'],
      defaultsTo: 'UNCONFIRMED',
      required: true
    },
    uri: {
      type: 'string',
      // required: true,
      unique: true,
      size: URI_LENGTH
    },
    startDate: {
      type: 'date'
    },
    endDate: {
      type: 'date'
    },
    datesAreFlexible: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    occasion: {
      type: 'string'
    },
    adults: {
      type: 'integer',
      min: 0
    },
    children: {
      type: 'integer',
      min: 0
    },
    budget: {
      type: 'float',
      min: 0
    },
    groupComments: {
      type: 'string'
    },
    bedrooms: {
      type: 'integer',
      min: 0
    },
    sleeps: {
      type: 'integer',
      min: 0
    },

    // renter details fields (aka user-like fields)
    // one day, we might want to just make these users
    email: {
      type: 'email',
      required: true
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    dateOfBirth: {
      type: 'date'
    },
    occupation: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },

    // address
    address1: {
      type: 'string'
    },
    address2: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    zip: {
      type: 'string'
    },

    // instance methods

    isUnconfirmed: function() {
      return this.status === 'UNCONFIRMED';
    },

    getTotalGuests: function() {
      var parse = function(num){
          if (isNaN(num)) {
            return 0;
          }
          else {
            return num;
          }
      };

      return parse(this.adults) + parse(this.children);
    },

    getCompletionPercentage: function() {
      var ignoreFields = [
        'createdAt',
        'updatedAt',
        'id',
        'passports',
        'status',
        'uri',
        'datesAreFlexible',
        'address2'
      ];

      var totalFields = 0,
          completedFields = 0;

      // TODO handle this on the client

      function count(obj) {
        for (var key in obj) {
          if (! _.contains(ignoreFields, key)) {
            if (typeof obj[key] === 'object') {
              count(obj[key]);
            } else if (typeof obj[key] !== 'function') {
              totalFields++;
              if (obj[key] || parseInt(obj[key]) === 0) {
                completedFields++;
              }
            }
          }
        }
      }

      count(this);

      if (totalFields > 0) {
        return Math.round((completedFields / totalFields) * 100);
      } else {
        return 100;
      }
    }
  },

  findWithAssociations: function (searchParams) {
    return this.find(searchParams)
      .populate('destinations')
      .populate('desiredPropertyAttributes');
  },

  findOneWithAssociations: function (searchParams) {
    return this.findWithAssociations(searchParams)
    .then(function(results){
      if (results.length > 0) {
        return results[0];
      } else {
        return results;
      }
    });
  },

  beforeValidate: function(values, cb) {
    // TODO check if this user currently has any other actiev ones?
    // or maybe put some arbitrary limit?
    // TODO also maybe auto-activate if this user has been seen before?
    cb();
  },

  afterValidate: function(values, cb) {
    if (values.startDate && values.endDate && moment(values.startDate).isAfter(values.endDate)) {
        cb(new Error('start date can not be after end'));
    } else {
      cb();
    }
  },

  beforeCreate: function(values, cb) {
    values.uri = this._generateRandomUri();
    cb();
  },

  _generateRandomUri: function() {
    chars = 'abcdefghijklmnopqrstuvwxyz1234567890';

    uri = '';
    for (var i = 0; i < URI_LENGTH; i++) {
      uri += chars[_.random(chars.length - 1)];
    }
    return uri;
  }

};
