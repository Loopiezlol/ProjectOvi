'use strict';

var express = require('express');
var controller = require('./invoiced.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/invoices/', controller.index); // [][]
router.get('/invoices/:id', controller.show); // [*][]
router.post('/invoices/:customer_id', controller.create);//  [*][]

router.get('/customers/', controller.index); // [][]
router.get('/customers/:id', controller.show); // [][]
router.post('/customers/:id', controller.create);//  [][]

module.exports = router;
