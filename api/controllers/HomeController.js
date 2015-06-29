var _ = require('lodash');

module.exports = {

  show: function(req, res, next) {
    Destination.find({})
    .then(function(destinations){
      res.view('modules/home/home', {
        _: _,
        destinations: destinations
      })
    })
  }

}
