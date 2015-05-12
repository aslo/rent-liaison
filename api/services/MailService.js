var Mailer = require('../lib/mailer');

var appUrl = 'http://' + process.env.HOST + ':' + process.env.PORT;

module.exports = {

  sendActivationEmail: function(to, uri, cb) {
    var mailer = new Mailer();

    var absoluteUrl = appUrl + '/rentalrequest/' + uri;

    mailer.send({
      to:      to,
      from:    'noreply@rentliason.com',
      subject: 'Welcome to Rent Liason',
      html:    '<strong>Welcome to Rent Liason!</strong>'
        + '<p>Congratulations on creating your first Rent Request!'
        + '  Your request has been logged in our system, and as soon as you click the activation link below'
        + ' we will begin finding a match among our qualified property managers.</p>'
        + 'Don\'t lose track of this link, as it is your only way to manage your Rent Request in the future.'
        +'<p><a href="' + absoluteUrl + '">Activate your Rent request by clicking here: '+ absoluteUrl + '</a></p>'
        + '<p>Happy Renting!</p>'
    }, cb);
  },

  sendRentRequestResponseEmail: function(rentRequest, fromUser, properties, cb) {
    var mailer = new Mailer()

    var message = 'Hello, I am reaching out via Rent Liason with a few properties that meet your parameters...'
    + '</br>'
    + '<ul>'

    for (var i=0; i<properties.length; i++) {
      var property = properties[i];
      message += '<li><a href="' + appUrl + '/property/' + property.slug + '">' + property.name + '</a></li>'
    }

    + '</ul>'

    mailer.send({
      to: rentRequest.user.email,
      cc: fromUser.email,
      from: 'liason@rentliason.com',
      subject: 'Response to Your Rent Request on rentliason.com',
      html: message
    }, cb)
  }

}
