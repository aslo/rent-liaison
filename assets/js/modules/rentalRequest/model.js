define([
  'backbone',
  'modules/user/model'
], function(Backbone, UserModel){

  return Backbone.Model.extend({
    urlRoot: '/rentalrequest',

    initialize: function() {
      this.attributes = this._initializeAttributes(this.attributes);
    },

    parse: function(response) {
      return this.initializeAttributes(response);
    },

    _initializeAttributes: function(attributes) {
      if (attributes.user) {
        var rawUser = attributes.user;
        attributes.user = new UserModel(rawUser);
      }

      ['startDate', 'endDate'].forEach(function(date){
        if (attributes[date]) {
            attributes[date] = new Date(attributes[date]);
          }
        });
      return attributes;
    }

  });
});
