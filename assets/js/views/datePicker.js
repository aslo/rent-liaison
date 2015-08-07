define([
  'backbone',
  'pikaday',
  'underscore'
], function(Backbone, Pikaday, _){

  // Backbone view for start and end date pickers.

  return Backbone.View.extend({

    dateFormat: 'dddd, MMMM Do YYYY',

    initialize: function(options){

      var startDateEl = options.startDateEl;
      var endDateEl = options.endDateEl;

      this.startDate = new Pikaday({
        field: startDateEl,
        minDate: new Date(),
        format: this.dateFormat,
        onSelect: _.bind(this.onSelectStartDate, this)
      });

      this.endDate = new Pikaday({
        field: endDateEl,
        minDate: new Date(),
        format: this.dateFormat,
        onSelect: _.bind(this.onSelectEndDate, this)
      });

    },

    onSelectStartDate: function(date) {
      this.endDate.setMinDate(date);
      this.endDate.setStartRange(date);
    },

    onSelectEndDate: function(date) {
      this.startDate.setEndRange(date);
    },

    getStartDate: function() {
      return this.startDate.getDate();
    },

    getEndDate: function() {
      return this.endDate.getDate();
    }

  });

});
