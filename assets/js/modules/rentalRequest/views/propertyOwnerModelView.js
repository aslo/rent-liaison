define([
  'backbone',
  'tpl',
  'modules/rentalRequest/detailView',
], function(Backbone, Tpl, RentRequestDetailView){

  return Backbone.View.extend({

    tagName: 'tr',

    attributes: {
      'class': 'clickable-tr'
    },

    template: new Tpl('views/modules/propertyowners/rentalrequests_collection_model'),

    events: {
      'click *' : 'showRentRequestDetail'
    },

    initialize: function() {
      this.detailView = new RentRequestDetailView({
        model: this.model
      })
    },

    render: function() {
      this.$el.html(this.template.render({
        rentalRequest: this.model.toJSON()
      }))
      return this;
    },

    showRentRequestDetail: function(e) {
      this.detailView.render()
    }
  })
})
