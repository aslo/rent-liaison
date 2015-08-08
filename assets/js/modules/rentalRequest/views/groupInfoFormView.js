define([
  'modules/rentalRequest/views/formView',
  'views/datePicker'
], function(FormView, DatePicker){

  return FormView.extend({

    initialize: function(){
      this.datePicker = new DatePicker({
        startDateEl: this.$('.js-start-date')[0],
        endDateEl: this.$('.js-end-date')[0]
      });
    },

    getStatus: function() {
      return this.POSSIBLE_STATES.OK;
    },

    serializeFormData: function() {
      var attrs = FormView.prototype.serializeFormData.apply(this, arguments);

      attrs.startDate = this.datePicker.getStartDate();
      attrs.endDate = this.datePicker.getEndDate();
      return attrs;
    }

  });

});
