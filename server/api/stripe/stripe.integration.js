'use strict';

var app = require('../..');
import request from 'supertest';

var newStripe;

describe('Stripe API:', function() {
  describe('GET /api/stripe', function() {
    var stripes;

    beforeEach(function(done) {
      request(app)
        .get('/api/stripe')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          stripes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(stripes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/stripe', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/stripe')
        .send({
          name: 'New Stripe',
          info: 'This is the brand new stripe!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStripe = res.body;
          done();
        });
    });

    it('should respond with the newly created stripe', function() {
      expect(newStripe.name).to.equal('New Stripe');
      expect(newStripe.info).to.equal('This is the brand new stripe!!!');
    });
  });

  describe('GET /api/stripe/:id', function() {
    var stripe;

    beforeEach(function(done) {
      request(app)
        .get(`/api/stripe/${newStripe._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          stripe = res.body;
          done();
        });
    });

    afterEach(function() {
      stripe = {};
    });

    it('should respond with the requested stripe', function() {
      expect(stripe.name).to.equal('New Stripe');
      expect(stripe.info).to.equal('This is the brand new stripe!!!');
    });
  });

  describe('PUT /api/stripe/:id', function() {
    var updatedStripe;

    beforeEach(function(done) {
      request(app)
        .put(`/api/stripe/${newStripe._id}`)
        .send({
          name: 'Updated Stripe',
          info: 'This is the updated stripe!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStripe = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStripe = {};
    });

    it('should respond with the original stripe', function() {
      expect(updatedStripe.name).to.equal('New Stripe');
      expect(updatedStripe.info).to.equal('This is the brand new stripe!!!');
    });

    it('should respond with the updated stripe on a subsequent GET', function(done) {
      request(app)
        .get(`/api/stripe/${newStripe._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let stripe = res.body;

          expect(stripe.name).to.equal('Updated Stripe');
          expect(stripe.info).to.equal('This is the updated stripe!!!');

          done();
        });
    });
  });

  describe('PATCH /api/stripe/:id', function() {
    var patchedStripe;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/stripe/${newStripe._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Stripe' },
          { op: 'replace', path: '/info', value: 'This is the patched stripe!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStripe = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStripe = {};
    });

    it('should respond with the patched stripe', function() {
      expect(patchedStripe.name).to.equal('Patched Stripe');
      expect(patchedStripe.info).to.equal('This is the patched stripe!!!');
    });
  });

  describe('DELETE /api/stripe/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/stripe/${newStripe._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when stripe does not exist', function(done) {
      request(app)
        .delete(`/api/stripe/${newStripe._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
