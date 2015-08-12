define([
  'modules/rentalRequest/views/formView'
], function(FormView){

  return FormView.extend({

    getStatus: function() {
      if (this._isMissingAnyRequiredFields()) {
        return this.POSSIBLE_STATES.WARNING;
      } else {
        return this.POSSIBLE_STATES.OK;
      }

    },

    _isMissingAnyRequiredFields: function() {
      var requiredNames = [
        'firstName',
        'lastName',
        'address1',
        'city',
        'state',
        'zip'
      ];

      var selector = requiredNames.map(function(name){
        return '[name='+ name +']';
      }).join(', ');

      return this.$(selector).filter(function(){
        return $(this).val() === '';
      }).length > 0;
    }

  });

});
