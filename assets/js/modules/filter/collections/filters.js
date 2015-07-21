define([
  'backbone',
  'jquery'
], function(Backbone, $){

  /**
  * A collection of filters. Expects that all models implement a `filter` function
  **/
  return Backbone.Collection.extend({

    initialize: function(options) {
      this.targetCollection = options.targetCollection;

      var self = this;
      this.each(function(filter){
        // bubble up any change events from the individual models
        self.listenTo(filter, 'change', self.trigger);
      });
    },

    getQueryParams: function() {
      var filterExists = function(filter) {
        return filter && Object.keys(filter).length;
      };

      return this.reduce(function(accum, model){
        if ( filterExists(model.getFilter()) ) {
          accum += '&' + $.param(model.getFilter());
        }
        return accum;
      }, '');
    }

  });
});
