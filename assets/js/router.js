define([
  'backbone',
  'underscore',
  'slick',
  'jquery',

  'views/nav',

  'modules/home/aboutView',
  'modules/home/rentalRequestView',

  'modules/login/view',

  'modules/rentalRequest/propertyOwnerCollectionView',
  'modules/rentalRequest/view',
  'modules/rentalRequest/model',
  'modules/rentalRequest/collection',

  'modules/property/collection',
  'modules/property/views/collectionView',

  'modules/property/views/listingView'

], function(Backbone, _, slick, $, NavView, AboutView, RentRequestView, LoginView, RentalRequestCollectionView, RentalRequestView, RentalRequestModel, RentalRequestCollection, PropertyCollection, PropertiesView, PropertyListingView){

  return Backbone.Router.extend({

    routes: {
      'login'                : 'login',
      'rentalrequest'        : 'rentalrequestIndex',
      'rentalrequest/:uri'   : 'rentalRequest',
      'properties'           : 'properties',
      'property/:slug'       : 'propertyListing'
    },

    // Options map for DRYing up the routing for the static site.
    // TODO this should really be pulled into a separate router/module altogether.
    carouselViews: {
      '': {
        index: 0
      },
      'rentrequest': {
        view: RentRequestView,
        index: 1,
        el: '#js-rent-request'
      },
      'howitworks': {
        index: 2
      },
      'about': {
        view: AboutView,
        index: 3,
        el: '#js-about'
      }
    },

    initialize: function(){
      this._cache = {};

      //
      var self = this;
      Object.keys(this.carouselViews).forEach(function(key){
        self.route(key, key, function(){
          var options = self.carouselViews[key];

          // initialize view(s) idempotently
          self._initStaticSite();
          if (options.view) {
            self._new(key, _.bind(options.view, options.view.prototype, { el: $(options.el) }));
          }

          // navigate there
          self._cache.$carouselEl.slick('slickGoTo', options.index);
        });
      });
    },

    login: function(){
      new LoginView({ el: Backbone.$('#js-login') });
    },

    rentalrequestIndex: function() {
      new RentalRequestCollectionView({
        el: Backbone.$('#js-rental-requests'),
        collection: new RentalRequestCollection(window.rentalRequests)
      });
    },

    rentalRequest: function () {
      new RentalRequestView({
        el: Backbone.$('#js-rental-request'),
        model: new RentalRequestModel(window.rentalRequest)
      });
    },

    properties: function() {
      // TODO cache/make sure this doesnt cause a mem leak
      this.amenitiesCollection = new Backbone.Collection(window.amenities);
      this.locationsCollection = new Backbone.Collection(window.locations);
      this.destinationsCollection = new Backbone.Collection(window.destinations);

      new PropertiesView({
        el: Backbone.$('#js-properties'),
        collection: new PropertyCollection(window.properties),

        amenities: this.amenitiesCollection,
        locations: this.locationsCollection,
        destinations: this.destinationsCollection
      });
    },

    propertyListing: function() {
      new PropertyListingView({
        el: $('#js-property-listing'),
        model: new Backbone.Model(window.property)
      });
    },

    // Private

    _initStaticSite: function(){
      if (! this._cache.$carouselEl) {
        this._cache.$carouselEl = $('*[data-slick]');
        // init the plugin
        this._cache.$carouselEl.slick({
          accessibility: false,
          arrows: false
        });
      }

      this._new('navView', _.bind(NavView, NavView.prototype, { el: Backbone.$('#js-nav') }));
    },

    // If an object with the matching key exists in the cache, return it.
    // Otherwise, call the constructor fn to create new one and cache for later.
    _new: function(key, constructor){
      if (!this._cache[key]) {
        this._cache[key] = constructor();
      }
      return this._cache[key];
    }

  });
});
