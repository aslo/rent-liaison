/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  // static site
  'GET /': 'HomeController.show',
  'GET /rentrequest': 'HomeController.show',
  'GET /howitworks': 'HomeController.show',
  'GET /about': 'HomeController.show',

  // property owner
  'GET /home': 'PropertyOwnerController.home',
  'GET /rentalrequest': 'PropertyOwnerController.showRentalRequests',
  'POST /rentalrequest/:id/respond': 'PropertyOwnerController.respondToRentalRequest',
  'GET /properties': 'PropertyOwnerController.indexProperties',
  'POST /property': 'PropertyOwnerController.createProperty',
  'PUT /property/:id': 'PropertyOwnerController.updateProperty',
  'POST /property/:id/picture': 'PropertyOwnerController.addImageToProperty',
  'DELETE /property/:id/picture/:imageId': 'PropertyOwnerController.deleteImage',

  // property
  'GET /property/:slug': 'PropertyController.get',

  // renter
  'POST /rentalrequest': 'RentalRequestController.create',
  'GET /rentalrequest/:uri': 'RentalRequestController.findByUri',
  'PATCH /rentalrequest/:id': 'RentalRequestController.patch',
  'PATCH /user/:id': 'UserController.patch',

  // auth
  'GET /login': 'AuthController.login',
  'GET /logout': 'AuthController.logout',
  'POST /auth/local': 'AuthController.callback',
  'POST /auth/local/:action': 'AuthController.callback',
  'GET /auth/:provider': 'AuthController.provider',
  'GET /auth/:provider/callback': 'AuthController.callback',
  'GET /auth/:provider/:action': 'AuthController.callback',

  // admin
  'get /admin': 'AdminController.home',
  'get /admin/users': 'AdminController.users',
  'get /admin/users/:id/confirm': 'AdminController.confirmUser',
  'get /admin/users/:id/deactivate': 'AdminController.deactivateUser',
  'get /admin/users/:id/mask': 'AdminController.maskAsUser',

};
