define([
  'backbone',
  'modules/rentalRequest/contactDialogView',
  'modules/rentalRequest/detailView'
], function(Backbone, ContactDialog, RentRequestDetailView){

  return Backbone.View.extend({

    events: {
      'click .js-show-rent-request-detail': 'showRentRequestDetail'
    },

    initialize: function(options) {
      this.filteredCollection = new Backbone.Collection()
      this.contactDialog = new ContactDialog({
        collection: this.filteredCollection
      })

      this.rentReqestDetailView = new RentRequestDetailView()

    },

    showRentRequestDetail: function(e) {
      var rentRequestId = $(e.target).parent().data('rentRequestId');

      this.rentReqestDetailView.model = this.collection.get(rentRequestId)
      this.rentReqestDetailView.render()
    }

  })
})
