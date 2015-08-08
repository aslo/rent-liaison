define([
  'backbone'
], function(Backbone){

  // This view is responsible for managing the content of each tab.
  return Backbone.View.extend({
    initialize: function(options){
      var self = this;

      if (!options.tabViews) {
        console.warn('warning: tabs view should be initialized with a tabViews map');
        options.tabViews = {};
      }

      // wire up listeners on the tab view status changes
      _.each(options.tabViews, function(view, selector){
        self.listenTo(view, 'change:status', _.bind(self.updateTabStatus, self, selector));

        // set the initial statuses of each subview
        self.updateTabStatus(selector, view.getStatus());
      });
    },

    updateTabStatus: function(tabSelector, status) {
      var $tab = this._getTabForSelector(tabSelector);
      var $tabStatusLabel = $tab.find('.js-status-label');

      var statusIcons = {
        'ok':      '<i class="fa fa-check"></i>',
        'warning': '<i class="fa fa-exclamation-triangle"></i>'
      };

      if (statusIcons[status]) {
        $tabStatusLabel.html(statusIcons[status]);
      } else {
        console.warn('no tab state to match ', status);
      }
    },

    _getTabForSelector: function(selector) {
      console.log(this.$('[href='+selector+']'));
      return this.$('[href='+selector+']');
    }

  });

});
