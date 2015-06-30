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
      defaultsTo: 'PROPERTY_OWNER',
      required: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },

    getFullName: function() {
      if (this.firstName && this.lastName) {
        return this.firstName + " " + this.lastName;
      } else if (this.firstName) {
        return this.firstName;
      }
      return '';
    },

    isUnconfirmed: function(){
      return this.status === 'UNCONFIRMED';
    },

    isPropertyOwner: function() {
      return this.type === 'PROPERTY_OWNER';
    },

    isRenter: function() {
      return this.type === 'RENTER';
    },

    afterCreate: function(values, cb) {
      if (this.isRenter()) {
        RenterDetails.create({ user: values.id }, cb);
      } else {
        cb();
      }
    }
  }
};

