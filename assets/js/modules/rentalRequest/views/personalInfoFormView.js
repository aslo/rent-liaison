define([
  'modules/rentalRequest/views/formView'
], function(FormView){

  return FormView.extend({

    getStatus: function() {
      return this.POSSIBLE_STATES.OK;
    }

  });

});
