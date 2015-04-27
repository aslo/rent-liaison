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

    // fields
    destination: {
      required: true,
      type: 'string',
      enum: ['East Hampton']
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
    travelers: {
      type: 'integer'
    },
    occasion: {
      type: 'string'
    },
    budget: {
      type: 'float'
    },
    group_comments: {
      type: 'string'
    },

    // instance methods
    getCompletionPercentage: function() {
      return 69;
      // var ignoreFields = [
      //   'createdAt',
      //   'updatedAt',
      //   'id'
      // ];

      // var totalFields = 0,
      //     completedFields = 0;

      // function count(obj) {
      //   for (key in obj) {
      //     if (obj[key] && typeof obj[key] === 'object') {
      //       count(obj[key]);
      //     } else if ((typeof obj[key] !== 'function') && ! _.contains(ignoreFields, key)) {
      //       console.log(key);
      //       totalFields++;
      //       if (typeof obj[key] !== 'undefined') {
      //         completedFields++;
      //       }
      //     }
      //   }
      // }

      // if (totalFields > 0) {
      //   return Math.round((completedFields / totalFields) * 100);
      // } else {
      //   return 100;
      // }
    }
  },

  beforeCreate: function(values, cb) {
    chars = 'abcdefghijklmnopqrstuvwxyz1234567890-_.';

    uri = '';
    for (var i = 0; i < URI_LENGTH; i++) {
      uri += chars[_.random(chars.length - 1)];
    }

    values.uri = uri;
    cb();
  }
};

