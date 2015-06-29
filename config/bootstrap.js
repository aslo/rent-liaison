/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

Promise = require('bluebird');

var PROPERTY_ATTRIBUTES = {
  AMENITY: [
    'HOT_TUB',
    'POOL'
  ],
  LOCATION: [
    'IN_TOWN',
    'ON_THE_WATER',
    'BEACHSIDE'
  ]
};

var DESTINATIONS = [
  'EAST_HAMPTON',
  'WEST_HAMPTON',
  'SOUTH_HAMPTON',
  'HAMPTON_BAYS',
  'MONTAUK',
  'FIRE_ISLAND',
  'NORTH_FORK'
];

module.exports.bootstrap = function(cb) {

  sails.services.passport.loadStrategies();

  var promises = [];
  for (var type in PROPERTY_ATTRIBUTES) {
    for (var attr in PROPERTY_ATTRIBUTES[type]) {
      promises.push(PropertyAttribute.findOrCreate({ type: type, name: PROPERTY_ATTRIBUTES[type][attr] }));
    }
  }

  for (var i in DESTINATIONS) {
    promises.push(Destination.findOrCreate({ name: DESTINATIONS[i] }));
  }

  Promise.all(promises)
  .then(function(){
    cb();
  })
  .catch(function(err){
    console.log(err);
    cb();
  })

};


