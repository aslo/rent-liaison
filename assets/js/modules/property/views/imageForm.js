define([
  'backbone',
  'tpl',
  'modules/property/views/propertyImage'
], function(Backbone, Tpl, LoadingImage){

  return Backbone.View.extend({

    template: new Tpl('views/modules/propertyowners/_property_image_form'),
    loadingTpl: new Tpl('views/modules/propertyowners/_property_image_form__loading_image'),

    events: {
      'click .js-delete-image': 'onClickDelete'
    },

    render: function() {
      this.$el.html(this.template.render({
        property: this.model.toJSON()
      }))

      this._postRender()

      return this;
    },

    _postRender: function() {
      this.model.initFileUploader(this.$('input[type=file]'))
    },

    onClickDelete: function(e) {
      this.model.deleteImage(this.$(e.target).data('imageId'))
    },

    setModel: function(model) {
      // stop listening to events on the old model
      this.stopListening(this.model);

      // set the new model
      this.model = model

      var modelEvents = {
        'add_image'    : 'render',
        'remove_image' : 'render',
        'request'      : 'onRequest'
      }
      // begin listening to events on the new model
      for (eventName in modelEvents) {
        this.listenTo(model, eventName, this[modelEvents[eventName]])
      }
    },

    onRequest: function() {
      // show the loading view. this will be overwritten when
      // the loading is complete
      this.$el.append(this.loadingTpl.render())
    }

  })
})
