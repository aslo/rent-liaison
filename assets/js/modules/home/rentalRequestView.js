define([
  'backbone',
  'pikaday',
  'serializeJSON',

  'views/tag',
  'views/datePicker',

  'modules/rentalRequest/model'

], function(Backbone, Pikaday, serializeJSON, Tag, DatePicker, RentalRequest){

  return Backbone.View.extend({

    events: {
      'change .js-no-dates': 'toggleNoDates',
      'submit .js-rent-request-form': 'submitForm'
    },

    initialize: function() {
      // init subviews
      this.$('.js-tag').each(function(){
        new Tag({ el: this });
      });

      this.datePicker = new DatePicker({
        startDateEl: this.$('.js-start-date')[0],
        endDateEl: this.$('.js-end-date')[0]
      });

      this.datesAreDisabled = false;
    },

    submitForm: function (e) {
      e.preventDefault();
      var self = this;

      // get all form attributes, then disable before saving
      var $formInputs = this.$(e.target).find('input, select');
      var formAttributes = this._getFormValues($formInputs);
      $formInputs.attr('disabled', 'disabled');

      new RentalRequest().save(formAttributes, {
        success: function(model, response, options){
          self.clear();

          var template = _.template(
            "<div class='row'>"
            + "<div class='offset-by-two columns eight columns'>"
            + "<p>Thanks for submitting a Rent Request.  An email has been sent to the address you provided."
            + "  Please click the link in the email to activate the request in our system.</p>"
            + "</div>"
            + "</div>");

          self.$el.html(template());
        },
        error: function(model, response, options){
          console.error(arguments);

          // revert the form back to normal state
          $formInputs.removeAttr('disabled');
          self._updateDatesDisabledAttr(self.datesAreDisabled);

          self.$('.js-form-alert')
            .html('Whoops! Looks like something went wrong on our end. Please try again.')
            .show();
        }
      });
    },

    toggleNoDates: function(e) {
      this.datesAreDisabled = !this.datesAreDisabled;
      this._updateDatesDisabledAttr(this.datesAreDisabled);
    },

    _updateDatesDisabledAttr: function(disable) {
      $dates = this.$('.js-start-date,.js-end-date,.js-dates-are-flexible');

      $dates.attr('disabled', function(index, attr){
        return disable ? 'disabled' : null;
      });
    },

    _getFormValues: function($form){
      var attrs = $form.serializeJSON();
      attrs.startDate = this.datePicker.getStartDate();
      attrs.endDate = this.datePicker.getEndDate();
      return attrs;
    },

    // empty the view's content and stop listening to events,
    // while leaving the view's el intact
    clear: function(){
      this.$el.empty();
      this.stopListening();
    }

  });
});
