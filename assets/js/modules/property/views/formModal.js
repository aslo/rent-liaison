define([
  'underscore',
  'tpl',
  'views/modal',
  'views/tag'
], function(_, Tpl, Modal, Tag){

  return Modal.extend({

    formTpl: new Tpl('views/modules/propertyowners/_property_form'),

    events: {
      'submit .js-property-form': 'submitForm'
    },

    initialize: function(options){
      var fields = ['amenities', 'locations', 'destinations']
      for (i in fields) {
        this[fields[i]] = options[fields[i]];
      }
    },

    render: function() {
      if (this.model.isNew()) {
        this.title = 'New Property Profile'
      } else {
        this.title = this.model.get('name')
      }

      this.body = this.formTpl.render({
        isNew: this.model.isNew(),
        property: this.model.toJSON(),

        amenities: this.amenities.toJSON(),
        destinations: this.destinations.toJSON(),
        locations: this.locations.toJSON()

      })

      Modal.prototype.render.apply(this)

      this.$('.js-tag').each(function(){
        new Tag({ el: this })
      })

      return this;
    },

    setModel: function(model){
      this.model = model
    },

    submitForm: function(e) {
      e.preventDefault();

      var attrs = this.$(e.target).serializeJSON()

      // for externalListings, remove if url is falsy
      if (attrs.externalListings) {
        attrs.externalListings = _.filter(attrs.externalListings, function(listing){
          return !!listing.url;
        })
      }

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
