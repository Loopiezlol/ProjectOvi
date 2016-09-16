'use strict';

var app = require('../..');
import request from 'supertest';

var newUserdetails;

describe('Userdetails API:', function() {
  describe('GET /api/userdetails', function() {
    var userdetailss;

    beforeEach(function(done) {
      request(app)
        .get('/api/userdetails')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          userdetailss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(userdetailss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/userdetails', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/userdetails')
        .send({
          name: 'New Userdetails',
          info: 'This is the brand new userdetails!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newUserdetails = res.body;
          done();
        });
    });

    it('should respond with the newly created userdetails', function() {
      expect(newUserdetails.name).to.equal('New Userdetails');
      expect(newUserdetails.info).to.equal('This is the brand new userdetails!!!');
    });
  });

  describe('GET /api/userdetails/:id', function() {
    var userdetails;

    beforeEach(function(done) {
      request(app)
        .get(`/api/userdetails/${newUserdetails._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          userdetails = res.body;
          done();
        });
    });

    afterEach(function() {
      userdetails = {};
    });

    it('should respond with the requested userdetails', function() {
      expect(userdetails.name).to.equal('New Userdetails');
      expect(userdetails.info).to.equal('This is the brand new userdetails!!!');
    });
  });

  describe('PUT /api/userdetails/:id', function() {
    var updatedUserdetails;

    beforeEach(function(done) {
      request(app)
        .put(`/api/userdetails/${newUserdetails._id}`)
        .send({
          name: 'Updated Userdetails',
          info: 'This is the updated userdetails!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedUserdetails = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserdetails = {};
    });

    it('should respond with the original userdetails', function() {
      expect(updatedUserdetails.name).to.equal('New Userdetails');
      expect(updatedUserdetails.info).to.equal('This is the brand new userdetails!!!');
    });

    it('should respond with the updated userdetails on a subsequent GET', function(done) {
      request(app)
        .get(`/api/userdetails/${newUserdetails._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let userdetails = res.body;

          expect(userdetails.name).to.equal('Updated Userdetails');
          expect(userdetails.info).to.equal('This is the updated userdetails!!!');

          done();
        });
    });
  });

  describe('PATCH /api/userdetails/:id', function() {
    var patchedUserdetails;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/userdetails/${newUserdetails._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Userdetails' },
          { op: 'replace', path: '/info', value: 'This is the patched userdetails!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedUserdetails = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedUserdetails = {};
    });

    it('should respond with the patched userdetails', function() {
      expect(patchedUserdetails.name).to.equal('Patched Userdetails');
      expect(patchedUserdetails.info).to.equal('This is the patched userdetails!!!');
    });
  });

  describe('DELETE /api/userdetails/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/userdetails/${newUserdetails._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userdetails does not exist', function(done) {
      request(app)
        .delete(`/api/userdetails/${newUserdetails._id}`)
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
