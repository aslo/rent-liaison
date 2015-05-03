define([
  'backbone',
  'slick',

  // subviews
  'modules/home/rentalRequestView',
  'modules/home/landingView',
  'modules/home/aboutView'

], function(Backbone, slick, RentalRequestView, LandingView, AboutView){

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
      this.landingView = new LandingView({ el: this.$('#js-landing') })
      this.aboutView = new AboutView({ el: this.$('#js-about') })

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
