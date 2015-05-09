define([
  'underscore',
  'templates', // require the file so it gets executed - templates are added to a browser global
  'jade'
], function(_, templates, jade){

  function Tpl(path) {
    window.jade = jade;

    this.templates = snorlax.templates;
    this.path = path;
  }

  Tpl.prototype = {
    render: function(data){
      return this.templates[this.path](data);
    }
  }

  return Tpl;

})
