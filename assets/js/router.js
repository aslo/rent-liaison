define([
  'backbone',
  'views/nav',
  'modules/home/view',
  'modules/rentalRequest/propertyOwnerCollectionView',
  'modules/rentalRequest/view',
  'modules/rentalRequest/model',
  'modules/rentalRequest/collection',
  'modules/property/view'
], function(Backbone, NavView, HomeView, RentalRequestCollectionView, RentalRequestView, RentalRequestModel, RentalRequestCollection, PropertiesView){

  return Backbone.Router.extend({

    routes: {
      ''                     : 'home',
      'rentalrequest'        : 'rentalrequestIndex',
      'rentalrequest/:uri'   : 'rentalrequest',
      'properties'           : 'properties'
    },

    home: function(){
      this._initNav();
      new HomeView({ el: Backbone.$('#js-home') });
    },

    rentalrequestIndex: function() {
      new RentalRequestCollectionView({
        el: Backbone.$('#js-rental-request-collection'),
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
      new PropertiesView({
        el: Backbone.$('#js-properties')
      });
    },

    _initNav: function(){
      new NavView({ el: Backbone.$('#js-nav') });
    }
  });
});
