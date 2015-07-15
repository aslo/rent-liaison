var Promise = require('bluebird');

module.exports = {

  home: function(req, res) {
    res.view('modules/admin/home')
  },

  users: function(req, res) {
    User.find({})
    .then(function(users){
      return res.view('modules/admin/users', {
        users: users
      })
    })
    .catch(function(err){
      return res.serverError(err);
    })
  },

  confirmUser: function(req, res) {
    UserService.confirmUserIfUnconfirmed(req.params.id)
    .then(function(user){
      res.redirect('/admin/users')
    })
    .catch(function(err){
      return res.serverError(err);
    })
  },

  deactivateUser: function(req, res) {
    UserService.deactivateUser(req.params.id)
    .then(function(user){
      res.redirect('/admin/users')
    })
    .catch(function(err){
      return res.serverError(err);
    })
  },

  maskAsUser: function(req, res) {
    // User.findOne(req.params.id)
    // .then(function(user){
    //   return Promise.promisify(req.login)(user)
    // })
    // .then(function(){
    //   req.session.authenticated = true
    //   res.redirect('/home');
    // })
    // .catch(function(err){
    //   return res.serverError(err);
    // })
    User.findOne(req.params.id, function(err, user){
      if (err) return res.serverError(err)

      passport.callback(req, res, function (err, user, challenges, statuses) {
        if (err) {
          return res.serverError(err)
        }

        req.login(user, function (err) {
          if (err) {
            return res.serverError(err)
          }

          // Mark the session as authenticated to work with default Sails sessionAuth.js policy
          req.session.authenticated = true

          // Upon successful login, send the user to the homepage were req.user
          // will be available.
          res.redirect('/home');
        });
      });
    })

  }
}
