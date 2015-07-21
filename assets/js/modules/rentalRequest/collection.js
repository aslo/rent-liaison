define([
  'backbone',
  'underscore',
  'modules/rentalRequest/model'
], function(Backbone, _, RentRequest){

  return Backbone.Collection.extend({

    model: RentRequest,

    url: function(){
      return '/rentalrequest';
    }

  });
});
