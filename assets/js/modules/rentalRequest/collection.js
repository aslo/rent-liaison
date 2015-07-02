define([
  'backbone',
  'underscore'
], function(Backbone, _){

  return Backbone.Collection.extend({

    url: function(){ return '/rentalrequest' },

    applyFilters: function(filters) {
      function compare(val, filterVal, operator) {
        switch(operator) {
          case '>=':
            return val >= filterVal;
          case '>':
            return val > filterVal;
          case '<=':
            return val <= filterVal;
          case '>':
            return val < filterVal;
          case '=':
            return val == filterVal;
        }
      }

      var filteredModels = this.models;

      for (var i in filters) {
        var filter = filters[i];
        filteredModels = _.filter(filteredModels, function(model){
          return compare(model.get(filter.name), filter.value, filter.operator)
        })
      }

      this.trigger('filter', filteredModels)
      return filteredModels;
    }

  });
});
