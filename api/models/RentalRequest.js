/**
* RentalRequest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

_ = require('lodash');

var URI_LENGTH = 15;

module.exports = {

  attributes: {

    // associations
    user: {
      model: 'user',
      required: true
    },
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
      type: 'integer'
    },
    children: {
      type: 'integer'
    },
    budget: {
      type: 'float'
    },
    groupComments: {
      type: 'string'
    },
    bedrooms: {
      type: 'integer'
    },
    sleeps: {
      type: 'integer'
    },

    // instance methods

    isUnconfirmed: function() {
      return this.status === 'UNCONFIRMED'
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
        for (key in obj) {
          if (! _.contains(ignoreFields, key)) {
            if (typeof obj[key] === 'object') {
              count(obj[key]);
            } else if (typeof obj[key] !== 'function') {
              totalFields++;
              if (obj[key] || parseInt(obj[key]) == 0) {
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
      .populate('user')
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
    })
  },

  beforeCreate: function(values, cb) {
    values.uri = this._generateRandomUri();
    cb();
  },

  _generateRandomUri: function() {
    chars = 'abcdefghijklmnopqrstuvwxyz1234567890-_.';

    uri = '';
    for (var i = 0; i < URI_LENGTH; i++) {
      uri += chars[_.random(chars.length - 1)];
    }
    return uri;
  }

};

