define([
  'tpl',
  'views/modal',
  'modules/property/collection'
], function(Tpl, Modal, PropertyCollection){

  return Modal.extend({

    formTemplate: new Tpl('views/modules/propertyowners/_contact_form'),
    selectedPropertyTemplate: new Tpl('views/modules/propertyowners/_contact_form__selected_property'),

    events: {
      'change .js-choose-property' : 'updatePropertySelection',
      'click  .js-send'            : 'sendMessage'
    },

    initialize: function(options){
      this.properties  = new PropertyCollection(window.propertyProfiles)
      this.rentRequest = options.rentRequest

      this.title = 'Compose Your Message'

      this.selectedProperties = new PropertyCollection()
      // TODO subview for this?
      this.listenTo(this.selectedProperties, 'add', this.addToSelection)
      this.listenTo(this.selectedProperties, 'remove', this.removeFromSelection)
    },

    render: function() {
      this.body = this.formTemplate.render({
        properties: this.properties.toJSON(),
        rentRequest: this.rentRequest.toJSON()
      })

      Modal.prototype.render.apply(this)

      return this;
    },

    updatePropertySelection: function(e) {
      var id = this.$(e.target).data('propertyId');
      var model = this.properties.get(id);

      if (this.$(e.target).is(':checked')) {
        this.selectedProperties.add(model)
      } else {
        this.selectedProperties.remove(model)
      }
    },

    addToSelection: function(model) {
      this.$('.js-selected-properties').append(
        this.selectedPropertyTemplate.render({
          property: model.toJSON()
        })
      )
    },

    removeFromSelection: function(model) {
      this.$('.js-selected-properties [data-property-id='+ model.id +']').remove()
    },

    sendMessage: function(e) {
      console.log('send message!!!!')
      var message = this.$('.js-message-body').html()
      console.log(this.rentRequest.url(), message);

      $.post(this.rentRequest.url() + '/respond', {
        message: message
      })
      .done(function(){

      })
      .fail(function(){

      })
    }
  })
})
