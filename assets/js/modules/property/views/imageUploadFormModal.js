define([
  'tpl',
  'views/modal',
  'fileUpload'
], function(Tpl, Modal, $fileUpload){

  return Modal.extend({

    formTpl: new Tpl('views/modules/propertyowners/_property_image_form'),

    render: function() {
      this.title = 'Upload Photos'
      this.body = this.formTpl.render({
        property: this.model.toJSON()
      })

      Modal.prototype.render.apply(this)

      this.$('input[type=file]').fileupload({
        // see https://github.com/blueimp/jQuery-File-Upload/wiki/Options
        // for all possible options
        // TODO: dropzone for drag and drop uploads
        success: this.onSuccess,
        error: this.onFail
      })

      return this;
    },

    setModel: function(model) {
      this.model = model
    },

    onSuccess: function(){
      console.log('yayaya', arguments);
    },

    onFail: function(){
      console.error('nonono', arguments);
    }

  })
})
