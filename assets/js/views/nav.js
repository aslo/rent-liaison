define(['backbone'], function(Backbone){
  return Backbone.View.extend({
    events: {
      'click .js-nav-link': 'onClickLink'
    },
    onClickLink: function(e){
      e.preventDefault();
      this.$('.js-nav-link').removeClass('active');
      this.$(e.target).addClass('active');
    }

    // TODO also listen for a global event that will be fired when a route is matched.
    // update relevant links if any exist
  });
});
