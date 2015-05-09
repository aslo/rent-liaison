define([
  'backbone',
  'modal'
], function(Backbone, modal){

  return Backbone.View.extend({
    initialize: function(options){
      this.title = options.title;
      this.body = options.body;
      this.footer = options.footer;
    },

    render: function() {
      this.$el.html(this.template({
        title: this.title,
        body: this.body,
        footer: this.footer
      }))

      this.$('.modal').modal().on('hidden', function(){
        this.remove();
      });

      $(document.body).append(this.el)

      return this;
    },

    template: _.template(
        '<div class="modal fade">'
      + '<div class="modal-dialog modal-lg">'
      + '<div class="modal-content">'
      +   '<div class="modal-header">'
      +     '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
      +     '<h4 class="modal-title"><%= title %></h4>'
      +   '</div>'
      +   '<div class="modal-body">'
      +     '<%= body %>'
      +   '</div>'
      +   '<div class="modal-footer">'
      +     '<%= footer %>'
      +   '</div>'
      + '</div><!-- /.modal-content -->'
      + '</div><!-- /.modal-dialog -->'
      + '</div><!-- /.modal -->'
    )
  });
});
