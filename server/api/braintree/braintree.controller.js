/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/braintree              ->  index
 * POST    /api/braintree              ->  create
 * GET     /api/braintree/:id          ->  show
 * PUT     /api/braintree/:id          ->  update
 * DELETE  /api/braintree/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Braintree from './braintree.model';

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function handleResponse (res) {
  return function (err, result) {
    if(err) {
      return handleError(res)(err);
    }
    responseWithResult(res)(result);
  }
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

exports.clientToken = function(req, res){
  Braintree.clientToken.generate({}, function (err, data) {
    //console.log(Braintree.clientID)
    return handleResponse(res)(err, res.clientToken);
  });
}

exports.checkout = function(req, res){
  Braintree.transaction.sale({
    amount: req.body.total,
    paymentMethodNonce: req.body.nonce,
  }, function callback (err, result) {
    if(err) {
      return handleError(res)(err);
    }
    if(result.success){
      responseWithResult(res)(result);
    } else {
      handleError(res)(result.errors);
    }
  });
}