define(['backbone'], function(Backbone){

  return Backbone.View.extend({

    initialize: function(options) {
      if (options && options.myProperties) {
        this.myLocations = options.myProperties.map(function(p){
          return p.get('destination');
        });
      }
    },

    events: {
      'change select[name=filter_destination]': 'onChangeSelection'
    },

    onChangeSelection: function(e) {
      if ($(e.target).val() === 'any') {
        this.model.setValues(this.myLocations);
      } else {
        this.model.setValues([]);
      }
    }

  });

});
