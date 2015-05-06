var Mailer = require('../lib/mailer');

module.exports = {

  sendActivationEmail: function(to, uri, cb) {
    mailer = new Mailer();

    var absoluteUrl = 'http://' + process.env.HOST + ':' + process.env.PORT + '/rentalrequest/' + uri;

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
  }

}
