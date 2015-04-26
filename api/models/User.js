/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE', 'UNCONFIRMED'],
      defaultsTo: 'UNCONFIRMED'
    },

    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    phone: {
      type: 'string'
    },
    dateOfBirth: {
      type: 'date'
    },
    occupation: {
      type: 'string'
    },

    // address fields
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
    }
  }
};

