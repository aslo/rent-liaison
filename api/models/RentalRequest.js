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

    user: {
      model: 'user',
      required: true
    },
    destination: {
      required: true,
      type: 'string',
      enum: ['East Hampton']
    },
    uri: {
      type: 'string',
      required: true,
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
    }
  },

  beforeValidate: function(values, cb) {
    chars = 'abcdefghijklmnopqrstuvwxyz1234567890-_.';

    uri = '';
    for (var i = 0; i <= URI_LENGTH; i++) {
      uri += chars[_.random(chars.length - 1)];
    }

    values.uri = uri;
    cb();
  }
};

