define([
  'backbone',
  'underscore',
  'modules/filter/views/rangeSlider',
  'modules/filter/views/dateRangeSlider',
  'modules/filter/models/rangeFilter',
  'modules/filter/models/containsFilter',
  'modules/filter/collections/filters',
  'modules/rentalRequest/views/rentRequestLocationFilter'
], function(Backbone, _, RangeSliderView, DateRangeSliderView, RangeFilter, ContainsFilter, FilterCollection, RentRequestLocationFilterView){

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

      // locations filter
      var locationFilter = new ContainsFilter({ name: 'destinations' });
      this.locationFilterView = new RentRequestLocationFilterView({
        el: this.$('.js-location-filter'),
        model: locationFilter,
        myProperties: new Backbone.Collection(window.myProperties)
      });

      this.filtersCollection = new FilterCollection([ budgetFilter, dateFilter, locationFilter ]);
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
