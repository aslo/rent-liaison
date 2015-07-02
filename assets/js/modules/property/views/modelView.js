define([
  'backbone',
  'tpl',
  'underscore'
], function(Backbone, Tpl, _){
  return Backbone.View.extend({

    template: new Tpl('views/modules/propertyowners/property'),

    initialize: function() {
      this.listenTo(this.model, 'sync', _.bind(this.render, this))
    },

    render: function() {
      this.$el.html(this.template.render({
        property: this.model.toJSON()
      }))
      return this;
    }

  })
})
