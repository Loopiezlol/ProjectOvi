/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/stripe              ->  index
 * POST    /api/stripe              ->  create
 * GET     /api/stripe/:id          ->  show
 * PUT     /api/stripe/:id          ->  upsert
 * PATCH   /api/stripe/:id          ->  patch
 * DELETE  /api/stripe/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
//import Stripe from './stripe.model';
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
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

// Gets a list of Stripes
export function tokenize(req, res) {
  console.log(req.body);
  stripe.tokens.create({
  card: {
    "number": req.body.cardNumber,
    "exp_month": req.body.month,
    "exp_year": req.body.year,
    "cvc": req.body.cvc
  }
}, function(err, token) {
  console.log(err);
  console.log(token);
  res.send(token);
});

}

// Gets a single Stripe from the DB
export function createcustomer(req, res) {
  stripe.customers.create({
    description: req.body.description,
    source: req.body.token // obtained with Stripe.js
  }, function(err, customer) {
    if(err){
      console.log(err);
      res.send(err);
    } else {
      console.log(customer);
      res.send(customer);
    }
  });
}

// Creates a new Stripe in the DB
export function charge(req, res) {
  var stripeToken = req.body.stripeToken;//can sharge without user

 console.log('customer id:' + req.body.customer_id + ':');
	var charge = stripe.charges.create({
		amount: req.body.amount, // amount in cents, again
		currency: req.body.currency, //usd
		customer: req.body.customer_id, //existing customer id
		description: req.body.description
	}, function(err, charge) {
		if(err){
      console.log(err);
      res.send(err);
    } else {
      console.log(err)
      res.send(charge);
    }
	});
}

// Upserts the given Stripe in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Stripe.findOneAndUpdate(req.params.id, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Stripe in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Stripe.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Stripe from the DB
export function destroy(req, res) {
  return Stripe.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
