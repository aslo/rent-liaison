var mailer = require('../lib/mailer')();

module.exports = {

  sendActivationEmail: function(to, cb) {
    mailer.send({
      to:      to,
      from:    'noreply@rentliason.com',
      subject: 'Activate Your Account',
      html:    '<p>blah blah blah</p>'
    }, cb);
  }
}
