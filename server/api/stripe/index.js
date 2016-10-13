'use strict';

var express = require('express');
var controller = require('./stripe.controller');

var router = express.Router();

router.post('/tokenize', controller.tokenize);
router.post('/createcustomer', controller.createcustomer);
router.post('/charge', controller.charge);
//router.get('/:id', controller.show);
//router.post('/', controller.createcustomer);
router.get('/:customer_id', controller.charge);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
