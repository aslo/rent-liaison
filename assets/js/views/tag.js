define(['backbone'], function(Backbone){
  return Backbone.View.extend({
    events: {
       'click input[type=checkbox]':'toggleActive'
    },

    toggleActive: function(e) {
      this.$el.toggleClass('active');
    }

  });
});
