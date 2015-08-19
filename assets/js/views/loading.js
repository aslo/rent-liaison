define(['backbone'], function(Backbone){

  // A collection of behaviors for loading/success/error states in forms
  return Backbone.View.extend({

    loading: function($btn, $form) {
      $form.find('input,textarea,select,button').attr('disabled', 'disabled');
    },

    success: function($btn, $form, successMessage) {
      $form.find('input,textarea,select,button').removeAttr('disabled');
      this._clearStatus($form);
      $form.prepend('<div class="js-status-alert alert alert-success fade in">'+successMessage+'</div>');

      setTimeout(function(){
        $form.find('.js-status-alert').fadeOut(1000);
      }, 1500);
    },

    error: function($btn, $form, errorMessage) {
      $form.find('input,textarea,select,button').removeAttr('disabled');
      this._clearStatus($form);
      $form.prepend('<div class="js-status-alert alert alert-danger fade in">'+errorMessage+'</div>');
    },

    _clearStatus: function($form) {
      $form.find('.js-status-alert').remove();
    }

  });

});
