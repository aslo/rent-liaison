define([
  'backbone',
  'modules/rentalRequest/views/tabs',
  'modules/rentalRequest/views/groupInfoFormView',
  'modules/rentalRequest/views/personalInfoFormView',
  'modules/rentalRequest/views/propertyInfoFormView',
], function(Backbone, RentRequestTabsView, GroupInfoFormView, PersonalInfoFormView, PropertyInfoFormView){

  return Backbone.View.extend({

    initialize: function() {
      this.model.set('id', this.$el.data('rentalRequestId'));

      // subview for managing the tab states
      new RentRequestTabsView({
        el: this.$('.js-rr-tabs'),
        model: this.model,
        tabViews: {
          '#js-personal-info': new PersonalInfoFormView({
            el: this.$('#js-personal-info'),
            model: this.model
          }),
          '#js-group-info': new GroupInfoFormView({
            el: this.$('#js-group-info'),
            model: this.model
          }),
          '#js-property-info': new PropertyInfoFormView({
            el: this.$('#js-property-info'),
            model: this.model
          }),
        }
      });
    }

  });
});
