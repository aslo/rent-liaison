define([
  'backbone',
  'nouislider'
], function(Backbone, $slider){

  return Backbone.View.extend({
    initialize: function(options) {
      var modelRange = [this.model.get('min'), this.model.get('max')];

      // accommodate for dates
      for (var i in modelRange) {
        if (_.isDate(modelRange[i])) {
          modelRange[i] = +modelRange[i].getTime();
        }
      }

      $slider.create(this.el, _.extend({
        start: modelRange,
        connect: true,
        animate: false,
        range: {
          'min': modelRange[0],
          'max': modelRange[1]
        }
      }, options));

      this.rangeSlider = this.el.noUiSlider;
      this.listenTo(this.rangeSlider, 'slide', _.bind(this.onSliderChange, this));
    },

    onSliderChange: function() {
      // keep the model in sync with the range slider
      var range = this.rangeSlider.get();
      this.model.setRange(range[0], range[1]);
    }
  });

});
