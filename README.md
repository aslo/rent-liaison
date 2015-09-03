# Rent Liaison
A real estate listings site Rent Liaison built using [Sails.js](http://sailsjs.org)

## Getting started
Rent Liaison requires node v0.10.38 and npm.

#### Checkout this repo and run the setup script
The setup script installs all required global and local node dependencies.
```
$ git checkout git://github.com/aslo/snorlax.git
$ cd snorlax && ./setup.sh
```

#### Install local dependencies
Rent Liaison uses npm and bower for server and client dependencies, respectively.
```
$ npm install && bower install
```

#### Configuration
[Following twelve-factor app best practices](http://12factor.net/config), this application uses environment variables to store all sensitive and/or environment-specific configuration variables.

We use [dotenv](https://github.com/motdotla/dotenv) to manage environment-specific configuration variables. For local development, create a file at this repository's root and add the following required configuration variables.

```
HOST=localhost
PORT=1337
NODE_ENV=development

# turns off or on the sending of all emails
MAIL_DELIVER=false
# if this var is set, all emails are redirected to this email address
MAIL_REDIRECT=

# sendgrid api credentials for sending emails
SENDGRID_API_USER=
SENDGRID_API_PASS=

# connection data for application db
DATABASE_URL=postgres://user@localhost:5432/rent_liaison

# a key to be used for encrypting sessions
SESSION_SECRET=

# amazon s3 credentials for image storage
S3_KEY=
S3_BUCKET=
S3_SECRET=

# redis url for persistent session storage
REDISCLOUD_URL=redis://user@localhost:6379

# api keys for oauth logins
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

```

#### Running it
```
$ npm start
```

#### External Services required for production
Rent Liaison relies on a number of external the following external services:

* redis (used for session storage)
* postgreSQL (used for app data storage)
* Amazon S3 (used for photo uploads)
* Sendgrid (for emails)
* Google API (for oauth logins)
* Facebook API (for oauth logins)
