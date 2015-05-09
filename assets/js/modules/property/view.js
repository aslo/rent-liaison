define([
  'backbone',
  'views/modal'
], function(Backbone, Modal){
  return Backbone.View.extend({
    events: {
      'click .js-create': 'create'
    },

    create: function(e) {
      e.preventDefault();

      var m  = new Modal({
        title: 'Create Property',
        body: ':)',
        footer: ''
      })
      m.render();
    }
  })
})
