define([
  'tpl',
  'views/modal',
  'modules/rentalRequest/contactDialogView'
], function(Tpl, Modal, ContactView){

  return Modal.extend({

    detailTpl: new Tpl('views/modules/propertyowners/_rent_request_detail'),

    events: {
      'click .js-contact': 'showContact'
    },

    initialize: function(){
      this.title = 'Rent Request Details';
    },

    render: function(){
      this.body = this.detailTpl.render({
        model: this.model.toJSON()
      });

      Modal.prototype.render.apply(this);

      return this;
    },

    showContact: function(e) {
      // TODO trigger an event and let the supervising view handle the
      // instantiation of this next view
      var contactView = new ContactView({
        rentRequest: this.model
      });

      this.$('.modal').modal('hide');

      contactView.render();
    }

  });
});
