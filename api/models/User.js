/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var User = {

  attributes: {
    // associations
    passports: {
      collection: 'Passport',
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
      enum: ['PROPERTY_OWNER'],
      defaultsTo: 'PROPERTY_OWNER',
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
    }

  }
};

module.exports = User;
