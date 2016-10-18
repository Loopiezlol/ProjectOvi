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
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");//config



//Tokenize card
export function tokenize(req, res) {
  console.log(req.body);
  stripe.tokens.create({
    card: {
      "number": req.body.cardNumber,
      "exp_month": req.body.month,
      "exp_year": req.body.year,
      "cvc": req.body.cvc
    }
  }, function (err, token) {
    console.log(err);
    console.log(token);
    res.send(token);
  });

}


// Save credit card and add customer
export function createCustomer(req, res) {
  stripe.customers.create({
    description: req.body.description,
    email: req.body.email,
    source: req.body.token // obtained with Stripe.js
  }, function (err, customer) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(customer);
      res.send(customer);
    }
  });
}

// Charge card for one time purchases
export function chargeCard(req, res) {
  console.log('sourceee:' + req.body.source + ':');
  var charge = stripe.charges.create({
    amount: req.body.amount, // Amount in cents
    currency: req.body.currency,
    source: req.body.source,
    description: req.body.description
  }, function (err, charge) {
    if (err) {
      res.send(err);
    } else {
      res.send(charge);
    }
  });
}

// Charge existing customer
export function chargeCustomer(req, res) {
  var charge = stripe.charges.create({
    amount: req.body.amount, // amount in cents, again
    currency: req.body.currency, //gbp
    customer: req.params.customer_id, //existing customer id
    description: req.body.description
  }, function (err, charge) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(charge);
    }
  });
}