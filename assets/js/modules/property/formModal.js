define([
  'backbone',
  'tpl',
  'views/modal'
], function(Backbone, Tpl, Modal){

  return Backbone.View.extend({

    template: new Tpl('views/modules/propertyowners/_property_form'),

    events: {
      'submit .js-property-form': 'submitForm'
    },

    render: function() {
      var m  = new Modal({
        title: 'New Property Profile',
        body: this.template.render()
      })

      this.setElement(m.render().el);

      return this;
    },

    submitForm: function(e) {
      e.preventDefault();

      var attrs = this.$(e.target).serializeJSON()

      self = this;
      this.model.save(attrs)
      .done(function(){
        self._hideErrorAlert();
        location.reload();

      })
      .fail(function(xhr){
        if (xhr.responseJSON && xhr.responseJSON.error == "E_VALIDATION") {
          self._showErrorAlert('Please fix and try again');
          self._showInvalidInputs(xhr.responseJSON.invalidAttributes);

        } else {
          self._showErrorAlert('Whoops! Looks like there\'s an issue on our end. Please try again.');
        }
      })
    },

    _showInvalidInputs: function(invalidAttributes) {
      for (attr in invalidAttributes) {
        $el = self.$('[name='+attr+']');
        if ($el.size() > 0) {
          console.log($el);
          //TODO
        }
      }
    },

    _showErrorAlert: function(message){
      this.$('.js-error-alert').text(message).show()
    },

    _hideErrorAlert: function() {
      this.$('.js-error-alert').hide().text('')
    }

  })
})
