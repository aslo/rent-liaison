var Mailer = require('../lib/mailer');

module.exports = {

  sendActivationEmail: function(to, cb) {
    mailer = new Mailer();
    mailer.send({
      to:      to,
      from:    'noreply@rentliason.com',
      subject: 'Activate Your Account',
      html:    '<p>blah blah blah</p>'
    }, cb);
  }
}
