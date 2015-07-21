define(['backbone'], function(Backbone){

  /**
  * Filters based on a numerical value being within a given range
  **/
  return Backbone.Model.extend({

    initialize: function(attrs, options) {
      if (options.targetCollection) {
        var minModel = options.targetCollection.min(_.bind(this.getMinNameValue, this));
        var maxModel = options.targetCollection.max(_.bind(this.getMaxNameValue, this));
        this.setRange(this.getMinNameValue(minModel), this.getMaxNameValue(maxModel));
      }
    },

    setRange: function(min, max) {
      if (min) { this.set('min', min); }
      if (max) { this.set('max', max); }
    },

    getFilter: function() {
      var params = {};
      params[this.get('name')] = {};

      if (this.has('min')) {
        params[this.get('minName')]['>='] = this.get('min');
      }
      if (this.has('max')) {
        params[this.get('maxName')]['<='] = this.get('max');
      }

      return params;
    },

    getMinNameValue: function(model) {
      return model.get(this.get('minName'));
    },

    getMaxNameValue: function(model) {
      return model.get(this.get('maxName'));
    }

  });
});
