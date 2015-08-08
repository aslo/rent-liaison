define([
  'backbone',
], function(Backbone){

  return Backbone.View.extend({

    POSSIBLE_STATES: {
      OK: 'ok',
      WARNING: 'warning'
    },

    events: {
      'submit .js-rental-request-form': 'save'
    },

    save: function (e) {
      e.preventDefault();
      var self = this;

      var data = this.serializeFormData($(e.target));
      return this.model.save(data, {
        patch: true,
        success: function(){
          self.triggerStatusUpdate();
        }
      });
    },

    triggerStatusUpdate: function() {
      this.trigger('change:status', this.getStatus());
    },

    // This function should be overridden by child classes,
    // to return the current state of the view. Should return a
    // value from the POSSIBLE_STATES object
    getStatus: function() {
      console.warn('abstract function should be overridden!');
    },

    serializeFormData: function($form) {
      clean = function (obj) {
        for (var key in obj) {
          if (typeof obj[key] === 'object') {
            obj[key] = clean(obj[key]);
          } else if (obj[key] === "") {
            obj[key] = null;
          }
        }
        return obj;
      };

      var attrs = $form.serializeJSON();
      return clean(attrs);
    }
  });

});
