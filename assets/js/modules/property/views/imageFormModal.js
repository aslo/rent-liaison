define([
  'views/modal',
  'modules/property/views/imageForm'
], function(Modal, ImageFormView){

  return Modal.extend({

    events: {
      'click .js-delete-image': 'onClickDelete'
    },

    initialize: function() {
      this.formView = new ImageFormView()
    },

    render: function() {
      this.title = 'Manage Property Photos'
      Modal.prototype.render.apply(this)

      // render subviews
      this.formView.setElement('.js-modal-body').render()

      return this;
    },

    setModel: function(model) {
      this.formView.setModel(model)
    }

  })
})
