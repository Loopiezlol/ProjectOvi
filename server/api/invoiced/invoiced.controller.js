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

// Gets a list of Invoices
export function indexInvoices(req, res) {
  request.get(
      invoiceUrl,
      function (error, response, body) {
          if (!error) {
              res.send(response.body);
          }
      }
  );
}

// Gets a single Invoice
export function showInvoice(req, res) {
  var url = invoiceUrl + req.params.id;
  request.get(
      url,
      function (error, response, body) {
          if (!error) {
              res.send(response.body);
          }
      }
  );

}

// Creates a new Invoice
export function createInvoice(req, res) {
  var invoice = new Invoice();
  invoice.customer = req.body.invoicedId;

  var item = {
    name: '',
    quantity: 0,
    unit_cost: 0
  }

  for(var i=0;i<req.body.items.length; i++) {
    item.name = req.body.items[i]._id;
    item.unit_cost = req.body.items[i].total / req.body.items[i].quantity;
    item.quantity = req.body.items[i].quantity;
    invoice.items.push(item);
  }

  request.post(
        invoiceUrl,
        { json: invoice },
        function (error, response, body) {
            if (!error) {
                res.send(response.body);
            }
        }
  );

}

// Create a customer
export function createCustomer(req, res) {
  var customer = { 
    name: req.body.name,
    email: req.body.email,
    collection_mode: 'manual',
    payment_terms: 'NET 30',
    type: req.body.customer_type
  }
  request.post(
      customersUrl,
      { json: customer },
      function (error, response, body) {
          if (!error) {
              res.send(response.body);
          }
      }
  );
}

// Get a list of all customers
export function indexCustomers(req, res) {
  request.get(
      customersUrl,
      function (error, response, body) {
          if (!error) {
              res.send(response.body);
          }
      }
  );
}

// Get a single customer
export function showCustomer(req, res) {
  var url = customersUrl + req.params.id;
  request.get(
      url,
      function (error, response, body) {
          if (!error) {
              res.send(response.body);
          }
      }
  );
}