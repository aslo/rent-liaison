define([
  'backbone',
  'modules/user/model'
], function(Backbone, UserModel){

  return Backbone.Model.extend({
    urlRoot: '/rentalrequest',

    initialize: function() {
      if (this.has('user')) {
        var rawUser = this.get('user');
        this.set('user', new UserModel(rawUser))
      }
    },

    parse: function(response, options) {

      if (response.user) {
        var rawUser = response.user;
        response.user = new UserModel(rawUser);
      }
      return response;
    }

  });
});
