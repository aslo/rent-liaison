define([
  'underscore',
  'modules/rentalRequest/views/formView',
  'views/datePicker'
], function(_, FormView, DatePicker){

  return FormView.extend({

    initialize: function(){
      this.datePicker = new DatePicker({
        startDateEl: this.$('.js-start-date')[0],
        endDateEl: this.$('.js-end-date')[0]
      });
    },

    // overriding parent class function
    getStatus: function() {
      if (this._isMissingAnyRequiredFields()) {
        return this.POSSIBLE_STATES.WARNING;
      } else {
        return this.POSSIBLE_STATES.OK;
      }

    },

    // overriding parent class function
    serializeFormData: function() {
      var attrs = FormView.prototype.serializeFormData.apply(this, arguments);

      attrs.startDate = this.datePicker.getStartDate();
      attrs.endDate = this.datePicker.getEndDate();
      return attrs;
    },

    _isMissingAnyRequiredFields: function() {
      var $inputs = this.$('input[type!=checkbox]').add(this.$('textarea'));
      return _.any($inputs, function(input){
        return _.isEmpty(this.$(input).val());
      });
    }

  });

});
