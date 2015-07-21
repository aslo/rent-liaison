define([
  'backbone',
  'underscore',
  'modules/filter/models/rangeFilter',
  'views/slider',
  'accounting'
], function(Backbone, _, RangeFilterModel, SliderView, accounting){
  return Backbone.View.extend({

    initialize: function(options) {
      // init slider subview
      new SliderView({
        el: this.$('.js-slider'),
        model: this.model
      });

      // keep display elements in sync with the model
      this.listenTo(this.model, 'change:min', _.bind(this.updateMin, this));
      this.listenTo(this.model, 'change:max', _.bind(this.updateMax, this));

      // set the initial dislay vals
      this.updateMin(this.model); this.updateMax(this.model);
    },

    displayRange: function(val) {
      return accounting.formatMoney(val);
    },

    updateMin: function(model) {
      this.$('.js-filter-min').html(this.displayRange(model.get('min')));
    },

    updateMax: function(model) {
      this.$('.js-filter-max').html(this.displayRange(model.get('max')));
    }

  });
});
