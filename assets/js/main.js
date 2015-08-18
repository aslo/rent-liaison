// Kick off the application.
require(['app', 'router', 'backbone', 'jquery'], function(app, Router, Backbone, $) {

  app.router = new Router();

  // Instantiate global pubsub
  Backbone.PubSub = _.extend({}, Backbone.Events);

  // Trigger the initial route and enable HTML5 History API support, set the
  // root folder to '/' by default.  Change in app.js.
  Backbone.history.start({ pushState: true, root: app.root });

  // setup client-side routing
  $(document).on('click', 'a[data-internal]', function(e){
    e.preventDefault();
    Backbone.history.navigate(e.target.pathname, true);
  });

});
