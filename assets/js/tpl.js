define([
  'underscore',
  'templates', // require the file so it gets executed - templates are added to a browser global
  'jade',
  'helpers',
  'moment'
], function(_, templates, jade, helpers, moment){

  function Tpl(path) {
    window.jade = jade;

    this.templates = snorlax.templates;
    this.path = path;
  }

  Tpl.prototype = {
    render: function(data){
      var templateGlobals = {
        helpers: helpers,
        moment: moment
      }

      return this.templates[this.path](_.extend(templateGlobals, data));
    }
  }

  return Tpl;

})
