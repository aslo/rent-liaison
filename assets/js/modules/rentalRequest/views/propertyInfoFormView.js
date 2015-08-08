define([
  'modules/rentalRequest/views/formView',
  'views/tag'
], function(FormView, Tag){

  return FormView.extend({

    initialize: function(){
      this.$('.js-tag').each(function(){
        new Tag({ el: this });
      });
    },

    getStatus: function() {
      return this.POSSIBLE_STATES.OK;
    }

  });

});
