define([
  'backbone',
  'lightslider'
], function(Backbone, $lightslider){
  return Backbone.View.extend({

    initialize: function(){
      $(".js-image-carousel").lightSlider({
        gallery: true,
        item: 1,
        autoWidth: true,
        loop: true,
        slideMargin: 0,
        thumbItem: 10,
        enableDrag: false,
      });
    }

  });
});
