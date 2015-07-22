define([
  'modules/filter/views/rangeSlider',
  'moment'
], function(RangeSliderView, moment){

  return RangeSliderView.extend({

    initialize: function() {
      var self = this;
      ['min', 'max'].forEach(function(field){
          if (self.model.has(field) && _.isDate(self.model.get(field))) {
            self.model.set(field, self.model.get(field).getTime(), { silent: true });
          }
      });

      RangeSliderView.prototype.initialize.call(this, {
        step: 24 * 60 * 60 * 1000 // use a step size of 1 day (in ms)
      });
    },

    displayRange: function(val) {
      return moment(new Date().setTime(+val)).format('MMM D, YYYY');
    }

  });

});
