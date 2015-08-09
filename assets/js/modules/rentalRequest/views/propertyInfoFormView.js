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
      if (this._destinationsAreEmpty()) {
        return this.POSSIBLE_STATES.WARNING;
      } else {
        return this.POSSIBLE_STATES.OK;
      }
    },

    _destinationsAreEmpty: function() {
      return this.$('input[name="destinations[]"][type=checkbox]:checked').length < 1;
    }

  });

});
