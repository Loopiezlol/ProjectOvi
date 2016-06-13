/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cakes              ->  index
 * POST    /api/cakes              ->  create
 * GET     /api/cakes/:id          ->  show
 * PUT     /api/cakes/:id          ->  update
 * DELETE  /api/cakes/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import path from 'path';
import Cake from './cake.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
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
        });
    }
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

function saveFile(res, file) {
  return function(entity){
    var newPath = '/assets/uploads/' + path.basename(file.path);
    console.log('new path is' + newPath);
    entity.imageUrl = newPath;
    return entity.save().spread(function(updated) {
      console.log(updated);
      return updated;
    });
  }
} 

// Uploads a new Product's image in the DB
exports.upload = function(req, res) {
  var file = req.files.file;
  if(!file){
    return handleError(res)('File not provided');
  }

  Cake.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveFile(res, file))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Gets a list of Cakes
export function index(req, res) {
  return Cake.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Cake from the DB
export function show(req, res) {
  return Cake.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Cake in the DB
export function create(req, res) {
  return Cake.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Cake in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Cake.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Cake from the DB
export function destroy(req, res) {
  return Cake.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
