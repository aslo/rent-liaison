define([
  'backbone',
  'pikaday',
  'tab',
  'modules/rentalRequest/views/completionProgressView',
  'views/tag'
], function(Backbone, Pikaday, tab, CompletionProgressView, Tag){

  return Backbone.View.extend({

    events: {
      'submit .js-rental-request-form': 'updateRentRequest',
      'submit .js-user-form': 'updateUser'
    },

    initialize: function() {
      this.model.set('id', this.$el.data('rentalRequestId'));

      // subviews
      this.progressSubview = new CompletionProgressView({
        el: this.$('#js-rent-request-progress'),
        model: this.model
      });
      this.$('.js-tag').each(function(){
        new Tag({ el: this });
      });

      // init plugins
      this.$('.js-pikaday').each(function(i, el){
        new Pikaday({ field: el });
      });
      this.$('[data-toggle=tab]').tab();

    },

    updateRentRequest: function (e) {
      this._updateModelFromForm(e, this.model);
    },
    updateUser: function(e){
      this._updateModelFromForm(e, this.model.get('user'));
    },
    _updateModelFromForm: function(e, model) {
      e.preventDefault()
      clean = function (obj) {
        // for (key in obj) {
        //   if (typeof obj[key] == 'object') {
        //     obj[key] = clean(obj[key]);
        //   } else if (obj[key] == "") {
        //     delete obj[key];
        //   }
        // }
        return obj;
      }

      var attrs = this.$(e.target).serializeJSON()
      attrs = clean(attrs);
      return model.save(attrs, {
        patch: true
        // success: console.log,
        // error: console.error
      });
    }

  });
});
