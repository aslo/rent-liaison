define([
  'backbone',
  'slick',

  // subviews
  'modules/home/rentalRequestView'

], function(Backbone, slick, RentalRequestView){

  return Backbone.View.extend({

    initialize: function(){
      this.$carouselEl = $('*[data-slick]');

      // init the plugin
      this.$carouselEl.slick({
        prevArrow: $('.js-prev'),
        nextArrow: $('.js-next')
      });

      // init subviews
      this.rentalRequestView = new RentalRequestView({ el: this.$('#js-rent-request') });

      // wire up listeners
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
