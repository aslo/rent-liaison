define([
  'backbone',
  'flip'
], function(Backbone, flip){
  return Backbone.View.extend({

    events: {
      'mouseover .js-info-card': 'flipOver',
      'click .js-info-card': 'flipBack'
    },

    initialize: function(){
      this.$('.js-info-card').flip({
        trigger: 'manual'
      });
    },

    flipOver: function(e) {
      this.$(e.target).flip(true)
    },

    flipBack: function(e) {
      this.$(e.target).parents('.js-info-card').flip(false)
//      this.$(e.target).flip(false)
    }

  });
});
