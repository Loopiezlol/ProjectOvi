/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/invoiced              ->  index
 * POST    /api/invoiced              ->  create
 * GET     /api/invoiced/:id          ->  show
 * PUT     /api/invoiced/:id          ->  update
 * DELETE  /api/invoiced/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Invoice from './invoiced.model';
import Order from '../order/order.model';
import request from 'request';
var API_KEY = '7427bc1f7a4c61d3a2288dc69ed4efc8';
var invoiceUrl = 'https://'+ API_KEY + ':@api.sandbox.invoiced.com/invoices/';
var customersUrl = 'https://'+ API_KEY + ':@api.sandbox.invoiced.com/customers/';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;

}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
          return null;
        });
    }
    return null;
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Invoiceds
export function index(req, res) {
  return Invoiced.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Invoiced from the DB
export function show(req, res) {
  var url = invoiceUrl + req.params.id;
  var obj;
  request({
    url: url,
    json: true,
   // formData: formData
}, function (error, response, body) {
    
    if (!error && response.statusCode === 200) {
        console.log(response.body.customer); // Print the json response
        console.log(error + '   khbjhbkjbkjnkj');
        _.merge(obj, response.body);
        obj = response.body;
        console.log(obj);
        res.send(response.body);
    }
})
}

// Creates a new Invoiced in the DB
export function create(req, res) { // req.body == formData ?
  var invoice = new Invoice();
  var item = {
    name: 'a',
    quantity: 0,
    unit_cost: 0
  }
  for(var i=0;i<req.body.items.length; i++) {
   item.name = req.body.items[i]._id;
   item.unit_cost = req.body.items[i].total / req.body.items[i].quantity;
   item.quantity = req.body.items[i].quantity;
   invoice.items.push(item);
 }
//console.log(invoice);
request.post(  ///patch
      invoiceUrl,
      { json: invoice },
      function (error, response, body) {
        console.log('aaaaaaaaaa' + response.body.customer)
          if (!error) {
              res.send(response.body);
              console.log('aaaaaaaaaa' + response.body.customer)
          }
      }
);
/*
  var invoice = {
  customer: req.params.customer_id,
  payment_terms: 'NET 14',
  items: [],
  taxes: [{
    amount: 4
  }]
 }
var items = [{
    name: 'cv',
    quantity: 4,
    unit_cost: 3
  }]

 for(var i=0;i<req.body.items.length; i++) {
   items[i].name = req.body.items[i]._id;
   items[i].unit_cost = req.body.items[i].total / req.body.items[i].quantity;
   items[i].quantity = req.body.items[i].quantity;
 }
console.log(items);*///////////////////////////////////////////////////////////////////
/*
Order.findById(req.body.order_id, 'items', function(err, found){
  items = found.items;
  invoice.items = items;
  console.log(invoice);
  request.post(  ///patch
      invoiceUrl,
      { json: invoice },
      function (error, response, body) {
        console.log('aaaaaaaaaa' + response.body.customer)
          if (!error) {
              res.send(response.body);
              console.log('aaaaaaaaaa' + response.body.customer)
          }
      }
);

})*/
}

// Updates an existing Invoiced in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Invoiced.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Invoiced from the DB
export function destroy(req, res) {
  return Invoiced.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


//TODO   
/*
[*] /api/invoiced/49231 POST  - post an invoice to invoiced
[ ] /

*/