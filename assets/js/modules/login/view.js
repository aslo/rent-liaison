define([
  'backbone',
  'tab'
], function(Backbone, tab){

  return Backbone.View.extend({
    initialize: function(){
      this.$('[data-toggle=tab]').tab();
    }
  });

});
