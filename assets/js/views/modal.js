define([
  'backbone',
  'tpl',
  'modal'
], function(Backbone, Tpl, modal){

  return Backbone.View.extend({
    template: new Tpl('views/partials/modal'),

    initialize: function(options){
      if (!options) {
        options = {}
      }

      this.title = options.title;
      this.body = options.body;
      this.footer = options.footer;
    },

    render: function() {
      this.$el.html(this.template.render({
        title: this.title,
        body: this.body,
        footer: this.footer
      }))

      $(document.body).append(this.el)

      this.$('.modal').modal().on('hidden', function(){
        this.remove()
      });

      return this;
    }

  });
});
