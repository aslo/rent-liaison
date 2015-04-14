define(['backbone'], function(Backbone){
  return Backbone.View.extend({
    initialize: function(){
      Backbone.PubSub.on('nav_carousel', this.onNavigateEvent, this);
    },
    events: {
      'click .js-nav-link': 'onClickLink'
    },
    onClickLink: function(e){
      e.preventDefault();

      var index = $('.js-nav-link').index(e.target);
      Backbone.PubSub.trigger('nav_navbar', index);

      this.$('.js-nav-link').removeClass('active');
      this.$(e.target).addClass('active');
    },
    onNavigateEvent: function(index){
      this.$('.js-nav-link').removeClass('active');
      this.$('.js-nav-link[data-slide-index='+index+']').addClass('active');
    }
  });
});
