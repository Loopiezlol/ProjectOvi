'use strict';

var app = require('../..');
import request from 'supertest';

var newCake;

describe('Cake API:', function() {

  describe('GET /api/cakes', function() {
    var cakes;

    beforeEach(function(done) {
      request(app)
        .get('/api/cakes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cakes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(cakes).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/cakes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cakes')
        .send({
          name: 'New Cake',
          info: 'This is the brand new cake!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCake = res.body;
          done();
        });
    });

    it('should respond with the newly created cake', function() {
      expect(newCake.name).to.equal('New Cake');
      expect(newCake.info).to.equal('This is the brand new cake!!!');
    });

  });

  describe('GET /api/cakes/:id', function() {
    var cake;

    beforeEach(function(done) {
      request(app)
        .get('/api/cakes/' + newCake._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cake = res.body;
          done();
        });
    });

    afterEach(function() {
      cake = {};
    });

    it('should respond with the requested cake', function() {
      expect(cake.name).to.equal('New Cake');
      expect(cake.info).to.equal('This is the brand new cake!!!');
    });

  });

  describe('PUT /api/cakes/:id', function() {
    var updatedCake;

    beforeEach(function(done) {
      request(app)
        .put('/api/cakes/' + newCake._id)
        .send({
          name: 'Updated Cake',
          info: 'This is the updated cake!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCake = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCake = {};
    });

    it('should respond with the updated cake', function() {
      expect(updatedCake.name).to.equal('Updated Cake');
      expect(updatedCake.info).to.equal('This is the updated cake!!!');
    });

  });

  describe('DELETE /api/cakes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cakes/' + newCake._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cake does not exist', function(done) {
      request(app)
        .delete('/api/cakes/' + newCake._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
