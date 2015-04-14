define([
  'backbone',
  'views/nav',
  'modules/home/view'
], function(Backbone, NavView, HomeView){

  return Backbone.Router.extend({

    routes: {
      '': 'home'
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

    _initNav: function(){
      if (! this._cache.nav) {
        this._cache.nav = new NavView({ el: Backbone.$('#js-nav') });
      }
    }
  });
});
