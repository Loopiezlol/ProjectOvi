'use strict';

import mongoose from 'mongoose';
import braintree from 'braintree';

//var braintree = require('braintree-angul');
var config = require('../../config/environment/index');
var isProduction = config.env === 'production';

var gateway = braintree.connect({
  environment: isProduction ? braintree.Environment.Production : braintree.Environment.Sandbox,
  merchantId: 'smmwn9hykgrr85gg',
  publicKey: 'xfz35wscrdn73f2j',
  privateKey: '2f785d5c8ef9845bb75e9ec0bfed15e6'
});

module.exports = gateway;