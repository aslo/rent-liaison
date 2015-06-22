define([
  'backbone',
  'tpl',
  'underscore'
], function(Backbone, Tpl, _){

  return Backbone.View.extend({

    template: new Tpl('views/modules/rentalRequest/completion_progress'),

    initialize: function() {
      var render = _.bind(this.render, this);
      // this.model.on('sync', render);
      // this.model.get('user').on('sync', render);
    },

    render: function() {
      // console.log(this.model.getCompletionPercentage());
      this.$el.html(this.template.render({
        rentalRequest: this.model
      }));
    }

  })

})
