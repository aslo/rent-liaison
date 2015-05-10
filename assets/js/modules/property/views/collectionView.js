define([
  'backbone',
  'modules/property/views/formModal',
  'modules/property/model'

], function(Backbone, FormModal, Property){
  return Backbone.View.extend({

    events: {
      'click .js-create': 'showCreateForm',
      'click .js-edit': 'showEditForm'
    },

    initialize: function(){
      this.formModal = new FormModal()
    },

    showCreateForm: function(e) {
      this.formModal.setModel(new Property())
      this.formModal.render();
    },

    showEditForm: function(e) {
      var model = this.collection.get($(e.target).data('propertyId'))
      this.formModal.setModel(model)
      this.formModal.render();
    }

  })
})
