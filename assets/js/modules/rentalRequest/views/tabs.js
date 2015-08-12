define([
  'backbone',
  'tooltip',
  'tab'
], function(Backbone, tooltip, tab){

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

      this.$('[data-toggle=tab]').tab();
    },

    updateTabStatus: function(tabSelector, status) {
      var $tab = this._getTabForSelector(tabSelector);
      var $tabStatusLabel = $tab.find('.js-status-label');

      var statusIcons = {
        'ok':      '<i class="fa fa-check" data-toggle="tooltip" data-placement="right" title="This section is completed"></i>',
        'warning': '<i class="fa fa-exclamation-triangle" data-toggle="tooltip" data-placement="right" title="Required fields are missing"></i>'
      };

      if (statusIcons[status]) {
        $tabStatusLabel.html(statusIcons[status]);
        this._initTooltips();
      } else {
        console.warn('no tab state to match ', status);
      }
    },

    _getTabForSelector: function(selector) {
      return this.$('[href='+selector+']');
    },

    _initTooltips: function() {
      this.$('[data-toggle=tooltip]').tooltip();
    }

  });

});
