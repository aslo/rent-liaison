define([
  'backbone',
  'views/nav',
  'modules/home/view',
  'modules/rentalRequest/view',
  'modules/rentalRequest/model'
], function(Backbone, NavView, HomeView, RentalRequestView, RentalRequestModel){

  return Backbone.Router.extend({

    routes: {
      ''                     : 'home',
      'rentalRequest/:uri'   : 'rentalRequest'
    },

    initialize: function(){
      this._cache = {};
    },

    home: function(){
      this._initNav();
      if (!this._cache.home) {
        this._cache.home = new HomeView({ el: Backbone.$('#js-home') });
      }
    },

    rentalRequest: function () {
      if (!this._cache.rentalRequestView) {
        this._cache.rentalRequestView = new RentalRequestView({
          el: Backbone.$('#js-rental-request'),
          model: new RentalRequestModel(window.rentalRequest)
        });
      }
    },

    _initNav: function(){
      if (! this._cache.nav) {
        this._cache.nav = new NavView({ el: Backbone.$('#js-nav') });
      }
    }
  });
});
