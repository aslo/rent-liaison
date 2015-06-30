define([
  'underscore',
  'templates', // require the file so it gets executed - templates are added to a browser global
  'jade',
  'helpers'
], function(_, templates, jade, helpers){

  function Tpl(path) {
    window.jade = jade;

    this.templates = snorlax.templates;
    this.path = path;
  }

  Tpl.prototype = {
    render: function(data){
      return this.templates[this.path](_.extend({ helpers: helpers }, data));
    }
  }

  return Tpl;

})
