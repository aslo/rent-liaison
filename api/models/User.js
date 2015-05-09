/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    // associations
    passports: {
      collection: 'Passport',
      via: 'user'
    },
    renterDetails: {
      model: 'RenterDetails',
      via: 'user'
    },

    // attributes
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE', 'UNCONFIRMED'],
      defaultsTo: 'UNCONFIRMED',
      required: true
    },
    type: {
      type: 'string',
      enum: ['RENTER', 'PROPERTY_OWNER'],
      required: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },

    getFullName: function() {
      return this.firstName + " " + this.lastName;
    },

    isUnconfirmed: function(){
      return this.status === 'UNCONFIRMED';
    },

    isPropertyOwner: function() {
      return this.type === 'PROPERTY_OWNER';
    }
  }
};

