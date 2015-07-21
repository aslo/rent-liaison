define([
  'backbone',
  'underscore',
  'modules/user/model'
], function(Backbone, _, UserModel){

  return Backbone.Model.extend({
    urlRoot: '/rentalrequest',

    initialize: function() {
      this.attributes = this._initializeAttributes(this.attributes);
    },

    parse: function(response) {
      return this._initializeAttributes(response);
    },

    toJSON: function() {
      var json = _.clone(this.attributes);
       for(var attr in json) {
         if (json[attr] instanceof Backbone.Model) {
           json[attr] = json[attr].toJSON();
         }
       }
       return json;
    },

    _initializeAttributes: function(attributes) {
      if (attributes.user && !(attributes.user instanceof Backbone.Model)) {
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
