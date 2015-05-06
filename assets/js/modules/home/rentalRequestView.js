define([
  'backbone',
  'pikaday',
  'serializeJSON',

  'modules/rentalRequest/model'

], function(Backbone, Pikaday, serializeJSON, RentalRequest){

  return Backbone.View.extend({

    events: {
      'change #js-no-dates': 'toggleNoDates',
      'submit .js-rent-request-form': 'submitForm'
    },

    initialize: function() {
      // init date picker
      this.$('.js-pikaday').each(function(i, el){
        new Pikaday({ field: el });
      });

    },

    submitForm: function (e) {
      e.preventDefault();
      var self = this;

      var email = this.$('[name="user[email]"]').val();

      var $formInputs = this.$(e.target).find('input, select');
      var attrs = $formInputs.serializeJSON();
      $formInputs.attr('disabled', 'disabled');

      var model = new RentalRequest();
      model.save(attrs, {
        success: function(model, response, options){
          self.clear();

          var template = _.template(
            "<div class='row'>"
            + "<div class='offset-by-two columns eight columns'>"
            + "<p>Almost done!</p>"
            + "<p>A confirmation email has been sent to <strong><%= email %></strong>. "
            + "Please click the confirmation link in your email to complete the process.</p>"
            + "</div>"
            + "</div>");

          self.$el.html(template({ email: email }));
        },
        error: function(model, response, options){
          console.error(arguments);

          $formInputs.removeAttr('disabled');

          this.$('.js-form-alert')
            .html('Whoops! Looks like something went wrong on our end. Please try again.')
            .show();
        }
      });
    },

    toggleNoDates: function(e) {
      $dates = this.$('.js-date-section');
      $dates.toggleClass('hide');

      $dates.find('input').attr('disabled', function(index, attr){
        return attr ? null : 'disabled';
      });
    },

    // empty the view's content and stop listening to events,
    // while leaving the view's el intact
    clear: function(){
      this.$el.empty();
      this.stopListening();
    }

  });
});