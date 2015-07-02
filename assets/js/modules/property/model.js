define([
  'backbone',
  'underscore',
  'fileUpload'
], function(Backbone, _, $fileUpload){

  return Backbone.Model.extend({
    urlRoot: '/property',

    initFileUploader: function($el) {
      var self = this;
      $el.fileupload({
        // see https://github.com/blueimp/jQuery-File-Upload/wiki/Options
        // for all possible options
        success: function(response) {
          self.trigger('sync')
          if (response && response.files && response.files.length) {
            self.addImages(response.files)
          }
        },
        error: function() {
          self.trigger('error')
        }
      })
      .bind('fileuploadadd', function (e, data) {
        // technically it might be more accurate to trigger a request event on a
        // 'fileuploadsend' event, but let's trigger on the 'fileuploadadd' event
        // to give the user some feedback sooner
        self.trigger('request')
      })
    },

    deleteImage: function(imageId) {
      this.trigger('request')

      var self = this;
      return $.ajax({
        url: this.url() + '/picture/' + imageId,
        type: 'DELETE'
      })
      .done(function(){
        _.remove(self.get('images'), { id: imageId })
        self.trigger('sync')
        self.trigger('remove_image', imageId)
      })
      .fail(function() {
        self.trigger('error')
      })
    },

    addImages: function(images) {
      for (var i in images) {
        this.get('images').push(images[i])
        this.trigger('add_image', images[i])
      }
    }
  })
})
