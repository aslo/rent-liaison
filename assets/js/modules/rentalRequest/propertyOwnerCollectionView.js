define([
  'backbone',
  'modules/rentalRequest/propertyOwnerModelView',
  'modules/rentalRequest/views/filtersView'
], function(Backbone, ModelView, FiltersView){

  return Backbone.View.extend({

    events: {
      'change .js-filter': 'onUpdateFilters'
    },

    initialize: function() {
      var self = this;

      // init subview for filters
      this.filtersView = new FiltersView({
        el: this.$('.js-rental-request-filters'),
        collection: self.collection
      });

      // create model subview for pre-rendered content
      this.modelViews = [];
      this.$('.js-rent-request-model').each(function(){
        self.modelViews.push(new ModelView({
          el: this,
          model: self.collection.get($(this).data('rentRequestId'))
        }));
      });
    },

    renderModels: function(models) {
      // destroy existing model views
      while (this.modelViews.length > 0) {
        this.modelViews.shift().remove();
      }

      var self = this;
      models.forEach(function(model){
        var view = new ModelView({ model: model });
        self.modelViews.push(view);

        self.getCollectionEl().append(view.render().el);
      });

    },

    getCollectionEl: function() {
      return this.$('#js-rent-request-collection');
    },

    onUpdateFilters: function(e) {
      var filters = this._getCurrentFilters();
      this.collection.applyFilters(filters);
    },

    _getCurrentFilters: function() {
      var filters = [];
      this.$('.js-filter').each(function(){
        var filter = {};
        var $el = $(this);

        var op = $el.data('filterOperator');
        var name = $el.attr('name');
        var value = $el.val();

        if (op && name && value) {
          filters.push({
            name: name,
            operator: op,
            value: value
          });
        }
      });
      return filters;
    }

  });
});
