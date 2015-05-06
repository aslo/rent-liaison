var Sendgrid = require('sendgrid');

Mailer = function(){
 this.sendgrid = Sendgrid(process.env.SENDGRID_API_USER, process.env.SENDGRID_API_PASS);
}

Mailer.prototype.send = function(options, cb) {
  sails.log.debug('called mailer.send');
  sails.log.debug(options);

  if (process.env.MAIL_REDIRECT) {
    options.to = process.env.MAIL_REDIRECT;
  }

  if (process.env.MAIL_DELIVER) {
    sails.log.info('Attempting to send message');
    this.sendgrid.send(options, cb);

  } else {
    sails.log.info('MAIL_DELIVER env variable not set - mailer not sending');
    cb(null, {});
  }
}

module.exports = Mailer
