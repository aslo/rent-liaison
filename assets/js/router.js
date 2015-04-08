define([
  'backbone',
  'slick',
  'jquery'
], function(Backbone, slick, $){

  return Backbone.Router.extend({

    routes: {
      '': 'home'
    },

    home: function(){
      $('*[data-slick]').slick({
        prevArrow: $('.js-prev'),
        nextArrow: $('.js-next')
      });
    }
  });
});
