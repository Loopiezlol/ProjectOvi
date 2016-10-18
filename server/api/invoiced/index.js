'use strict';

var express = require('express');
var controller = require('./invoiced.controller');

var router = express.Router();
/*
router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);*/

router.get('/invoices', controller.indexInvoices); // [][]
router.get('/invoices/:id', controller.showInvoice); // [*][*]
router.post('/invoices', controller.createInvoice);//  [*][*]

router.get('/customers', controller.indexCustomers); // [][]
router.get('/customers/:id', controller.showCustomer); // [][]
router.post('/customers', controller.createCustomer);//  [][]

module.exports = router;
