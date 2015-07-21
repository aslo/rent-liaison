define([
  'backbone',
  'underscore',
  'modules/filter/views/rangeSlider',
  'modules/filter/views/dateRangeSlider',
  'modules/filter/models/rangeFilter',
  'modules/filter/collections/filters'
], function(Backbone, _, RangeSliderView, DateRangeSliderView, RangeFilter, FilterCollection){

  /**
  * A view that contains all filters for a collection of Rent Requests
  **/
  return Backbone.View.extend({

    initialize: function() {
      var self = this;

      // budget filter
      var budgetFilter = new RangeFilter({
        minName: 'budget',
        maxName: 'budget'
      }, {
        targetCollection: this.collection
      });
      this.budgetFilterView = new RangeSliderView({
        el: this.$('.js-budget-slider'),
        model: budgetFilter
      });

      // date filter
      var dateFilter = new RangeFilter({
        minName: 'startDate',
        maxName: 'endDate'
      }, {
        targetCollection: this.collection
      });
      this.dateFilterView = new DateRangeSliderView({
        el: this.$('.js-date-slider'),
        model: dateFilter
      });

      // location filter
      // TODO model
      // TODO view

      this.filtersCollection = new FilterCollection([ budgetFilter, dateFilter ]);
      this.listenTo(this.filtersCollection, 'change', _.throttle(this.onFilterUpdate, 500));
    },

    onFilterUpdate: function() {
      var fetchUrl = this.collection.url() + '?' + this.filtersCollection.getQueryParams();

      // when filters are updated, trigger a re-fetch of the main collection
      return this.collection.fetch({
        reset: true,
        url: fetchUrl
      });
    }

  });

});
