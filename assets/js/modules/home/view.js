define([
  'backbone',
  'slick'
], function(Backbone, slick){

  return Backbone.View.extend({
    initialize: function(){
      this.$carouselEl = $('*[data-slick]');

      // init the plugin
      this.$carouselEl.slick({
        prevArrow: $('.js-prev'),
        nextArrow: $('.js-next')
      });

      this.$carouselEl.on('beforeChange', this.onCarouselChange);
      Backbone.PubSub.on('nav_navbar', this.onNavEvent, this);
    },
    onCarouselChange: function(e, slick, currentSlide, nextSlide){
      Backbone.PubSub.trigger('nav_carousel', nextSlide, this);
    },
    onNavEvent: function(index){
      this.$carouselEl.slick('slickGoTo', index);
    }
  });
});
