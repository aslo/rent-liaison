define([
  'backbone',
  'flip'
], function(Backbone, flip){
  return Backbone.View.extend({

    initialize: function(){
      this.$('.js-info-card').flip({
        trigger: 'hover'
      });
    }

  });
});
