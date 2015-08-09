define([
  'backbone',
  'views/nav',

  'modules/login/view',

  'modules/home/view',

  'modules/rentalRequest/propertyOwnerCollectionView',
  'modules/rentalRequest/view',
  'modules/rentalRequest/model',
  'modules/rentalRequest/collection',

  'modules/property/collection',
  'modules/property/views/collectionView',

  'modules/property/views/listingView'

], function(Backbone, NavView, LoginView, HomeView, RentalRequestCollectionView, RentalRequestView, RentalRequestModel, RentalRequestCollection, PropertyCollection, PropertiesView, PropertyListingView){

  return Backbone.Router.extend({

    routes: {
      ''                     : 'home',
      'login'                : 'login',
      'rentalrequest'        : 'rentalrequestIndex',
      'rentalrequest/:uri'   : 'rentalRequest',
      'properties'           : 'properties',
      'property/:slug'       : 'propertyListing'
    },

    home: function(){
      this._initNav();
      new HomeView({ el: Backbone.$('#js-home') });
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

    _initNav: function(){
      new NavView({ el: Backbone.$('#js-nav') });
    }
  });
});
