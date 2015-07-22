define([
  'backbone'
], function(Backbone){

  /**
  * Filters a value (or set of values) being contained in an array
  **/
  return Backbone.Model.extend({

    defaults: {
      values: []
    },

    setValues: function(values) {
      this.set('values', values);
    },

    getFilter: function() {
      var filter = {};
      if (this.get('values').length > 0) {
        filter[this.get('name')] = this.get('values');
      }
      return filter;
    }

  });

});
