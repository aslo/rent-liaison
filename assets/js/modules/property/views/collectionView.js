define([
  'backbone',
  'modules/property/model',
  'modules/property/views/formModal',
  'modules/property/views/imageUploadFormModal'

], function(Backbone, Property, FormModal, UploadForm){

  return Backbone.View.extend({

    events: {
      'click .js-create': 'showCreateForm',
      'click .js-edit': 'showEditForm',
      'click .js-upload': 'showUploadForm'
    },

    initialize: function(){
      this.formModal = new FormModal()
      this.uploadFormModal = new UploadForm()
    },

    showCreateForm: function(e) {
      this.formModal.setModel(new Property())
      this.formModal.render();
    },

    showEditForm: function(e) {
      var model = this.collection.get($(e.target).data('propertyId'))

      this.formModal.setModel(model)
      this.formModal.render();
    },

    showUploadForm: function(e) {
      var model = this.collection.get($(e.target).data('propertyId'))

      this.uploadFormModal.setModel(model)
      this.uploadFormModal.render();
    }

  })
})
