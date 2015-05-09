define([
  'backbone',
  'modules/property/formModal',
  'modules/property/model'

], function(Backbone, FormModal, Property){
  return Backbone.View.extend({

    initialize: function(){
      this.createView = new FormModal({
        model: new Property()
      })
    },

    events: {
      'click .js-create': 'showForm'
    },

    showForm: function(e) {
      e.preventDefault();
      this.createView.render();
    }
  })
})
