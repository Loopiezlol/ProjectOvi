'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'projectovi-secret',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  TWITTER_ID:       'app-id',
  TWITTER_SECRET:   'secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  BRAINTREE_ID: 'smmwn9hykgrr85gg',
  BRAINTREE_SECRET: '2f785d5c8ef9845bb75e9ec0bfed15e6',
  BRAINTREE_MERCHANT: 'xfz35wscrdn73f2j',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
