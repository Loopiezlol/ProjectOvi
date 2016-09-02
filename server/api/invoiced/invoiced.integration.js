'use strict';

var app = require('../..');
import request from 'supertest';

var newInvoiced;

describe('Invoiced API:', function() {

  describe('GET /api/invoiced', function() {
    var invoiceds;

    beforeEach(function(done) {
      request(app)
        .get('/api/invoiced')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          invoiceds = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(invoiceds).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/invoiced', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/invoiced')
        .send({
          name: 'New Invoiced',
          info: 'This is the brand new invoiced!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newInvoiced = res.body;
          done();
        });
    });

    it('should respond with the newly created invoiced', function() {
      expect(newInvoiced.name).to.equal('New Invoiced');
      expect(newInvoiced.info).to.equal('This is the brand new invoiced!!!');
    });

  });

  describe('GET /api/invoiced/:id', function() {
    var invoiced;

    beforeEach(function(done) {
      request(app)
        .get('/api/invoiced/' + newInvoiced._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          invoiced = res.body;
          done();
        });
    });

    afterEach(function() {
      invoiced = {};
    });

    it('should respond with the requested invoiced', function() {
      expect(invoiced.name).to.equal('New Invoiced');
      expect(invoiced.info).to.equal('This is the brand new invoiced!!!');
    });

  });

  describe('PUT /api/invoiced/:id', function() {
    var updatedInvoiced;

    beforeEach(function(done) {
      request(app)
        .put('/api/invoiced/' + newInvoiced._id)
        .send({
          name: 'Updated Invoiced',
          info: 'This is the updated invoiced!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInvoiced = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInvoiced = {};
    });

    it('should respond with the updated invoiced', function() {
      expect(updatedInvoiced.name).to.equal('Updated Invoiced');
      expect(updatedInvoiced.info).to.equal('This is the updated invoiced!!!');
    });

  });

  describe('DELETE /api/invoiced/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/invoiced/' + newInvoiced._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when invoiced does not exist', function(done) {
      request(app)
        .delete('/api/invoiced/' + newInvoiced._id)
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
