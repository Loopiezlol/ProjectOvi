'use strict';

var express = require('express');
var controller = require('./stripe.controller');

var router = express.Router();

router.get('/', controller.tokenize);
//router.get('/:id', controller.show);
router.post('/', controller.createcustomer);
router.get('/:customer_id', controller.charge);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
