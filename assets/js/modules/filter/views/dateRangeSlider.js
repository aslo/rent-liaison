define([
  'modules/filter/views/rangeSlider',
  'moment'
], function(RangeSliderView, moment){

  return RangeSliderView.extend({

    displayRange: function(val) {
      return moment(new Date().setTime(+val)).format('MMM D, YYYY');
    }

  });

});
