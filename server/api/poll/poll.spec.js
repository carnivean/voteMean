/**
 * Created by Erik Kynast on 24.09.2015.
 */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/polls', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/things')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
