define([
  'backbone',
  'pikaday',
  'tab',
  'modules/rentalRequest/views/completionProgressView',

  'views/tag',
  'views/datePicker'
], function(Backbone, Pikaday, tab, CompletionProgressView, Tag, DatePicker){

  return Backbone.View.extend({

    events: {
      'submit .js-rental-request-form': 'save'
    },

    initialize: function() {
      this.model.set('id', this.$el.data('rentalRequestId'));

      // subviews
      this.progressSubview = new CompletionProgressView({
        el: this.$('#js-rent-request-progress'),
        model: this.model
      });
      this.$('.js-tag').each(function(){
        new Tag({ el: this });
      });

      // init plugins
      this.datePicker = new DatePicker({
        startDateEl: this.$('.js-start-date')[0],
        endDateEl: this.$('.js-end-date')[0]
      });
      this.$('[data-toggle=tab]').tab();
    },

    save: function (e) {
      this._updateModelFromForm(e, this.model);
    },

    _updateModelFromForm: function(e, model) {
      e.preventDefault();
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

      var attrs = this.$(e.target).serializeJSON();
      attrs.startDate = this.datePicker.getStartDate();
      attrs.endDate = this.datePicker.getEndDate();

      attrs = clean(attrs);
      return model.save(attrs, {
        patch: true
        // success: console.log,
        // error: console.error
      });
    }

  });
});
