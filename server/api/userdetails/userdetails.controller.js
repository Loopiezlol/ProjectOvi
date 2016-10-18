/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/userdetails              ->  index
 * POST    /api/userdetails              ->  create
 * GET     /api/userdetails/:id          ->  show
 * PUT     /api/userdetails/:id          ->  upsert
 * PATCH   /api/userdetails/:id          ->  patch
 * DELETE  /api/userdetails/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Userdetails from './userdetails.model';

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

// Gets a list of Userdetailss
export function index(req, res) {
  return Userdetails.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Userdetails from the DB
export function show(req, res) {
  return Userdetails.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Userdetails in the DB
export function create(req, res) {
  return Userdetails.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Userdetails in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Userdetails.findOneAndUpdate(req.params.id, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Userdetails in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Userdetails.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Userdetails from the DB
export function destroy(req, res) {
  return Userdetails.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
