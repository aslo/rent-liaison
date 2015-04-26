module.exports = function(){
  var sendgrid = require('sendgrid')(process.env.SENDGRID_API_USER, process.env.SENDGRID_API_KEY);

  return {
    send: function(options, cb) {
      sails.log.debug('called mailer.send');
      sails.log.debug(options);

      if (process.env.MAIL_REDIRECT) {
        options.to = process.env.MAIL_REDIRECT;
      }

      if (process.env.MAIL_DELIVER) {
        sails.log.info('Attempting to send message');
        sendgrid.send(options, cb);

      } else {
        sails.log.info('MAIL_DELIVER env variable not set - mailer not sending');
        cb(null, {});
      }
    }
  }
}
