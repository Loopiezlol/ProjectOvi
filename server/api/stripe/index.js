'use strict';

var express = require('express');
var controller = require('./stripe.controller');

var router = express.Router();

router.post('/tokenize', controller.tokenize);
router.post('/customer', controller.createCustomer);

router.post('/charge', controller.chargeCard);
router.post('/charge/:customer_id', controller.chargeCustomer);

module.exports = router;
