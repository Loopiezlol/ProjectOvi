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
import Stripe from './stripe.model';
//var stripes = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

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
export function index(req, res) {
  return Stripe.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Stripe from the DB
export function show(req, res) {
  return Stripe.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Stripe in the DB
export function create(req, res) {
  var stripeToken = req.body.stripeToken;
 
	var charge = stripe.charges.create({
		amount: 1000, // amount in cents, again
		currency: "usd",
		card: stripeToken,
		description: "payinguser@example.com"
	}, function(err, charge) {
		if (err && err.type === 'StripeCardError') {
			// The card has been declined
		} else {
			//Render a thank you page called "Charge"
			res.render('charge', { title: 'Charge' });
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