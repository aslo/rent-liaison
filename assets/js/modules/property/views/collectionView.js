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

    initialize: function(options){
      this.formModal = new FormModal({
        amenities: options.amenities,
        destinations: options.destinations,
        locations: options.locations
      })

      this.uploadFormModal = new UploadForm()
    },

    showCreateForm: function(e) {
      e.preventDefault();
      this.formModal.setModel(new Property())
      this.formModal.render();
    },

    showEditForm: function(e) {
      e.preventDefault();

      var model = this._getModelForEl(e.target)
      this.formModal.setModel(model)
      this.formModal.render();
    },

    showUploadForm: function(e) {
      e.preventDefault();

      var model = this._getModelForEl(e.target)
      this.uploadFormModal.setModel(model)
      this.uploadFormModal.render();
    },

    _getModelForEl: function(el) {
      var id = $(el).parents('[data-property-id]').data('propertyId')
      return this.collection.get(id);
    }

  })
})
