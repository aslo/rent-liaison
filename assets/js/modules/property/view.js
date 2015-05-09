define([
  'backbone',
  'tpl',
  'views/modal'
], function(Backbone, Tpl, Modal){
  return Backbone.View.extend({

    propertyFormTemplate: new Tpl('views/modules/propertyowners/_property_form'),

    events: {
      'click .js-create': 'create'
    },

    create: function(e) {
      e.preventDefault();

      var form = this.propertyFormTemplate.render();

      var m  = new Modal({
        title: 'New Property Profile',
        body: form
      })
      m.render();
    }
  })
})
