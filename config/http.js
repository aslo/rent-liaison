/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    order: [
      'responseLogger',
      'cookieParser',
      'session',
      'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      // 'methodOverride',
      'poweredBy',
      'responseGlobals',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    myRequestLogger: function (req, res, next) {
      sails.log.info("REQ :: ", req.method, req.url);
      return next();
    },

    // Using response-time middleware
    responseLogger: function (req, res, next) {
      req.on("end", function() {
        sails.log.info('RES :: ', req.method, req.url, ' response time: ' + res.getHeader('X-Response-Time'));
      });
      require('response-time')()(req, res, next);
    },

    responseGlobals: function(req, res, next) {
      _.extend(res.locals, {}, sails.config.templateGlobals);
      next();
    },

  }

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
